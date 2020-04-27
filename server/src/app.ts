import * as express from 'express';
import { Request, Response } from 'express';
import * as cors from 'cors';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import * as cookieParser from 'cookie-parser';
import databaseConn from './utils/databaseConn';
import { common } from './config';

const app = express();
app.use(
  cors({
    origin: common.corsUrl,
    credentials: true,
  }),
);
app.use(helmet());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/health', (_, res) => {
  res.status(200).send('health check');
});

app.get('/', (_: Request, res: Response) => {
  res.status(200).send({
    message: 'Read and Review',
  });
});

const createServer = async () => {
  await databaseConn();
  return app;
};

export default createServer;
