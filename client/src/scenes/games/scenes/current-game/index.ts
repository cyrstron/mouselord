import {CurrentGame as CurrentGameComponent, CurrentGameProps} from './current-game';
import {withRouter} from 'react-router-dom';
import {AppState} from '@state/index';
import {selectCurrentGame, selectCurrentGamePending, selectCurrentGameError} from '@state/reducers/games/games-selectors';
import {connect} from 'react-redux';
import {fetchCurrentGame, resetCurentGame} from '@state/reducers/games/games-operations';

const mapStateToProps = (
  state: AppState,
): Pick<CurrentGameProps, 'game' | 'isPending' | 'error'> => ({
  game: selectCurrentGame(state),
  isPending: selectCurrentGamePending(state),
  error: selectCurrentGameError(state),
});

export const CurrentGame = connect(mapStateToProps, {
  fetchGame: fetchCurrentGame,
  resetGame: resetCurentGame,
})(withRouter(CurrentGameComponent));
