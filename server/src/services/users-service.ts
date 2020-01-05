import {UsersModel} from '../models';
import {UserPayload} from './auth-service';
import {UserJsonPayload} from 'src/models/users/users';

export class UsersService {
  constructor(
    private users: UsersModel,
  ) {}

  getUserByGoogleToken(googleToken: string): Promise<UserJsonPayload | undefined> {
    return this.users.findByGoogleToken(googleToken);
  }

  getUserByFacebookAuth(email: string, token: string): Promise<UserJsonPayload | undefined> {
    return this.users.findByFacebookToken(email, token);
  }

  async getUserById(id: string): Promise<UserPayload | undefined> {
    const user = await this.users.findById(id);

    if (!user) return;

    const {
      _id,
      email,
      name,
      role,
    } = user;

    return {
      _id,
      email,
      name,
      role,
    };
  }
}
