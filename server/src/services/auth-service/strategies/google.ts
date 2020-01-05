import {UsersModel} from '../../../models';
import {GoogleAuthUtils} from '../../../utils';
import {AuthStrategy} from './';
import {SignInPayload, GoogleSignInPayload} from '..';
import {UserJsonPayload} from 'src/models/users/users';

export class GoogleAuthStrategy implements AuthStrategy {
  constructor(
    private users: UsersModel,
    private googleAuth: GoogleAuthUtils,
  ) {}

  async validate(
    signInPayload: SignInPayload,
  ): Promise<Pick<UserJsonPayload, '_id' | 'name' | 'email'> | never> {
    const {googleToken} = signInPayload as GoogleSignInPayload;

    const user = await this.users.findByGoogleToken(googleToken);

    if (!user) {
      throw new Error('Invalid creadentials');
    }

    const {
      email,
      name,
      _id,
    } = user;

    return {
      email,
      name,
      _id,
    };
  }

  async create({
    name,
    googleToken,
  }: {
    name: string;
    googleToken: string;
  }): Promise<{
    name: string;
    email: string;
    google: true;
  }> {
    const {email} = await this.googleAuth.decodeToken(googleToken);

    return {
      name,
      email,
      google: true as true,
    };
  }
}
