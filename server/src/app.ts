import * as express from 'express';
import { Request, Response } from 'express';
import * as cors from 'cors';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as passport from 'passport';
import databaseConn from './utils/databaseConn';
import { common } from './config';
import passportConfig from './passport';
import authRouter from './routes/auth';
import meRouter from './routes/me';

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
app.use(passport.initialize());

app.use('/auth', authRouter);
app.use('/me', meRouter);

app.use('/health', (_, res) => {
  res.status(200).send('health check');
});

app.get('/', (_: Request, res: Response) => {
  res.status(200).send({
    status: 'success',
    message: 'Read and Review',
  });
});

const createServer = async () => {
  await databaseConn();
  passportConfig();
  return app;
};

export default createServer;
