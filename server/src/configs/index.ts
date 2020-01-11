export const utilsConfig = {
  encrypt: {
    saltLength: +process.env.ENCRYPT_SALT_LENGTH,
    encryption: process.env.ENCRYPT_ALGORITHM,
    iterations: +process.env.ENCRYPT_ITERATIONS,
    hashLength: +process.env.ENCRYPT_HASH_LENGTH,
    encoding: 'base64',
  },
  facebook: {
    appId: process.env.FB_APP_ID,
    appSecret: process.env.FB_APP_SECRET,
  },
  jwt: {
    privateKey: process.env.JWT_PRIVATE_KEY,
    publicKey: process.env.JWT_PUBLIC_KEY,
    expiration: '24h',
    encryption: 'RS256',
    issuer: 'MouseLord',
    audience: 'https://www.mouselord.xyz',
  },
};

export const loadersConfig = {
  mongo: {
    url: process.env.MONGODB_URL,
    dbName: 'micelord',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
};

export const serverConfig = {
  port: +process.env.PORT || 3001,
};
