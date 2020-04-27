import { common } from './config';
import createServer from './app';

const { port } = common;

createServer().then((app) =>
  app.listen(port, () => {
    console.log(`Listening on ${port} port.`);
  }));
