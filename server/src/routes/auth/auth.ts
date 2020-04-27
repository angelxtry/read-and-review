import * as express from 'express';
import * as passport from 'passport';
import { AUTH_PROVIDER } from '../../config/login';
import authKakao from '../../controllers/authKakao';

const router = express.Router();

router.get('/kakao', passport.authenticate(AUTH_PROVIDER.KAKAO));

router.get(
  '/kakao/callback',
  passport.authenticate(AUTH_PROVIDER.KAKAO, { session: false }),
  authKakao,
);

export default router;
