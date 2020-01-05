import {Db, Collection} from 'mongodb';
import {HashedPassword} from '../../utils';

export interface RoleSchema extends HashedPassword {
  name: string;
  permissons: Array<{
    collection: string;
    action: string;
  }>;
}

export type RoleJsonPayload = RoleSchema & {
  _id: string;
}

export class RolesModel {
  collection: Collection<RoleSchema>;

  constructor(db: Db) {
    this.collection = db.collection<RoleSchema>('roles');

    this.collection.createIndex({name: 1}, {unique: true});
  }

  async getByName(name: string): Promise<RoleSchema[]> {
    const result = await this.collection.find({name});

    return result.toArray();
  }
}
