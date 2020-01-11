import {JwtUtils, JwtSettings} from './jwt';

export async function createJwtUtils(settings: JwtSettings): Promise<JwtUtils> {
  return new JwtUtils(settings);
}

export {JwtUtils};
