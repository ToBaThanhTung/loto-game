import {
  INGAME_PHASE,
  CREATE_NEW_PLAYER_PHASE,
  PENDING_GAME_PHASE,
  WIN_GAME_PHASE,
  LOSE_GAME_PHASE,
} from '../action/type';

const initialState = {
  gamePhase: null,
  openDialog: false,
  msgTitleDialog: null,
  msgBodyDialog: null,
  playerWin: null,
}
const gamePhaseReducer = (state = initialState, action) => {
  switch (action.type) {
    case INGAME_PHASE:
      return {
        ...state,
        gamePhase: 'INGAME_PHASE',
      }
    case CREATE_NEW_PLAYER_PHASE:
      return {
        ...state,
        gamePhase: 'CREATE_NEW_PLAYER_PHASE',
      }
    case PENDING_GAME_PHASE:
      return {
        ...state,
        gamePhase: 'PENDING_GAME_PHASE',
        openDialog: false,
        playerWin: null
      }
    case WIN_GAME_PHASE:
      return {
        ...state,
        gamePhase: 'WIN_GAME_PHASE',
        openDialog: true,
        msgTitleDialog: 'You win !!!',
        msgBodyDialog: '$: +3000!',
      }
    case LOSE_GAME_PHASE:
      return {
        ...state,
        gamePhase: 'LOSE_GAME_PHASE',
        msgTitleDialog: 'You lose !!!',
        playerWin: action.playerWin,
        openDialog: true,
      }
    default:
      return state;
  }
}


export default gamePhaseReducer;