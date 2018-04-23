import React from "react";


import RaisedButton from 'material-ui/RaisedButton';


import {withRouter} from "react-router-dom";


import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {wsSendCreateGame} from '../actions/WsClientActions';
import PropTypes from 'prop-types';

const styles={
    createGamePanel:{
        backgroundColor: "#42454c",
        padding:5,
        margin:5
    },
    contentWrapper:{
        display: "flex",
        flexDirection: "column",
    },
    timeReserveLabel:{
        color: "#d0ab44",
        width:100,
        marginRight:10,
        fontFamily: "monospace"
    },
    selectFieldContainer:{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "10 0 10 0"
    }
};

class CreateGamePanel extends React.Component {

    constructor(props) {
        super(props);

        this.state = {timeReserve: 3};
    }

    handleCreateGame(e) {
        let data = {
            timeReserve: this.state.timeReserve * 5 * 60
        };


        this.props.dispatch(wsSendCreateGame(data))
            .then(()=> {
                this.props.history.push('/play64');
            })
            .catch((errMsg)=>{
                console.log(errMsg);
            });
    }

    handleTimeReserveChange(event, index, value){
        this.setState({timeReserve: value});
    }

    render() {
        return (
                <div style={styles.createGamePanel}>
                    <div style={styles.contentWrapper}>
                        <div style={styles.selectFieldContainer}>
                            <div style={styles.timeReserveLabel}>Time reserve</div>
                            <SelectField
                                floatingLabelText="Time reserve"
                                value={this.state.timeReserve}
                                //autoWidth={true}
                                onChange={this.handleTimeReserveChange.bind(this)}
                                style={{width:100, height:40}}
                                labelStyle={{color:"white", lineHeight:"20px", height:"20px", paddingRight:"20px"}}

                                menuStyle={{margin:0, width:100}}
                                iconStyle={{padding:0, height:20, width:20, top:4}}//sdadsdf
                                selectedMenuItemStyle={{color:"red"}}
                                floatingLabelStyle={{display:"none"}}
                            >
                                <MenuItem value={1} primaryText="5 min" />
                                <MenuItem value={2} primaryText="10 min" />
                                <MenuItem value={3} primaryText="15 min" />
                            </SelectField>

                        </div>




                        <RaisedButton label="Create game" onClick={this.handleCreateGame.bind(this)} />

                    </div>

                </div>);
    }
}

CreateGamePanel.propTypes={
    dispatch: PropTypes.func.isRequired
};



export default withRouter(CreateGamePanel);