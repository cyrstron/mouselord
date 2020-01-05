import {Db} from 'mongodb';
import {GamesModel, GameSchema, GameJsonPayload, Game} from './games';

export function createGamesModel(db: Db): GamesModel {
  return new GamesModel(db);
}

export {GamesModel, GameSchema, GameJsonPayload, Game};
