import * as passport from 'passport';
import { Strategy as KakaoStrategy } from 'passport-kakao';
import { AUTH_PROVIDER } from '../config/login';
import { login } from '../config';
import User from '../entities/User';

export default () => {
  passport.use(
    new KakaoStrategy(
      {
        clientID: login.kakaoAppId,
        clientSecret: login.kakaoSecret,
        callbackURL: login.kakaoCallback,
      },
      async (_, __, profile, done) => {
        try {
          const snsId = profile.id;
          const name = profile.displayName;
          const email = profile._json.kakao_account.email;

          const existingUser = await User.findOne({ email });
          if (existingUser) {
            return done(undefined, existingUser);
          }

          const newUser = User.create({
            email,
            name,
            provider: AUTH_PROVIDER.KAKAO,
            snsId,
          }).save();

          return done(undefined, newUser);
        } catch (error) {
          return done(error, false, error.message);
        }
      },
    ),
  );
};
