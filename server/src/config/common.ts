import { resolve } from 'path';
import { config } from 'dotenv';

config({ path: resolve(__dirname, '../../.env') });

type CommonConfig = {
  port: number;
  env: string;
  corsUrl: boolean | string[];
  jwtSecret: string;
};

const CORS_URL = ['https://book.doitreviews.com'];

const common: CommonConfig = {
  port: (process.env.PORT && parseInt(process.env.PORT, 10)) || 5000,
  env: process.env.NODE_ENV || 'development',

  corsUrl: true,

  jwtSecret: process.env.JWT_SECRET || '',
};

if (process.env.NODE_ENV === 'production') {
  common.corsUrl = CORS_URL;
}

export default common;
