import {Header as HeaderComponent, HeaderProps} from './header';
import {AppState} from '@state/index';
import {selectIsAuthenticated} from '@state/reducers/auth/auth-selectors';
import {connect} from 'react-redux';

const mapStateToProps = (
  state: AppState,
): Pick<HeaderProps, 'isSignedIn'> => ({
  isSignedIn: selectIsAuthenticated(state),
});

export const Header = connect(mapStateToProps)(HeaderComponent);
