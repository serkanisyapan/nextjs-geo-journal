import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';

export default function UserInfo() {
  const [shareButton, setShareButton] = useState('Share');
  const { data: session, status } = useSession();
  if (session && status === 'authenticated') {
    return (
      <div className="group fixed flex justify-center items-center gap-3 top-2 right-2 z-[998]">
        <p>{session.user?.email?.split('@')[0]}</p>
        <figure className="w-7">
          <picture>
            <img
              className="rounded-full"
              src={session.user?.image!}
              alt={session.user?.name!}
            />
          </picture>
        </figure>
        <button
          onClick={() => {
            navigator.clipboard.writeText(
              `https://geojournal.vercel.app/user/${
                session.user?.email?.split('@')[0]
              }`
            );
            setShareButton('Copied!');
            setTimeout(() => {
              setShareButton('Share');
            }, 1000);
          }}
          className="hidden group-hover:block btn-xs btn-warning rounded-md"
        >
          {shareButton}
        </button>
        <button
          onClick={() => signOut()}
          className="hidden group-hover:block btn-xs btn-warning rounded-md"
        >
          Sign out
        </button>
      </div>
    );
  }
  return (
    <div className="fixed flex justify-center items-center gap-3 top-2 right-2 z-[998]">
      <Link href="/login">Log in</Link>
    </div>
  );
}
