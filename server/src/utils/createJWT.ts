import * as jwt from 'jsonwebtoken';
import User from '../entities/User';
import { common } from '../config';

const createJWT = (user: User): string => {
  const token = jwt.sign({ id: user.id, email: user.email }, common.jwtSecret);
  return token;
};

export default createJWT;
