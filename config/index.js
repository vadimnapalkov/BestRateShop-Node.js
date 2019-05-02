const commonConfig = {
  port: parseInt(process.env.PORT, 10) || 3001,
  corsDomain: process.env.CORS_DOMAIN || "*"
};

module.exports = commonConfig;
