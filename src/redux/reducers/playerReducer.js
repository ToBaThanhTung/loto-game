import {
  CREATE_NEW_PLAYER,
  REQUEST,
  SUCCESS,
  REQUEST_PLAYER_READY,
  PLAYER_READY,
  PLAYER_READY_SUCCESS,
  UPDATE_PLAYER
} from '../action/type';


const initialState = {
  player: null,
  loading: true,
}

const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST:
      return {
        ...state,
        loading: true,
      }
    case SUCCESS:
      return {
        ...state,
        loading: false,
      }
    case CREATE_NEW_PLAYER:
      return {
        ...state,
        player: action.data
      }
  
    case REQUEST_PLAYER_READY:
      return {
        ...state,
        loading: true,
      }
    case PLAYER_READY:
      return {
        ...state,
        player: action.data,

      }
    case PLAYER_READY_SUCCESS:
      return {
        ...state,
        loading: false,
      }

    case UPDATE_PLAYER:
      return {
        ...state,
        player: action.data
      }

    default:
      return state;
  }
}


export default playerReducer;