import {connect} from 'react-redux';
import {GamesList as GameListComponent, GamesListProps} from './games-list';
import {AppState} from '@state/index';
import {selectGames, selectGamesPending, selectGamesError} from '@state/reducers/games/games-selectors';
import {fetchGames} from '@state/reducers/games/games-operations';

const mapStateToProps = (
  state: AppState,
): Pick<GamesListProps, 'games' | 'isPending' | 'error'> => ({
  games: selectGames(state),
  isPending: selectGamesPending(state),
  error: selectGamesError(state),
});

const GamesList = connect(
  mapStateToProps, {
    fetchGames,
  })(GameListComponent);

export {GamesList};
