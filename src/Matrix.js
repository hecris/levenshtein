import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { lev } from './lev.js'
import CellInspector from './CellInspector.js'


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
            refs: [],
        };
        this.cellInspector = React.createRef();
    }

    componentDidMount() {
        this.buildCellsAndRefs(this.dp);
    }

    buildCellsAndRefs(dp) {
        let n = dp.length, m = dp[0].length;
        var refs = new Array(n);
        for (let i = 0; i < n; ++i) {
            let row = new Array(m);
            for (let j = 0; j < m; ++j) {
                row[j] = React.createRef();
            }
            refs[i] = row;
        }

        var res = new Array(n);
        for (let i = 0; i < n; ++i) {
            let row = new Array(m);
            for (let j = 0; j < m; ++j) {
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
        this.cellClickHelper(i, j);
        this.cellInspector.current.updateCell(i, j, this.dp[i][j]);
    }

    cellClickHelper(i, j) {
        let dp = this.dp;
        let S = this.props.S, T = this.props.T;
        var mymin = () => Math.min(dp[i-1][j-1], dp[i-1][j], dp[i][j-1]);
        if (i !== 0 || j !== 0) {
            if (S[i-1] === T[j-1]) {
                this.cellClickHelper(i-1, j-1);
            }
            else if (i === 0 || mymin() === dp[i][j-1]) {
                this.cellClickHelper(i, j-1);
            }
            else if (j === 0 || mymin() === dp[i-1][j]) {
                this.cellClickHelper(i-1, j);
            }
            else {
                this.cellClickHelper(i-1, j-1);
            }
        }
        this.state.refs[i][j].current.setColor('blue');
    }

    componentDidUpdate(prevProps){
        if (this.props.S !== prevProps.S || this.props.T !== prevProps.T) {
            this.dp = lev(this.props.S, this.props.T);
            this.buildCellsAndRefs(this.dp);
        }
    }

    render() {
        return ( <div>
                <table className="table table-bordered" style={{width: '50%', height: '25%'}}>
                {
            this.state.cells.map((row) => { 
            return <tr>
            {row}
            </tr>
        })
                }
                </table>

                <CellInspector ref={this.cellInspector}
                               S={this.props.S}
                               T={this.props.T}
                               dp={this.dp} />
                </div>
        )
    }
}

export default Matrix;
