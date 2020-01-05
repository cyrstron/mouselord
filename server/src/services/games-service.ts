
import {GamesModel, Game} from '../models/games';

export class GamesService {
  constructor(
    private games: GamesModel,
  ) {}

  getById(id: string): Promise<Game | undefined> {
    return this.games.findById(id);
  }

  create(game: Omit<Game, '_id'>): Promise<{_id: string}> {
    return this.games.add(game);
  }

  getAll(): Promise<Game[]> {
    return this.games.find();
  }
}
