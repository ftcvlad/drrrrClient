import React from 'react';

import Popover from 'material-ui/Popover';
import PropTypes from 'prop-types';
import Info from 'material-ui/svg-icons/action/info';
import IconButton from 'material-ui/IconButton';

const styles={
    smallIcon:{
        width: 25,
        height: 25,
        color:"#d0ab44"
    },
    smallButton:{
        width: 25,
        height: 25,
        padding: 0,
        margin: 0,
        zIndex:200,
        position:"absolute",
        top:3,
        left:3
    },
    contentDiv:{
        padding:10,
        width:300,
        border: "2px solid black",
        display:"flex",
        flexDirection:"column",
        backgroundColor:"#d0ab44"
    },

};
export default class HelpPopover extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false

        };
    }



    handleClick = (event) => {
        event.preventDefault();

        this.setState({
            open: true,
            anchorEl: event.currentTarget,
        });
    };

    handleRequestClose = () => {
        this.setState({
            open: false,
            anchorEl:null
        });
    };



    render() {

        console.log(this.state.anchorEl);

        return (
            <div>


                <IconButton iconStyle={styles.smallIcon}
                            style={styles.smallButton}
                            onClick={this.handleClick.bind(this)}
                            ref={"helpIconBtn"}>

                    <Info hoverColor={"#9c1818"}/>
                </IconButton>


                <Popover
                    open={this.state.open}
                    animated={false}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    onRequestClose={this.handleRequestClose.bind(this)}
                >
                    <div style={styles.contentDiv}>
                        {this.props.content}
                    </div>
                </Popover>
            </div>
        );
    }
}

HelpPopover.propTypes = {
    content: PropTypes.object.isRequired


};