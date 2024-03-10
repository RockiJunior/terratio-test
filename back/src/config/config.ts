import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    FILES_PATH: process.env.FILES_PATH,
    POSTGRES_DB_HOST: process.env.POSTGRES_DB_HOST,
    POSTGRES_DB_NAME: process.env.POSTGRES_DB_NAME,
    POSTGRES_DB_PORT: process.env.POSTGRES_DB_PORT,
    POSTGRES_DB_USER: process.env.POSTGRES_DB_USER,
    POSTGRES_DB_PASSWORD: process.env.POSTGRES_DB_PASSWORD,
  };
});
