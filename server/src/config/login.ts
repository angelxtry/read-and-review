import { resolve } from 'path';
import { config } from 'dotenv';

config({ path: resolve(__dirname, '../../.env') });

export enum AUTH_PROVIDER {
  KAKAO = 'kakao',
}

const ONE_DAY = 1000 * 60 * 60 * 24; // 1 day

type LoginConfig = {
  kakaoAppId: string;
  kakaoCallback: string;
  kakaoSecret: string;
  cookieDomain: string;
  cookieMaxAge: number;
  loginSuccessRedirectUrl: string;
};

const login: LoginConfig = {
  kakaoAppId: process.env.KAKAO_APP_ID || '',
  kakaoCallback: process.env.KAKAO_TEST_CALLBACK || '',
  kakaoSecret: process.env.KAKAO_SECRET || '',

  cookieDomain: 'localhost',
  cookieMaxAge: ONE_DAY,
  loginSuccessRedirectUrl: process.env.LOGIN_SUCCESS_REDIRECT_TEST_URL || '',
};

if (process.env.NODE_ENV === 'production') {
  login.kakaoCallback = process.env.KAKAO_CALLBACK || '';
  login.cookieDomain = process.env.COOKIE_DOMAIN || '';
  login.loginSuccessRedirectUrl = process.env.LOGIN_SUCCESS_REDIRECT_URL || '';
}

export default login;
