import {SignInForm as SignInFormComponent, SignInFormProps} from './sign-in-form';
import {connect} from 'react-redux';
import {signIn} from '@state/reducers/auth/auth-operations';
import {
  selectSignInError,
  selectSignInPending,
} from '@state/reducers/auth/auth-selectors';
import {AppState} from '@state/index';
import {withRouter} from 'react-router';

const mapStateToProps = (
  state: AppState,
): Pick<SignInFormProps, 'error' | 'isPending'> => ({
  error: selectSignInError(state),
  isPending: selectSignInPending(state),
});

export const SignInForm = withRouter(
  connect(
    mapStateToProps,
    {
      signIn,
    },
  )(SignInFormComponent),
);

