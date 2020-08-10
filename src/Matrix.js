import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { lev } from './lev.js'


class Cell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: 'white',
        };
    }

    setColor(color) {
        this.setState({color: color});
    }

    render() {
        let x = this.props.x;
        let y = this.props.y;
        return (
                <td onClick={() => this.props.cellClick(x, y)}
                    style={{cursor: 'pointer', backgroundColor: this.state.color}}
                > {this.props.value} </td>
               )
    }
}

class Matrix extends React.Component {
    constructor(props) {
        super(props);
        this.dp = lev(this.props.S, this.props.T);
        this.cellClick = this.cellClick.bind(this);
        this.state = {
            cells: [],
            refs: []
        };
    }

    componentDidMount() {
        this.buildCellsAndRefs(this.dp);
    }

    buildCellsAndRefs(dp) {
        let n = dp.length, m = dp[0].length;
        var refs = new Array(n);
        for (var i = 0; i < n; ++i) {
            var row = new Array(m);
            for (var j = 0; j < m; ++j) {
                row[j] = React.createRef();
            }
            refs[i] = row;
        }

        var res = new Array(n);
        for (var i = 0; i < n; ++i) {
            var row = new Array(m);
            for (var j = 0; j < m; ++j) {
                row[j] = <Cell x={i} y={j} ref={refs[i][j]}
                          cellClick={this.cellClick} value={dp[i][j]} />
            }
            res[i] = row;
        }

        this.setState({refs: refs});
        this.setState({cells: res});
    }

    resetCellColors() {
        for (var row of this.state.refs) {
            for (var ref of row) {
                ref.current.setColor('white');
            }
        }
    }

    cellClick(i, j) {
        this.resetCellColors();
        let dp = this.dp;
        var mymin = () => Math.min(dp[i-1][j-1], dp[i-1][j], dp[i][j-1]);
        if (i != 0 || j != 0) {
            if (i === 0 || mymin() === dp[i][j-1]) {
                this.cellClick(i, j-1);
            }
            else if (j === 0 || mymin() === dp[i-1][j]) {
                this.cellClick(i-1, j);
            }
            else {
                this.cellClick(i-1, j-1);
            }
        }
        this.state.refs[i][j].current.setColor('blue');
    }

    render() {
        return ( <table className="table">
                {
            this.state.cells.map((row) => { 
            return <tr>
            {row}
            </tr>
        })
                }
                </table>
        )
    }
}

export default Matrix;
