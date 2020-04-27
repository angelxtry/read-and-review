import * as express from 'express';
import { Request, Response } from 'express';
import decodeJWT from '../../utils/decodeJWT';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const token = req.cookies['access-token'];
    if (token) {
      const user = await decodeJWT(token);
      console.log(user);
      if (user) {
        return res.status(200).json({
          status: 'success',
          data: {
            id: user.id,
            name: user.name,
            email: user.email,
          },
        });
      }
    }
    return res.status(401).json({
      status: 'fail',
      data: {
        message: 'Login Error.',
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      data: {
        message: error.message,
      },
    });
  }
});

export default router;
