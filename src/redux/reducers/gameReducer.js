import {
  GET_BOARD,
  REQUEST_GET_BOARD,
  GET_BOARD_SUCCESS,
  REQUEST_UPDATE_BOARD,
  UPDATE_BOARD,
  UPDATE_BOARD_SUCCESS,
} from '../action/type';




const initialState = {
  board: null,
  loading: true,
}

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_GET_BOARD:
      return {
        ...state,
        loading: true,
      }
    case GET_BOARD:
      return {
        ...state,
        board: action.data,
      }
    case GET_BOARD_SUCCESS:
      return {
        ...state,
        loading: false,
      }
    case REQUEST_UPDATE_BOARD:
      return {
        ...state,
        loading: true,
      }
    case UPDATE_BOARD_SUCCESS:
      return {
        ...state,
        loading: false,
      }
    case UPDATE_BOARD:
      return {
        ...state,
        board: action.data
      }

    default:
      return state;
  }
}


export default gameReducer;