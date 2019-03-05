import React, { Component, Fragment } from 'react';
import Square from './Square';
import { withStyles } from '@material-ui/core/styles';
import { getBoard, updateBoard } from '../redux/action/gameAction';
import { switchWinGamePhase } from '../redux/action/gamePhaseAction';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { playerReady } from '../redux/action/playerAction';

const styles = theme => ({
  row: {
    display: 'flex',
    justifyContent: 'center',
  },
  board: {
    justifyContent: 'center',
  },
  num: {
    color: 'red',
    justifyContent: 'center',
  }
})

class Board extends Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    await this.props.getBoard(this.props.socket);
  }

  onChoosen = async (col, row) => {

    const listGeneratedNum = this.props.listGeneratedNum;
    const numClick = parseInt(this.props.board[row][col].num, 10);

    if (listGeneratedNum.includes(numClick)) {

    } else {
      console.log('may click bay gi do!')
    }
    let newData = this.props.board.slice();
    newData[row][col].choosen = !newData[row][col].choosen;
    const cell = {
      num: this.props.board[row][col].num,
      col: col,
      row: row,
      choosen: true,
      open: true,
    }
    await this.props.updateBoard(this.props.socket, cell, newData);

    console.log('APTER UPDATE BOARD');

    const playerId = this.props.player.player.id;
    const { players } = this.props.gamePlay;
    console.log('PLAYERS IN FUNC', players);
    console.log(playerId);
    
    const gameStatus = players[playerId].status;
    console.log('GAME STATUS:', gameStatus);

    if (gameStatus === 'WIN') {
      this.props.switchWinGamePhase();
    }


  }

  readyButton = async (event) => {
    const newStatePlayer = { ...this.props.player.player };
    newStatePlayer.status = 'READY';
    await this.props.playerReady(this.props.socket, newStatePlayer);
  }


  render() {

    const { classes } = this.props;
    const { loading, board } = this.props;
    console.log('PLAYERS IN RENDER', this.props);
    const gamePhase = this.props.gamePhase.gamePhase;


    if (loading) {
      return <div>loading</div>
    }

    if (this.props.player.loading) {
      return <div>loading</div>
    }


    return (
      <Fragment>
        {loading ? <div> loading </div>
          : board.map((data, index) =>
            <div key={`${index}data`} className={classes.row}>
              {data.map((square, i) => (
                <Square
                  key={`${square.row}${square.col}`}
                  square={square}
                  onChoosen={this.onChoosen}
                />
              ))}

            </div>
          )}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '24px' }}>
          {
            this.props.player.player.status === 'NOT_READY' ?
              <Button
                variant='fab'
                color='secondary'
                onClick={this.readyButton}
              >
                READY
                    </Button>
              : gamePhase === 'INGAME_PHASE' ?
                null
                : <Typography variant='body1' color='secondary'>chờ mấy đứa kia tí!</Typography>
          }
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  board: state.game.board,
  loading: state.game.loading,
  listGeneratedNum: state.gamePlay.listGeneratedNum,
  player: state.player,
  gamePlay: state.gamePlay.gamePlay,
  gamePhase: state.gamePhase,
})


export default connect(
  mapStateToProps,
  {
    playerReady,
    getBoard,
    updateBoard,
    switchWinGamePhase
  })(withStyles(styles)(Board));