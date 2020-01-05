import {
  SIGN_UP_PENDING,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_IN_PENDING,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  GET_CURRENT_USER_PENDING,
  GET_CURRENT_USER_SUCCESS,
  GET_CURRENT_USER_FAILURE,
  VALIDATE_TOKEN_PENDING,
  VALIDATE_TOKEN_SUCCESS,
  SIGN_OUT,
} from './auth-consts';

import {User} from '@state/actions/users-requests/actions';
import {Action} from '@state/index';

export const signUpOnPending = (): Action => ({
  type: SIGN_UP_PENDING,
});

export const signUpOnSuccess = (): Action => ({
  type: SIGN_UP_SUCCESS,
});

export const signUpOnFailure = (err: Error): Action => ({
  type: SIGN_UP_FAILURE,
  payload: err,
});

export const signInOnPending = (): Action => ({
  type: SIGN_IN_PENDING,
});

export const signInOnSuccess = (authToken: string): Action => ({
  type: SIGN_IN_SUCCESS,
  payload: authToken,
});

export const signInOnFailure = (err: Error): Action => ({
  type: SIGN_IN_FAILURE,
  payload: err,
});

export const getCurrentUserOnPending = (): Action => ({
  type: GET_CURRENT_USER_PENDING,
});

export const getCurrentUserOnSuccess = (user: User): Action => ({
  type: GET_CURRENT_USER_SUCCESS,
  payload: user,
});

export const getCurrentUserOnFailure = (err: Error): Action => ({
  type: GET_CURRENT_USER_FAILURE,
  payload: err,
});

export const validateTokenOnPending = (): Action => ({
  type: VALIDATE_TOKEN_PENDING,
});

export const validateTokenOnSuccess = (): Action => ({
  type: VALIDATE_TOKEN_SUCCESS,
});

export const signOut = (): Action => ({
  type: SIGN_OUT,
});
