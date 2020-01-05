import {Router} from 'express';
import {Controllers} from '../../controllers';
import {createUsersRouter} from './users';
import {Middlewares} from '../../middlewares';
import {createGamesRouter} from './games';

export const createApiRouter = (
  createRouter: () => Router,
  {users, games}: Controllers,
  middlewares: Middlewares,
): Router => {
  const router = createRouter();
  const usersRouter = createUsersRouter(Router, users, middlewares);
  const gamesRouter = createGamesRouter(Router, games);

  router.use('/users', usersRouter);

  router.use(middlewares.verifyToken);

  router.use('/games', gamesRouter);

  return router;
};
