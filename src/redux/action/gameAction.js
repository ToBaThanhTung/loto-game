import {
  REQUEST_GET_BOARD,
  GET_BOARD,
  GET_BOARD_SUCCESS,
  UPDATE_BOARD,
  REQUEST_UPDATE_BOARD,
  UPDATE_BOARD_SUCCESS
} from './type';

const getBoardAction = (data) => ({
  type: GET_BOARD,
  data,
})

const updateBoardAction = (data) => ({
  type: UPDATE_BOARD,
  data,
})


export const updateBoard = (socket, cell, newBoard) => async dispatch => {
  dispatch({ type: REQUEST_UPDATE_BOARD })
  try {
    socket.emit('click', cell)
    await dispatch(updateBoardAction(newBoard));
    dispatch({ type: UPDATE_BOARD_SUCCESS })
    console.log('UPDATE BOARD');
    
  } catch (err) {
    console.log(err);
  }
}



export const getBoard = socket => async dispatch => {
  dispatch({
    type: REQUEST_GET_BOARD,
  })
  
  try {
    socket.emit('init_board', async (data) => {
      // console.log('fa.',data);
      await dispatch(getBoardAction(data));
      await dispatch({
        type: GET_BOARD_SUCCESS,
      });
    });
  } catch (e) {
    console.log(e);
  }

}
