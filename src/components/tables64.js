import React from "react";
import NavBar from "./NavBar";

let conn;
class Tables64 extends React.Component {

    constructor(props) {
        super(props);



    }
    handleChange(e) {
    }
    render() {
        return (
            <div style={{textAlign: 'center'}}>
                <NavBar selectedTab={1}/>
                <h1>Welcome</h1>
                <p>Hello</p>

            </div>
        );
    }
}

export default Tables64;