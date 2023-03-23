import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';

export default function UserInfo() {
  const [shareButton, setShareButton] = useState('Share');
  const [showButtons, setShowButtons] = useState(false);
  const { data: session, status } = useSession();
  if (session && status === 'authenticated') {
    return (
      <div className="fixed gap-3 top-2 right-2 z-[998]">
        <div
          className="flex flex-row items-center gap-1 hover:cursor-pointer"
          onClick={() => setShowButtons(!showButtons)}
        >
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
        </div>
        {showButtons && (
          <div className="flex flex-col p-2 mt-2 gap-1 bg-black bg-opacity-70">
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
              className="btn-sm btn-warning rounded-md"
            >
              {shareButton}
            </button>
            <button
              onClick={() => signOut()}
              className="btn-sm btn-warning rounded-md"
            >
              Sign out
            </button>
          </div>
        )}
      </div>
    );
  }
  return (
    <div className="fixed flex justify-center items-center gap-3 top-2 right-2 z-[998]">
      <Link href="/login">Log in</Link>
    </div>
  );
}
