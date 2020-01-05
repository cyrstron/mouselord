import {Dispatch} from 'redux';
import {SIGN_OUT} from '../auth-consts';
import {Action} from '@state/index';

export const handleSignOut = () => (
  next: Dispatch,
) => (
  action: Action,
): Action => {
  if (action.type !== SIGN_OUT) return next(action);

  localStorage.removeItem('authToken');

  return next(action);
};
