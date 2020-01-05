import {UsersModel} from '../../../models';
import {EncryptUtils} from '../../../utils';
import {DefaultSignInPayload} from '..';
import {UserJsonPayload} from 'src/models/users/users';

export class DefaultAuthStrategy {
  constructor(
    private users: UsersModel,
    private encrypt: EncryptUtils,
  ) {}

  async validate({
    email,
    password,
  }: DefaultSignInPayload,
  ): Promise<Pick<UserJsonPayload, '_id' | 'name' | 'role' | 'email'> | never> {
    const user = await this.users.findByEmail(email);

    if (!user || !('hash' in user)) {
      throw new Error('Invalid creadentials');
    }

    const {
      hash,
      salt,
      iterations,
      ...userData
    } = user;

    const isValid = await this.encrypt.validatePassword(password, {
      hash,
      salt,
      iterations,
    });

    if (!isValid) throw new Error('Invalid creadentials');

    return userData;
  }

  async create({
    email,
    name,
    password,
  }: {
    email: string;
    password: string;
    name: string;
  }): Promise<{
    email: string;
    hash: string;
    name: string;
    salt: string;
    iterations: number;
  }> {
    const {hash, salt, iterations} = await this.encrypt.encryptPassword(password);

    return {
      email,
      name,
      hash,
      salt,
      iterations,
    };
  }
}
