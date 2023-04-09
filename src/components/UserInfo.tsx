import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';

export default function UserInfo() {
  const [shareButton, setShareButton] = useState('Share');
  const { data: session, status } = useSession();
  if (session && status === 'authenticated') {
    return (
      <div className="dropdown dropdown-end fixed top-3 right-2 z-[998]">
        <label tabIndex={0}>
          <div className="flex flex-row items-center gap-1 hover:cursor-pointer">
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
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow text-black bg-white rounded-box w-40 flex flex-col gap-1 mt-1"
        >
          <li>
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
              className="btn btn-info rounded-md"
            >
              {shareButton}
            </button>
          </li>
          <li>
            <button
              onClick={() => signOut()}
              className="btn btn-info rounded-md"
            >
              Sign out
            </button>
          </li>
        </ul>
      </div>
    );
  }
  return (
    <div className="fixed flex justify-center items-center gap-3 top-2 right-2 z-[998]">
      <Link href="/login">Log in</Link>
    </div>
  );
}
