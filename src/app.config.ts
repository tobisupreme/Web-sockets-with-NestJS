import { config } from 'dotenv';

config();

const env = (key: string, defaultVal: any = undefined) => {
  return process.env[key] || defaultVal;
};

env.require = (key: string, defaultVal: any = undefined) => {
  const value = process.env[key] || defaultVal;
  if (!value) {
    throw new Error(`Environment variable '${key}' is missing!`);
  }

  return value;
};

const configuration = {
  environment: env.require('NODE_ENV', 'development'),
  app: {
    port: parseInt(env('PORT', 8000)),
  },
  cors: { origins: process.env.CORS_ALLOWED_ORIGINS?.split(',') || '*' },
  swagger: {
    title: env.require('SWAGGER_TITLE'),
    description: env('SWAGGER_DESCRIPTION', 'A NestJS Project'),
    version: env('SWAGGER_VERSION', '1.0'),
  },
};

export default () => configuration;
