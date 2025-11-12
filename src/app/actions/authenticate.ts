// app/actions/auth.ts
'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

export type AuthFormState = {
  error?: string;
};

// ✅ CORRECTED SIGNATURE:
export async function authenticate(
  prevState: AuthFormState | undefined, // 1. Must be the first argument
  formData: FormData // 2. Must be the second argument
): Promise<AuthFormState> {
  try {
    await signIn('credentials', {
      ...Object.fromEntries(formData),
      redirectTo: '/',
    });
    return {};
  } catch (err) {
    if (err instanceof AuthError) {
      if (err.type === 'CredentialsSignin') {
        return {
          error: '자격증명 오류: 이메일 또는 비밀번호가 잘못되었습니다.',
        };
      } else {
        return { error: '다른 인증 오류가 발생했습니다.' };
      }
    } else {
      throw err;
    }
  }
}
