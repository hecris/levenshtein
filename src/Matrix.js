import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { lev } from './lev.js'


class Cell extends React.Component {
    render() {
        let x = this.props.x;
        let y = this.props.y;
        return (
                <td onClick={() => this.props.cellClick(x, y)}> {this.props.value} </td>
               )
    }
}

class Matrix extends React.Component {
    constructor(props) {
        super(props);
        this.dp = lev(this.props.S, this.props.T);
        this.state = {
            cells: this.buildCells(lev(this.props.S, this.props.T))
        };
    }

    buildCells(dp) {
        let n = dp.length, m = dp[0].length;
        var res = new Array(n);
        for (var i = 0; i < n; ++i) {
            var row = new Array(m);
            for (var j = 0; j < m; ++j) {
                row[j] = <Cell x={i} y={j}
                          cellClick={this.cellClick} value={dp[i][j]} />
            }
            res.push(row);

        }
        return res;
    }

    cellClick(x, y) {
        console.log(x, y);
    }

    render() {
        return ( this.state.cells.map((row) => { 
            return <tr>
            {row}
            </tr>
        }))
    }
}

export default Matrix;
