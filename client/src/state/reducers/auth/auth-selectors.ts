import {AppState} from '../..';
import {User} from '@state/actions/users-requests/actions';

export const selectCurrentUserError = (
  state: AppState,
): Error | undefined => state.auth.currentUserError;
export const selectSignInError = (
  state: AppState,
): Error | undefined => state.auth.signInError;

export const selectAuthToken = (
  state: AppState,
): string | undefined => state.auth.authToken;
export const selectIsAuthTokenValidated = (
  state: AppState,
): boolean => state.auth.isAuthTokenValidated;
export const selectNeedTokenValidation = (state: AppState): boolean => (
  !!selectAuthToken(state) &&
  !selectIsAuthTokenValidated(state)
);
export const selectIsAuthenticated = (state: AppState): boolean => (
  !!selectAuthToken(state) &&
  selectIsAuthTokenValidated(state) === true
);

export const selectCurrentUser = (
  state: AppState,
): User | undefined => state.auth.currentUser;

export const selectCurrentUserName = (
  state: AppState,
): string | undefined => selectCurrentUser(state)?.name;
export const selectCurrentUserId = (
  state: AppState,
): string | undefined => selectCurrentUser(state)?._id;
export const selectCurrentUserEmail = (
  state: AppState,
): string | undefined => selectCurrentUser(state)?.email;

export const selectCurrentUserPending = (
  state: AppState,
): boolean => state.auth.isGetCurrentUserPending;
export const selectSignInPending = (
  state: AppState,
): boolean => state.auth.isSignInPending;
export const selectValidateTokenPending = (
  state: AppState,
): boolean => state.auth.isValidateTokenPending;

export const selectAuthPending = (state: AppState): boolean => (
  selectCurrentUserPending(state) ||
  selectSignInPending(state) ||
  selectValidateTokenPending(state)
);

export const selectAuthError = (state: AppState): Error | undefined => (
  selectCurrentUserError(state) ||
  selectSignInError(state)
);
