import {EncryptUtils, EncryptOptions, HashedPassword} from './crypto';
import {FsUtils} from './fs';
import {createJwtUtils, JwtUtils} from './jwt';
import {HttpUtils} from './http';
import {GoogleAuthUtils} from './google-auth';
import {FacebookAuthUtils, FacebookAuthConfig} from './facebook-auth';
import {JwtSettings} from './jwt/jwt';

export interface Utils {
  encrypt: EncryptUtils;
  fs: FsUtils;
  jwt: JwtUtils;
  http: HttpUtils;
  googleAuth: GoogleAuthUtils;
  facebookAuth: FacebookAuthUtils;
}

export interface UtilsConfig {
  encrypt: EncryptOptions;
  jwt: JwtSettings;
  facebook: FacebookAuthConfig;
}

export async function createUtils(config: UtilsConfig): Promise<Utils> {
  const fs = new FsUtils();

  const jwt = await createJwtUtils(config.jwt);
  const http = new HttpUtils();

  return {
    encrypt: new EncryptUtils(config.encrypt),
    jwt,
    fs,
    http,
    googleAuth: new GoogleAuthUtils(http),
    facebookAuth: new FacebookAuthUtils(http, config.facebook),
  };
}

export {EncryptUtils, HashedPassword, JwtUtils, HttpUtils, GoogleAuthUtils};
