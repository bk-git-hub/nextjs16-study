import { Session } from 'next-auth';
import Image from 'next/image';

export default function UserAvatar({ session }: { session: Session }) {
  if (!session?.user) return null;
  const { image, name } = session.user;
  // console.log('name: ' + name);
  if (image) {
    return (
      <div className='w-20 h-20 relative'>
        <Image
          src={image}
          alt={name || 'User Avatar'}
          className='w-10 h-10 rounded-full'
          fill
        />
      </div>
    );
  }

  if (name) {
    const initials = name.slice(0, 2).toUpperCase();

    return (
      <div
        className='flex items-center justify-center w-20 h-20 rounded-full bg-gray-200 text-gray-700 font-semibold'
        aria-label={name}
      >
        {initials}
      </div>
    );
  }
  return null;
}
