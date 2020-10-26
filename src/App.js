import React from 'react';
import Matrix from './Matrix.js'

function App() {
  return (
          <Home />
  );
}

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            S: 'hello',
            T: 'hola'
        }
        this.input1 = React.createRef();
        this.input2 = React.createRef();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({S: this.input1.current.value});
        this.setState({T: this.input2.current.value});
    }

    render () {
        return (
                <div style={{'padding': '5px'}}>
                    <div style={{'margin-bottom': '5px'}}>
                        <input ref={this.input1} type='text' placeholder='hello'
                        style={{'margin-right': '5px'}}></input>
                        <input ref={this.input2} type='text' placeholder='hola'
                        style={{'margin-right': '5px'}}></input>
                        <button onClick={this.handleClick}>Go</button>
                    </div>
                    <Matrix S={this.state.S} T={this.state.T} />
                </div>
               );
    }
}

export default App;
