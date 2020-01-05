import {RolesModel, RoleSchema} from './roles';
import {Db} from 'mongodb';

export function createRolesModel(db: Db): RolesModel {
  return new RolesModel(db);
}

export {RolesModel, RoleSchema};
