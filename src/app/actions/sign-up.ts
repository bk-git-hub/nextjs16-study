import { z } from 'zod';

const SignUpSchema = z.object({
  email: z.email({ error: '유효한 이메일 형식이 아닙니다' }),
  nickname: z
    .string()
    .min(2, { error: '닉네임은 최소 두 글자 이상이어야 합니다' }),
  password: z
    .string()
    .min(8, { error: '비밀번호는 최소 8글자 이상이어야합니다' }),
});

export type SignUpFormData = z.infer<typeof SignUpSchema>;
export type SignUpState =
  | {
      error?: string;
      issues?: {
        email?: string[];
        nickname?: string[];
        password?: string[];
      };
      success?: string;
    }
  | undefined;

export async function signUp(
  prevState: SignUpState,
  formData: FormData
): Promise<SignUpState> {
  const dataObject = Object.fromEntries(formData.entries());

  const validatedFields = SignUpSchema.safeParse(dataObject);

  if (!validatedFields.success) {
    return {
      error: '유효성 검사 실패',
      issues: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, nickname, password } = validatedFields.data;

  return { success: '회원가입 성공!' };
}
