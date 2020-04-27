import { Request, Response } from 'express';
import User from '../../entities/User';
import createJWT from '../../utils/createJWT';
import { login } from '../../config';

const authKakao = (req: Request, res: Response) => {
  try {
    const user = req.user as User;
    if (user) {
      const accessToken = createJWT(user);
      res.cookie('access-token', accessToken, {
        domain: login.cookieDomain,
        maxAge: login.cookieMaxAge,
        httpOnly: true,
      });
      return res.status(200).redirect(login.loginSuccessRedirectUrl);
    }
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      data: {
        message: error.message,
      },
    });
  }
};

export default authKakao;
