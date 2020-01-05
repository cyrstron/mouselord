import {UsersModel} from '../../../models';
import {FacebookAuthUtils} from '../../../utils/facebook-auth';
import {UserJsonPayload} from 'src/models/users/users';

export class FacebookAuthStrategy {
  constructor(
    private users: UsersModel,
    private facebookAuth: FacebookAuthUtils,
  ) {}

  async validate({
    email,
    facebookToken,
  }: {
      email: string;
      facebookToken: string;
    }): Promise<Pick<UserJsonPayload, '_id' | 'email' | 'name'> | never> {
    const user = await this.users.findByFacebookToken(email, facebookToken);

    if (!user) {
      throw new Error('Invalid creadentials');
    }

    const {
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
    email,
    facebookToken,
  }: {
    name: string;
    email: string;
    facebookToken: string;
  }): Promise<{
    name: string;
    email: string;
    facebook: true;
  } | never> {
    const isTokenValid = await this.facebookAuth.validateToken(facebookToken);

    if (!isTokenValid) throw new Error('Invalid creadentials');

    return {
      name,
      email,
      facebook: true as true,
    };
  }
}
