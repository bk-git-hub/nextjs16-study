// app/ui/signin-form.tsx
'use client';

import { useActionState } from 'react';
// ✅ Import your new action and the state type
import { authenticate, type AuthFormState } from '../../actions/authenticate';

const initialState: AuthFormState | undefined = undefined;

export default function SignUpPage() {
  const [state, formAction, isPending] = useActionState(
    authenticate,
    initialState
  );

  return (
    <div>
      <form action={formAction} className='flex flex-col m-auto gap-2'>
        {/* ... inputs ... */}
        <label>
          Email <input name='email' type='email' />
        </label>
        <label>
          Password <input name='password' type='password' />
        </label>

        {/* ✅ It just works */}
        {state?.error && <p style={{ color: 'red' }}>{state.error}</p>}

        <button disabled={isPending}>
          {isPending ? '로그인 중...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
}
