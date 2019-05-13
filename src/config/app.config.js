import config from "./config";

const appConfig = {
  env: process.env.NODE_ENV || config.env,
  port: parseInt(process.env.PORT, 10) || Number(config.port),
  domain: process.env.DOMAIN || config.domain,
  corsDomain: process.env.CORS_DOMAIN || config.corsDomain,
  frontDomain: process.env.FRONT_DOMAIN || config.frontDomain,
  vkId: process.env.VKONTAKTE_APP_ID || config.vkId,
  vkSecret: process.env.VKONTAKTE_APP_SECRET || config.vkSecret,
  configDatabase: {
    username: process.env.DATABASE_USERNAME || config.configDatabase.username,
    password: process.env.DATABASE_PASSWORD || config.configDatabase.password,
    database: process.env.DATABASE_NAME || config.configDatabase.database,
    host: process.env.DATABASE_DEVELOPMENT_HOST || config.configDatabase.host,
    dialect: process.env.DATABASE_DIALECT || config.configDatabase.dialect
  }
};

export default appConfig;
