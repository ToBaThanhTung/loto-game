import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import DirectionIcon from '@material-ui/icons/Directions';
import IconButton from '@material-ui/core/IconButton';
import { createNewPlayer } from '../redux/action/playerAction';
import { getGamePlay, getRandNum } from '../redux/action/gamePlayAction';
import { connect } from 'react-redux';

class NewPlayer extends Component {
  state = {
    name: '',
  };

  onChange = (e) => {
    this.setState({ name: e.target.value });
  }

  onClick = async () => {
    await this.props.createNewPlayer(this.props.socket, this.state);
    await this.props.onStartGame();
  }

  render() {
    return (
      <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <TextField
          label='Name'
          value={this.state.name}
          onChange={this.onChange}
        >
        </TextField>
        <IconButton onClick={this.onClick}
        >
          <DirectionIcon
            style={{ paddingTop: 15, fontSize: '2rem' }}
          />
        </IconButton>
      </div>

    );
  }
}

export default connect(null, { createNewPlayer })(NewPlayer);


