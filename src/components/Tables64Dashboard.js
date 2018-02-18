import React from "react";
import NavBar from "./NavBar";
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import {login} from "../actions/authActions";
import {connect} from "react-redux";
import {getUser} from "../selectors/userSelector";
import {withRouter} from "react-router-dom";
import {createGame} from"../actions/gameActions";

class Tables64Dashboard extends React.Component {

    constructor(props) {
        super(props);



    }
    handleCreateGame(e) {
        let data = {};
        this.props.dispatch(createGame(data))
            .then(()=> this.props.history.push('/play64'))
            .catch((errMsg)=>{
                console.log(errMsg);
            });
    }

    render() {
        return (
            <div style={{textAlign: 'center'}}>
                <NavBar selectedTab={1}/>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderColumn>ID</TableHeaderColumn>
                            <TableHeaderColumn>Name</TableHeaderColumn>
                            <TableHeaderColumn>Status</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableRowColumn>1</TableRowColumn>
                            <TableRowColumn>John Smith</TableRowColumn>
                            <TableRowColumn>Employed</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>2</TableRowColumn>
                            <TableRowColumn>Randal White</TableRowColumn>
                            <TableRowColumn>Unemployed</TableRowColumn>
                        </TableRow>

                    </TableBody>
                </Table>

                <RaisedButton label="Create game" onClick={this.handleCreateGame.bind(this)} />

            </div>
        );
    }
}


function mapStateToProps(state) {
    return {

    };
}




export default withRouter(connect(
    mapStateToProps
)(Tables64Dashboard));