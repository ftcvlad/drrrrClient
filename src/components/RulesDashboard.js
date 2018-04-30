import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import {getUser} from "../selectors/userSelector";
import NavBar from "./NavBar";
import {wsConnect, wsSendJoinRoomPlay, wsSendLeaveRoomTables, wsSendUpdateTimeLeft} from "../actions/WsClientActions";
import GameReturnFrame from './GameReturnFrame';
import {getCurrentGameId} from "../selectors/gameSelector";
import Divider from 'material-ui/Divider';


const initialPosition = require('./images/description/initialPosition.png');


const styles = {
    containerDiv: {
        display: "flex",
        justifyContent: "center",
        padding: 50
    },
    rulesDiv: {
        display: "flex",
        flexDirection: "column",
        maxWidth: 700
    }
};

class RulesDashboard extends React.Component {


    constructor(props) {
        super(props);


    }

    componentWillMount() {

        if (!window.socketConnection) {
            this.props.dispatch(wsConnect())
                .then(() => {
                    this.props.dispatch(wsSendJoinRoomPlay())
                        .catch((error) => {
                        });
                });
        }
        else {
            this.props.dispatch(wsSendLeaveRoomTables())
                .catch((error) => {
                });

            this.props.dispatch(wsSendUpdateTimeLeft())
                .catch((error) => {
                });

        }
    }

    render() {
        let {user} = this.props;
        let inGame = !!this.props.gameId;




        return (
            <div className="">
                <NavBar />
                {inGame &&
                    <GameReturnFrame/>
                }


                <div style={styles.containerDiv}>
                    <div style={styles.rulesDiv}>

                        <h1>Rules</h1>

                        <h3>Initial position</h3>
                        <p>
                            The game is played on an eight by eight cells wide board. Initial position is shown below.
                        </p>
                        <img style={{width: 100}} src={initialPosition}/>

                        <h3>Piece types</h3>
                        <p>
                            Each piece can be either an ordinary pawn or a king. Each player has 12 pawns in the
                            beginning.
                            A pawn turns into a king if it reaches the last (looking from player’s position) horizontal
                            row.
                            For example, on the picture above white pawn would turn into a king if it reached the row
                            labelled with 1.
                        </p>

                        <h3>Simple walk</h3>
                        <p>Players can walk only on black cells. Pawns walk diagonally, only to the front and only to
                            adjacent cells.
                            Kings walk diagonally by any number of cells and in any direction.</p>


                        <h3>Taking opponent's pieces</h3>
                        <p>Pawns and kings can also jump over opponent’s pieces onto a free cell. Pawns jump over
                            adjacent pieces to the next cell along the diagonal. Kings jump over any single piece along
                            a diagonal and land anywhere (unless the turn must continue) after the piece. Opponent’s
                            piece is taken. If a player can take any pieces, he must do so – simple moves are forbidden.
                            Pawns can jump back as well. If a player can take a piece in several ways, he may choose any
                            of them. If a player can take more than one piece in one turn he must do so. In this case
                            the
                            taking piece jumps over opponent’s piece to the position that would let beating more
                            checkers
                            and continues the move. </p>

                        <h3>Finishing the game</h3>
                        <p>A player wins if his opponents doesn’t have pieces left, is unable to do a move or his time
                            is over.</p>


                    </div>


                </div>
            </div>
        );
    }
}
//saassa
RulesDashboard.propTypes = {
    user: PropTypes.object,
    gameId: PropTypes.string
};


function mapStateToProps(state) {
    return {
        user: getUser(state),
        gameId: getCurrentGameId(state)
    };
}


export default connect(
    mapStateToProps
)(RulesDashboard);


