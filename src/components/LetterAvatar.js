import React from "react";
import PropTypes from 'prop-types';

const styles = {

    avatarImageDiv:{
        width:"60px",
        height:"60px",
        borderRadius: 30,
        fontSize: 35,
        lineHeight: "55px",
        flexGrow:0,
        flexShrink: 0
    }

};
//asdasdsasdsdasdasdasd
const avatarColors = ["red", "yellowgreen", "wheat", "tomato", "palegoldenrod"];

class LetterAvatar extends React.Component {

    constructor(props) {
        super(props);

    }



    render() {

        let {username} = this.props;

        let avatarColor = avatarColors[username.charCodeAt(0) % avatarColors.length];
        let avatarStyle = Object.assign({}, styles.avatarImageDiv, {backgroundColor: avatarColor});
        let avatarLetter = username[0];


        return (
            <div style={avatarStyle}>{avatarLetter}</div>

        );
    }
}

LetterAvatar.propTypes = {
    username: PropTypes.string.isRequired
};




export default LetterAvatar;


