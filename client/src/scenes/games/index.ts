import {withSmartMapCtx} from 'react-google-maps-ts';

import {Games as GamesComponent, GamesProps} from './games';
import {AppState} from '@state/index';
import {selectCurrentGame} from '@state/reducers/games/games-selectors';
import {connect} from 'react-redux';

const mapStateToProps = (
  state: AppState,
): Pick<GamesProps, 'currentGame'> => ({
  currentGame: selectCurrentGame(state),
});

const Games = connect(mapStateToProps)(withSmartMapCtx<GamesProps>(GamesComponent));

export {Games};
