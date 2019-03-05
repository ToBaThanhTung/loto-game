import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import { connect } from 'react-redux';
import { getBoard } from '../redux/action/gameAction';
import { updatePlayer } from '../redux/action/playerAction';
import { resetGame } from '../redux/action/gamePlayAction'
import { switchPendingGamePhase } from '../redux/action/gamePhaseAction';
import { Typography } from '@material-ui/core';

class EndGameDialog extends React.Component {
  // init board, update money
  onClick = async () => {
    await this.props.resetGame(this.props.socket);
    await this.props.getBoard(this.props.socket);
    this.props.updatePlayer(this.props.socket.id);
    this.props.switchPendingGamePhase();
  }

  render() {
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.handleClose}
          aria-labelledby="engame-dialog-title"
          aria-describedby="endgame-dialog-description"
        >
          <DialogTitle id="playerw-dialog-title">{this.props.msgTitle}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Typography variant='body1' color='secondary'>
                {this.props.playerWin ? `${this.props.playerWin}: ` : null}
                <Typography variant='body1'>{' xin nhẹ 3k nhé! hê hê'} </Typography>
              </Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.onClick} color="primary" autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  open: state.gamePhase.openDialog,
  msgTitle: state.gamePhase.msgTitleDialog,
  msgBody: state.gamePhase.msgBodyDialog,
  playerWin: state.gamePhase.playerWin,
});

export default connect(mapStateToProps, {
  getBoard,
  switchPendingGamePhase,
  resetGame,
  updatePlayer
})(EndGameDialog);