import React from "react";
import NavBar from "./NavBar";

let conn;
class Play64Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {name: 'Medium'};


        // conn = new WebSocket('ws://localhost:8090');
        // conn.onopen = function(e) {
        //     console.log("Connection established!");
        // };
        //
        // conn.onmessage = function(e) {
        //     console.log(e.data);
        // };


    }

    componentDidMount(){
        console.log('HERE ESTABLISH CONNECTION');
    }
    handleChange(e) {
        this.setState({name: e.target.value});
        //conn.send('Hello World!');

    }
    render() {
        return (
            <div style={{textAlign: 'center'}}>
                <NavBar selectedTab={3}/>
                <h1>Welcome</h1>
                <p>Hello {this.state.name}</p>
                <input onChange={this.handleChange} defaultValue={this.state.name}/>
            </div>
        );
    }
}

export default Play64Dashboard;