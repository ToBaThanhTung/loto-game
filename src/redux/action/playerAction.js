import {
  REQUEST,
  SUCCESS,
  CREATE_NEW_PLAYER,
  REQUEST_PLAYER_READY,
  PLAYER_READY,
  PLAYER_READY_SUCCESS,
  PENDING_GAME_PHASE,
  UPDATE_PLAYER,
} from './type';


const createNewPlayerAction = (data) => ({
  type: CREATE_NEW_PLAYER,
  data,
})

const playerReadyAction = (data) => {
  console.log("PLAYER IN ACTION", data);

  return {
    type: PLAYER_READY,
    data,
  }
};

export const updatePlayerMoney = money => dispatch => {

}


export const createNewPlayer = (socket, playerName) => async dispatch => {
  try {
    dispatch({
      type: REQUEST,
    })
    socket.emit('new_player', playerName, async (data) => {
      // console.log('fa.',data);
      await dispatch({
        type: PENDING_GAME_PHASE,
      })
      await dispatch(createNewPlayerAction(data));
      await dispatch({
        type: SUCCESS,
      });

    });
  } catch (e) {
    console.log(e);
  }
}

export const updatePlayer = (id) => async (dispatch, getState) => {
  console.log(getState().gamePlay);
  const data = getState().gamePlay.gamePlay.players[id];
  data.status = 'NOT_READY';
  delete data.board;
  console.log('DATA', data);
  dispatch({
    type: UPDATE_PLAYER,
    data: data
  })


}


export const playerReady = (socket, newStatePlayer) => async dispatch => {
  try {
    dispatch({
      type: REQUEST_PLAYER_READY
    });
    socket.emit('player_ready', async () => {
      await dispatch(playerReadyAction(newStatePlayer))
    });



    await dispatch({
      type: PLAYER_READY_SUCCESS,
    })
  } catch (err) {
    console.log(err);
  }
}

