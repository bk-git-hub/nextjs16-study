import { signIn } from '@/auth';
// ✅ AuthError를 임포트합니다.
import { AuthError } from 'next-auth';

export default function SignInPage() {
  return (
    <form
      action={async (formData) => {
        'use server';
        console.log(formData);
        try {
          // ✅ 성공 시 이동할 경로를 명시해주는 것이 좋습니다.
          await signIn('credentials', {
            email: formData.get('email'),
            password: formData.get('password'),
            redirectTo: '/dashboard',
          });
          // (명시하지 않아도 기본 경로로 리디렉션 에러를 던집니다)
        } catch (err) {
          // ✅ 잡힌 에러가 AuthError 인스턴스인지 확인합니다.
          if (err instanceof AuthError) {
            // AuthError가 맞다면, 타입에 따라 분기합니다.
            if (err.type === 'CredentialsSignin') {
              console.log('자격증명 오류: 이메일 또는 비밀번호가 잘못됨');
              // TODO: 실패 시 사용자에게 피드백 (useFormState 등)
            } else {
              // 다른 종류의 AuthError (예: OAuth 실패 등)
              console.error('다른 인증 오류:', err.message);
            }
          } else {
            // ✅ AuthError가 아니라면?
            // 이것이 바로 '성공적인 리디렉션 신호'입니다.
            // Next.js가 처리할 수 있도록 다시 던져줍니다.
            throw err;
          }
        }
      }}
      className='flex flex-col m-auto gap-2'
    >
      <label>
        Email
        <input name='email' type='email' />
      </label>
      <label>
        Password
        <input name='password' type='password' />
      </label>
      <button>Sign In</button>
    </form>
  );
}
