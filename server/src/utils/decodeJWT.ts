import * as jwt from 'jsonwebtoken';
import User from '../entities/User';
import { common } from '../config';

const decodeJWT = async (token: string): Promise<User | undefined> => {
  try {
    const decoded: any = jwt.verify(token, common.jwtSecret);
    const { id } = decoded;
    const user = await User.findOne({ id });
    return user;
  } catch (error) {
    console.log({ error });
    return undefined;
  }
};

export default decodeJWT;
