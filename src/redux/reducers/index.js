import { combineReducers } from 'redux';
import gameReducer from './gameReducer';
import playerReducer from './playerReducer';
import gamePlayReducer from './gamePlayReducer';
import gamePhaseReducer from './gamePhaseReducer';
const rootReducer = combineReducers({
  game: gameReducer,
  player: playerReducer,
  gamePlay: gamePlayReducer,
  gamePhase: gamePhaseReducer,
});

export default rootReducer;