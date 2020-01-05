import {SaveGameForm as SaveGameFormComponent, SaveGameFormProps} from './save-game-form';
import {GamePayload, createGame} from '@state/actions/games-requests/actions';
import {connect} from 'react-redux';
import {AppDispatch} from '@state/index';

const mapDispatchToProps = (
  dispatch: AppDispatch,
): Pick<SaveGameFormProps, 'createGame'> => ({
  createGame: async (game: GamePayload): Promise<string> => dispatch(async (
    _dispatch,
    getState,
  ) => {
    const {_id} = await createGame(game, getState);

    return _id;
  }),
});

const SaveGameForm = connect(
  null,
  mapDispatchToProps,
)(SaveGameFormComponent);

export {SaveGameForm};
