// types/next-auth.d.ts

import { DefaultSession } from 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';

/**
 * authorize에서 반환하는 user 객체 타입 (DB/백엔드 응답 기준)
 */
declare module 'next-auth' {
  interface User {
    // 백엔드 'user' 객체 속성
    id: string; // 우리는 authorize에서 숫자를 문자열로 변환했음
    nickname: string;
    profileImageUrl: string;
    // 백엔드 최상위 속성
    accessToken: string;
    refreshToken: string;
  }

  /**
   * 클라이언트(useSession)에서 받는 session.user 타입
   */
  interface Session extends DefaultSession {
    user: {
      id: string;
      nickname: string; // 커스텀 속성
    } & DefaultSession['user']; // name, email, image 상속

    // 세션 최상위에 추가할 토큰
    accessToken: string;
    refreshToken: string;
  }
}

/**
 * 서버(callbacks)에서 다루는 token 객체 타입
 */
declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    // authorize의 user 객체 속성을 모두 포함
    id: string;
    nickname: string;
    profileImageUrl: string;
    accessToken: string;
    refreshToken: string;
  }
}
