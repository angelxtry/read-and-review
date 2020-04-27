import { createConnection, getConnection, getConnectionOptions } from 'typeorm';

export default async () => {
  let name = 'development';
  if (process.env.NODE_ENV) {
    name = process.env.NODE_ENV;
  }

  const connectionOptions = await getConnectionOptions(name);
  await createConnection({ ...connectionOptions, name: 'default' });
};

export const closeDatabaseConn = async () => {
  await getConnection().close();
};
