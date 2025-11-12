import { signOut } from '@/auth';

export function SignOut() {
  return (
    <form
      action={async () => {
        'use server';
        await signOut({ redirectTo: `${process.env.APP_URL}/sign-in` });
      }}
    >
      <button
        type='submit'
        className='hover:cursor-pointer border p-4 rounded-2xl'
      >
        Sign Out
      </button>
    </form>
  );
}
