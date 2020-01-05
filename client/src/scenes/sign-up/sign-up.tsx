import React from 'react';
import {Link} from 'react-router-dom';
import classnames from 'classnames/bind';

import {ExternalAuth} from '@components/elements/external-auth';
import {SignUpForm} from './components/sign-up-form';

import styles from './sign-up.scss';

const cx = classnames.bind(styles);

const SignUp = () => (
  <div className={cx('sign-up')}>
    <h2>Sign up</h2>
    <p>
          Already have an account? <Link to='/sign-in'>Sign in</Link>
    </p>
    <ExternalAuth
      className={cx('external-auth')}
    >
      <SignUpForm />
    </ExternalAuth>
  </div>
);

export {SignUp};
