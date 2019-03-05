import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { createNewPlayer, playerReady } from '../redux/action/playerAction';
import { resetGame } from '../redux/action/gamePlayAction';
import { Button } from '@material-ui/core';
import AccountIcon from '@material-ui/icons/AccountCircle';
import CloseIcon from '@material-ui/icons/ExitToApp';
import MoneyIcon from '@material-ui/icons/AttachMoney';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ListPlayer from './ListPlayer';

import {
  switchCreateNewPlayerPhase,
  switchInGamePhase,
  switchPendingGamePhase
} from '../redux/action/gamePhaseAction';



const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    marginBottom: '20px'
  },
  icon: {
    margin: theme.spacing.unit,
  },
  num: {
    color: 'red',
    justifyContent: 'center',
  }
});

class Header extends Component {

  state = {
    name: 'Phuong Duy',
    money: 5000,
    rice: 3,
    time: 2
  }

  resetGameButton = (e) => {
    this.props.resetGame(this.props.socket);
  }

  readyButton = async (event) => {
    const newStatePlayer = { ...this.props.player.player };
    newStatePlayer.status = 'READY';
    await this.props.playerReady(this.props.socket, newStatePlayer);
  }



  render() {
    const { player, classes, gamePlay } = this.props;
    const { gamePhase } = this.props.gamePhase;

    return (
      <div >
        {
          player.loading ?
            <div> loading </div> :

            <AppBar position='relative' color='inherit' className={classes.appBar} style={{ backgroundColor: 'unset' }}>
              <ToolBar>
                <AccountIcon className={classes.icon} />
                <Typography variant='body1'>{player.player.name}</Typography>
                <MoneyIcon className={classes.icon} />
                <Typography
                  variant='body1'
                  style={{ color: 'yellow' }}
                >
                  {player.player.money}
                </Typography>
                <div className={classes.root}></div>
                <ListPlayer gamePlay={gamePlay} />
                <IconButton onClick={this.resetGameButton}>
                  <CloseIcon />
                </IconButton>
              </ToolBar>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                {
                  gamePhase === 'INGAME_PHASE' ?
                    <Typography
                      variant='headline'
                      className={classes.num}
                    >
                      {this.props.num}
                    </Typography>
                    : null
                }
    
              </div>
            </AppBar>
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  player: state.player,
  gamePhase: state.gamePhase
});

export default connect(
  mapStateToProps,
  {
    createNewPlayer,
    playerReady,
    resetGame,
    switchCreateNewPlayerPhase,
    switchInGamePhase,
    switchPendingGamePhase
  })(withStyles(styles)(Header));