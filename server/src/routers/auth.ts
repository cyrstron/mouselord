
import {AuthController} from '../controllers';
import {Router} from 'express';

export const createAuthRouter = (
  createRouter: () => Router,
  controller: AuthController,
): Router => {
  const router = createRouter();

  router.post('/validate-name', controller.validateName);
  router.post('/validate-email', controller.validateEmail);
  router.get('/validate-token', controller.validateToken);

  router.post('/signup', controller.signUp);
  router.post('/signin', controller.signIn);

  return router;
};
