const commonConfig = {
  port: parseInt(process.env.PORT, 10) || 3001,
  Domain: process.env.DOMAIN || "localhost:3001",
  corsDomain: process.env.CORS_DOMAIN || "*",
  frontDomain: process.env.FRONT_DOMAIN || "localhost:3000",
  vkId: process.env.VKONTAKTE_APP_ID || "6962119",
  vkSecret: process.env.VKONTAKTE_APP_SECRET || "6Xm82pg5JgRclTPJrFRe"
};

module.exports = commonConfig;
