import React from 'react';

class CellInspector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            i: -1,
            j: -1,
            val: -1,
        };
    }

    updateCell(i, j, val) {
        this.setState({i: i});
        this.setState({j: j});
        this.setState({val: val});
    }

    examinePath() {
        alert('get');
    }

    render() {
        let i = this.state.i, j = this.state.j, val = this.state.val;
        if (i === -1) return "";
        return (
                <div>
                    The minimum edit distance between
                    &nbsp;
                    <label style={{color: 'blue'}}>&quot;{this.props.S.slice(0,i)}&quot;</label>
                    &nbsp;
                    and
                    &nbsp;
                    <label style={{color: 'blue'}}>&quot;{this.props.T.slice(0,j)}&quot;</label>
                    &nbsp;
                    is
                    &nbsp;
                    <label style={{color: 'red'}}>{val}</label>
                    &nbsp;
                    <div>
                        <button onClick={this.examinePath}> Examine Path </button>
                    </div>
                </div>
               );
    }
}

export default CellInspector;
