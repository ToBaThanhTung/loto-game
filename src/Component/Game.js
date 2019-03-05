import React, { Component } from 'react'
import { getBoard } from '../redux/action/gameAction';
import { connect } from 'react-redux';
import Board from './Board';
import io from 'socket.io-client';

class Game extends Component {
  constructor(props) {
    super(props);
    this.socket = io('http://loto-game.herokuapp.com/');
  }

  componentDidMount = () => {
    this.props.getBoard({ socket: this.socket });
  }

  render() {
    //console.log(this.props.game);
    
    return (
      <div>
        
      </div>
    )
  }
}

const mapStateToProps = state => ({
  game: state.game,
});

export default connect(mapStateToProps, { getBoard })(Game);