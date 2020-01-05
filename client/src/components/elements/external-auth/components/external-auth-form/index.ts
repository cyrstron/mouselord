import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {ExternalAuthForm as ExternalAuthFormComponent, ExternalAuthFormProps} from './external-auth-form';
import {AppState} from '@state/index';
import {
  selectSignInError,
  selectIsAuthenticated,
  selectAuthPending,
} from '@state/reducers/auth/auth-selectors';
import {signIn} from '@state/reducers/auth/auth-operations';
import {Dispatch} from 'redux';
import {ExternalAuthData} from '@state/actions/auth-request/actions';

const mapStateToProps = (
  state: AppState,
): Pick<ExternalAuthFormProps, 'signInError' | 'isSignedIn' | 'isAuthPending'> => ({
  signInError: selectSignInError(state),
  isSignedIn: selectIsAuthenticated(state),
  isAuthPending: selectAuthPending(state),
});

const mapDispatchToProps = (
  dispatch: Dispatch,
): Pick<ExternalAuthFormProps, 'signIn'> => ({
  signIn: async (authData: ExternalAuthData): Promise<void> => {
    if ('googleToken' in authData) {
      await signIn(authData)(dispatch);
    }
  },
});

export const ExternalAuthForm = connect(mapStateToProps, mapDispatchToProps)(
  withRouter(ExternalAuthFormComponent),
);
