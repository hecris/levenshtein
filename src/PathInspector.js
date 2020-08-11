import React from 'react';
import { PlaybackIterator } from './lev.js'

class PathInspector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            i: -1,
            j: -1,
            pbi: -1,
            finished: false,
            actions: [],
            rS: '',
        };
        this.clickNext = this.clickNext.bind(this);
    }

    clickNext() {
        let pbi = this.state.pbi;
        var action = pbi.next();
        let rS = this.state.rS;
        let prevS = rS;
        let i = this.state.i, j = this.state.j;
        let T = this.props.T;
        let pretty_action = "";
        if (action === 'INS') {
            rS = rS.slice(0, i) + T[j-1] + rS.slice(i);
            this.setState({j: j-1});
            pretty_action = 'Insert "' + T[j-1] + '" ';
        }
        else if (action === 'DEL') {
            pretty_action = 'Delete "' + rS[i-1] + '" ';
            rS = rS.slice(0, i-1) + rS.slice(i);
            this.setState({i: i-1});
        }
        else if (action === 'SUB') {
            pretty_action = 'Substitute "' + rS[i-1] + '" for "' + T[j-1] + '" ';
            rS = rS.slice(0, i-1) + T[j-1] + rS.slice(i);
            this.setState({i: i-1});
            this.setState({j: j-1});
        }
        else if (action === 'NON') {
            pretty_action = 'No action needed ';
            this.setState({i: i-1});
            this.setState({j: j-1});
        }
        else { // FIN
            pretty_action = 'Finished!';
            this.setState({finished: true});
        }
        this.setState({rS: rS});
        this.state.actions.push(<li>{pretty_action} to get <label style={{color: 'blue'}}>{rS}</label></li>);
        if (this.state.actions.length == 4) this.state.actions.shift();
    }

    updateIterator(i, j) {
        let S = this.props.S, T = this.props.T, dp = this.props.dp;
        let rS = S.slice(0, i);
        this.setState({i: i, j: j, pbi: new PlaybackIterator(S, T, dp, i, j)});
        this.setState({rS: rS});
        this.setState({actions:
                [<li> Start at <label style={{color: 'blue'}}>{rS}</label></li>],
                finish: false,
        });
    }

    render() {
        if (this.state.pbi == -1) return "";
        let i = this.state.i;
        let j = this.state.j;
        // console.log(i, j);
        return (
                <div>
                    <button disabled={this.state.finished} onClick={this.clickNext}>Next</button>
                    <ul>
                        {this.state.actions}
                    </ul>
                </div>
               );
    }
}

export default PathInspector;
