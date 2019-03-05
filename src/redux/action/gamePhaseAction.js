import {
  INGAME_PHASE,
  CREATE_NEW_PLAYER_PHASE,
  PENDING_GAME_PHASE,
  WIN_GAME_PHASE,
  LOSE_GAME_PHASE
} from './type';

export const switchInGamePhase = () => (dispatch, getState) => {
  dispatch({
    type: INGAME_PHASE
  })
};

export const switchCreateNewPlayerPhase = () => dispatch => {
  dispatch({
    type: CREATE_NEW_PLAYER_PHASE
  })
};

export const switchPendingGamePhase = () => dispatch => {
  dispatch({
    type: PENDING_GAME_PHASE,
  })
};


export const switchWinGamePhase = () => dispatch => {
  dispatch({
    type: WIN_GAME_PHASE
  })
};
