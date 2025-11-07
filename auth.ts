import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: '이메일', type: 'email' },
        password: { label: '비밀번호', type: 'password' },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        try {
          // 1. 백엔드 로그인 API 호출
          const res = await fetch(`${process.env.BACKEND_API_URL}/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          if (!res.ok) {
            console.error('백엔드 인증 실패');
            return null;
          }

          // 2. 백엔드 응답 데이터(제공해주신 JSON) 파싱
          const responseData = await res.json();

          // 3. 응답 데이터 구조 확인 및 Auth.js가 사용할 객체로 변환
          if (responseData && responseData.user && responseData.accessToken) {
            // Auth.js는 authorize가 평평한(flat) 객체를 반환하길 기대합니다.
            // 중첩된 user 객체의 속성과 토큰들을 결합합니다.

            // !!! 중요: Auth.js는 user.id가 'string'이길 강력히 권장합니다.
            // 백엔드에서 'id: 0' (숫자)으로 오므로 문자열로 변환합니다.
            return {
              ...responseData.user, // email, nickname, profileImageUrl 등
              id: String(responseData.user.id), // id를 문자열로 변환
              accessToken: responseData.accessToken,
              refreshToken: responseData.refreshToken,
            };
          }

          // 4. 유효한 데이터 구조가 아닐 경우
          return null;
        } catch (error) {
          console.error('로그인 요청 중 에러 발생:', error);
          return null;
        }
      },
    }),
  ],

  /**
   * Callbacks: 토큰과 세션에 추가 정보를 주입합니다.
   */
  callbacks: {
    /**
     * JWT 콜백: authorize에서 반환된 user 객체를 받아 token에 저장합니다.
     * (이 토큰은 암호화되어 쿠키에 저장됩니다)
     */
    async jwt({ token, user }) {
      // 'user' 객체는 로그인 성공 시(authorize 반환 시)에만 존재합니다.
      if (user) {
        // 'user'는 authorize에서 반환한 객체입니다.
        token.id = user.id; // authorize에서 문자열로 변환한 id

        token.nickname = user.nickname;

        token.profileImageUrl = user.profileImageUrl;

        token.accessToken = user.accessToken;

        token.refreshToken = user.refreshToken;
      }
      return token;
    },

    /**
     * Session 콜백: jwt 콜백에서 저장된 token 정보를 받아
     * 클라이언트(useSession, auth())에서 접근할 수 있는 session 객체에 전달합니다.
     */
    async session({ session, token }) {
      // 'token' 객체는 jwt 콜백의 반환 값입니다.
      if (session.user) {
        session.user.id = token.id as string;

        // Auth.js 기본 'name'과 'image' 필드에 매핑해두면 편리합니다.
        session.user.name = token.nickname as string;
        session.user.image = token.profileImageUrl as string;

        // 커스텀 속성으로도 추가 (선택 사항)

        session.user.nickname = token.nickname as string;
      }

      // 세션 객체 최상단에 토큰 추가 (클라이언트에서 API 요청 시 사용)

      session.accessToken = token.accessToken;

      session.refreshToken = token.refreshToken;

      return session;
    },
  },
});
