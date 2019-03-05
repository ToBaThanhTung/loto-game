import React, { Component, Fragment } from 'react';
import Header from './Component/Header';
import io from 'socket.io-client';
import { getGamePlay, getRandNum } from './redux/action/gamePlayAction';
import { connect } from 'react-redux';
import Layout from './Component/Layout';
import lotoImage from './assets/loto.jpg';
import Loader from 'react-loader-spinner'
import NewPlayer from './Component/NewPlayer';
import { createNewPlayer } from './redux/action/playerAction';
import EndGameDialog from './Component/EndGameDialog';

import {
  switchCreateNewPlayerPhase,
  switchInGamePhase,
  switchPendingGamePhase,
  switchWinGamePhase,
} from './redux/action/gamePhaseAction';


class App extends Component {
  constructor(props) {
    super(props);
    //this.socket = io('http://loto-game.herokuapp.com/');
    this.socket = io('http://localhost:5000');
    this.state = {
      notRegister: true,
    }
  }
  componentDidMount = async () => {
    await this.props.switchCreateNewPlayerPhase();
   
  } 

  onStartGame = async () => {
    await this.props.getGamePlay(this.socket);
    await this.props.getRandNum(this.socket);
  }

  render() {
    const { loading } = this.props.gamePlay;
    const { gamePhase } = this.props.gamePhase;
    return (
      <div style={{ backgroundImage: `url(${lotoImage})`, backgroundSize: 'cover' }}>
        {gamePhase === 'CREATE_NEW_PLAYER_PHASE' ?
          <NewPlayer
            socket={this.socket}
            onStartGame={this.onStartGame}
          />
          :
          <div>
            <div>
              <Header
                socket={this.socket}
                num={this.props.gamePlay.num}
                gamePlay={this.props.gamePlay}
              />
            </div>
            <div>
              {
                loading ? <Loader
                  type="Puff"
                  color="#00BFFF"
                  height="100"
                  width="100"
                /> :
                  <div>
                    <Layout
                      socket={this.socket} />
                  </div>
              }
            </div>
            <div>
              <EndGameDialog socket={this.socket}/>
            </div>
          </div>
        }


      </div>
    );
  }
}

const mapStateToProps = state => ({
  gamePlay: state.gamePlay,
  gamePhase: state.gamePhase,
});

export default connect(mapStateToProps, {
  getGamePlay,
  getRandNum,
  createNewPlayer,
  switchCreateNewPlayerPhase,
  switchInGamePhase,
  switchPendingGamePhase,
  switchWinGamePhase
})
  (App);
