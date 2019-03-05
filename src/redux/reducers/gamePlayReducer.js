import {
  REQUEST_GAME_PLAY,
  GAME_PLAY,
  GAME_PLAY_SUCCESS,
  REQUEST_RAND_NUM,
  RAND_NUM,
  RAND_NUM_SUCCESS,
  REQUEST_RESET_GAME,
  RESET_GAME,
  RESET_GAME_SUCCESS,
} from '../action/type';


const initialState = {
  gamePlay: null,
  loading: true,
  loadNum: true,
  num: null,
  listGeneratedNum: [],
}

const gamePlayReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_GAME_PLAY:
      return {
        ...state,
        loading: true,
      }
    case GAME_PLAY:
      return {
        ...state,
        gamePlay: action.data,
      }
    case GAME_PLAY_SUCCESS:
      return {
        ...state,
        loading: false,
      }
    case REQUEST_RAND_NUM:
      return {
        ...state,
        loadNum: true,
      }
    case RAND_NUM:
      return {
        ...state,
        num: action.data,
        listGeneratedNum: [...state.listGeneratedNum, action.data]
      }
    case RAND_NUM_SUCCESS:
      return {
        ...state,
        loadNum: false,
      }
    default:
      return state;
  }
}

export default gamePlayReducer;