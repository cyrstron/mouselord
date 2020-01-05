import {
  FETCH_GAMES_PENDING,
  FETCH_GAMES_SUCCESS,
  FETCH_GAMES_FAILURE,
  FETCH_CURRENT_GAME_PENDING,
  FETCH_CURRENT_GAME_SUCCESS,
  FETCH_CURRENT_GAME_FAILURE,
  RESET_CURRENT_GAME,
} from './games-consts';
import {Game} from '@state/actions/games-requests/actions';
import {Action} from '@state/index';

export const fetchGamesPending = (): Action => ({
  type: FETCH_GAMES_PENDING,
});

export const fetchGamesSuccess = (games: Game[]): Action => ({
  type: FETCH_GAMES_SUCCESS,
  payload: games,
});

export const fetchGamesFailure = (err: Error): Action => ({
  type: FETCH_GAMES_FAILURE,
  payload: err,
});

export const fetchCurrentGamePending = (): Action => ({
  type: FETCH_CURRENT_GAME_PENDING,
});

export const fetchCurrentGameSuccess = (game: Game): Action => ({
  type: FETCH_CURRENT_GAME_SUCCESS,
  payload: game,
});

export const fetchCurrentGameFailure = (err: Error): Action => ({
  type: FETCH_CURRENT_GAME_FAILURE,
  payload: err,
});

export const resetCurentGame = (): Action => ({
  type: RESET_CURRENT_GAME,
});
