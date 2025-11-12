import { Session } from 'next-auth';
import Image from 'next/image';

export default function UserAvatar({ session }: { session: Session }) {
  if (!session?.user) return null;
  const { image, name } = session.user;
  if (image) {
    return (
      <div>
        <Image
          src={image}
          alt={name || 'User Avatar'}
          className='w-10 h-10 rounded-full'
        />
      </div>
    );
  }

  if (name) {
    const initials = name.slice(0, 2).toUpperCase();

    return (
      <div
        className='flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 text-gray-700 font-semibold'
        aria-label={name}
      >
        {initials}
      </div>
    );
  }
  return null;
}
