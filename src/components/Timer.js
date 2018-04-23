import React from "react";
import PropTypes from 'prop-types';
import {getCurrentGameState, getOwnPlayerObject} from "../selectors/gameSelector";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {getTimeLeft, getIsGameGoing} from "../selectors/gameSelector";

class Timer extends React.Component {

    constructor(props) {
        super(props);

        this.state={timeLeft: -1, timerOn: false, isGameGoing: false};
        this.timer = 0;

        this.startTimer = this.startTimer.bind(this);

    }


    componentDidMount(){
        if (this.state.timerOn){
            this.startTimer();
        }
        else {
            this.stopTimer();
        }
    }

    componentDidUpdate(prevProps){

        if (prevProps.timerOn === false && this.props.timerOn === true){
            this.startTimer();
        }
        else if (prevProps.timerOn === true && this.props.timerOn === false){
            this.stopTimer();
        }

    }

    componentWillUnmount(){
        this.stopTimer();
    }




    static getDerivedStateFromProps(nextProps, prevState){//TODO understand lifecycle better

        console.log("get derived!");
        console.log(nextProps);


        if (prevState.timeLeft === -1 || (prevState.isGameGoing === false && nextProps.isGameGoing === true)){
            return {timeLeft: nextProps.timeLeft, timerOn: nextProps.timerOn, isGameGoing: nextProps.isGameGoing};
        }

        else{
            return {timeLeft: prevState.timeLeft, timerOn: nextProps.timerOn, isGameGoing: nextProps.isGameGoing};
        }

    }

    reduceTimeLeft(){

        if (this.state.timeLeft-1 === 0){
            this.stopTimer();
            this.setState({timeLeft: 0, timerOn: false});
            this.props.handleTimeIsUp();
        }
        else{
            this.setState({timeLeft: this.state.timeLeft-1});
        }


    }

    startTimer() {
        if (this.timer === 0) {
            this.timer = setInterval(this.reduceTimeLeft.bind(this), 1000);
        }
    }

    stopTimer(){
        if (this.timer !== 0){
            clearInterval(this.timer);
            this.timer = 0;
        }
    }

    convertUnixTimestampToSeconds(timestamp){
        if (timestamp === -1){
            return "--:--";
        }
        let ss = timestamp % 60 + "";
        ss = ss.length === 2 ? ss : "0"+ss;
        let mm = Math.floor(timestamp / 60) + "";
        mm = mm.length === 2 ? mm : "0"+mm;
        return mm+":"+ss;
    }

    render(){

        let timeLeftStr = this.convertUnixTimestampToSeconds(this.state.timeLeft);
        return <div>{timeLeftStr}</div>
    }


}



Timer.propTypes = {

    timerOn: PropTypes.bool.isRequired,
    timeLeft: PropTypes.number.isRequired,
    whiteSide: PropTypes.bool,
    isGameGoing: PropTypes.bool.isRequired,
    handleTimeIsUp: PropTypes.func.isRequired

};



function mapStateToProps(state, ownProps) {
    return {
        timeLeft: getTimeLeft(state, ownProps),
        isGameGoing: getIsGameGoing(state)
    };
}


export default connect(
    mapStateToProps
)(Timer);



