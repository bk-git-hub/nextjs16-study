// src/components/Header.tsx (or .jsx)

import { auth } from '@/auth';
import UserAvatar from '../user-avatar';
import Link from 'next/link';

export default async function Header() {
  const session = await auth();

  return (
    <header>
      {session ? (
        <UserAvatar session={session} />
      ) : (
        <Link href='/sign-in'>Sign In</Link>
      )}
    </header>
  );
}
