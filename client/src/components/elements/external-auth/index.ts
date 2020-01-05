import {AppState} from '@state/index';
import {selectIsAuthenticated, selectAuthError} from '@state/reducers/auth/auth-selectors';
import {signInWithGoogle, signInWithFacebook} from '@state/reducers/auth/auth-operations';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {ExternalAuth as ExternalAuthComponent, ExternalAuthProps} from './external-auth';

const mapStateToProps = (
  state: AppState,
): Pick<ExternalAuthProps, 'isSignedIn' | 'authError'> => ({
  isSignedIn: selectIsAuthenticated(state),
  authError: selectAuthError(state),
});

const ExternalAuth = connect(mapStateToProps, {
  signInWithGoogle,
  signInWithFacebook,
})(
  withRouter(ExternalAuthComponent),
);

export {ExternalAuth};
