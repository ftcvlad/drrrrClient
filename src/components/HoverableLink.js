import React from "react";

import PropTypes from 'prop-types';
import {withRouter} from "react-router-dom";
import {NavLink} from 'react-router-dom';

const styles = {
    activeLink:{
        color:"orange"
    },
    linkStyle:{

        textDecoration: "none",
        color: "white",
        margin: "0 20px 0 20px"

    },
    hoveredLink:{
        color: "#d2bd85"
    }
};


class HoverableLink extends React.Component {

    constructor(props) {
        super(props);

        this.state = {hover: false};
    }




    toggleHover(){
        this.setState({hover: !this.state.hover})
    }




    render(){
        let linkStyle = {};
        if (this.state.hover) {
            linkStyle = styles.hoveredLink
        }


        return(
            <div>
                <NavLink style={Object.assign({}, styles.linkStyle, linkStyle)}
                       to={this.props.to}
                         exact
                         activeStyle={styles.activeLink}
                       onMouseEnter={this.toggleHover.bind(this)}
                       onMouseLeave={this.toggleHover.bind(this)}>{this.props.label}</NavLink>
            </div>
        );
    };

}

HoverableLink.propTypes = {
    to: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired



};


export default withRouter(HoverableLink);