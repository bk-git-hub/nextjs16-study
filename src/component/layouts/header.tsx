// src/components/Header.tsx (or .jsx)

import { auth } from '@/auth';
import UserAvatar from '../user-avatar';
import Link from 'next/link';
import { SignOut } from '../sign-out';

export default async function Header() {
  const session = await auth();
  console.log('header rendered');
  return (
    <header>
      {session ? (
        <div className='flex'>
          {' '}
          <UserAvatar session={session} />
          <SignOut />
        </div>
      ) : (
        <Link href='/sign-in'>Sign In</Link>
      )}
    </header>
  );
}
