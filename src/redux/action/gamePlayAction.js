import {
  REQUEST_GAME_PLAY,
  GAME_PLAY,
  GAME_PLAY_SUCCESS,
  REQUEST_RAND_NUM,
  RAND_NUM_SUCCESS,
  RAND_NUM,
  REQUEST_RESET_GAME,
  RESET_GAME_SUCCESS,
  INGAME_PHASE,
  WIN_GAME_PHASE,
  LOSE_GAME_PHASE,
  CREATE_NEW_PLAYER_PHASE
} from './type';


const getGamePlayAction = (data) => ({
  type: GAME_PLAY,
  data
});

export const getGamePlay = (socket) => async (dispatch, getState) => {
  console.log(getState().gamePhase);
  
    try {
      dispatch({
        type: REQUEST_GAME_PLAY,
      });
      socket.on('gameplay_update', async gamePlay => {
        if (gamePlay.status === 'START') {
          dispatch({
            type: INGAME_PHASE,
          })
        }
        if (gamePlay.players) {
          const { players, playerIds } = gamePlay;
          const status = players[socket.id].status ? players[socket.id].status : null;
          console.log('STATUS ON PLAYACTION: ', status);
          if (status !== null && status !== undefined) {
            if (status === 'WIN') {
              dispatch({
                type: WIN_GAME_PHASE,
              });
            }
            if (status === 'LOSE') {
              console.log(playerIds);
              let playerWinId;
              playerIds.map(id => {
                if (players[id].status === 'WIN') {
                  playerWinId = id;
                }
              });
              console.log('DEBUG PLAYER WIN: ', playerWinId);

              dispatch({
                type: LOSE_GAME_PHASE,
                playerWin: players[playerWinId].name,
              });
            }
          }
        }
        await dispatch(getGamePlayAction(gamePlay));
        await dispatch({
          type: GAME_PLAY_SUCCESS,
        });
      });


    } catch (err) {
      console.log(err);
    }
}


const getRandNumAction = (data) => {
  // console.log('FLAG HERE!', data);
  return {
    type: RAND_NUM,
    data: data,
  }
}

export const getRandNum = (socket) => async dispatch => {
  try {
    dispatch({
      type: REQUEST_RAND_NUM,
    })
    socket.on('new_number', async randNum => {
      // console.log('FLAG HERE');
      await dispatch(getRandNumAction(randNum));
      await dispatch({
        type: RAND_NUM_SUCCESS,
      });
    });
  } catch (err) {
    console.log(err);
  }
}




export const resetGame = (socket) => async dispatch => {
  try {
    dispatch({ type: REQUEST_RESET_GAME });
    socket.emit('stop_game', async () => {
      await dispatch({ type: RESET_GAME_SUCCESS });
    });

  } catch (err) {
    console.log(err);
  }
}
