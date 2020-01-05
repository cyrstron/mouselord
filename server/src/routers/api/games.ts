import {Router} from 'express';
import {GamesController} from '../../controllers/games-controller';

export const createGamesRouter = (
  createRouter: () => Router,
  controller: GamesController,
): Router => {
  const router = createRouter();

  router.get('/:id', controller.getGameById);

  router.get('/', controller.getAllGames);

  router.post('/', controller.createGame);

  return router;
};
