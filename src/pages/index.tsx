import { useState } from 'react';

export default function Home() {
  const [title, setTitle] = useState('');
  return (
    <>
      <main>
        <h1 className="text-2xl text-emerald-500">Hello World!</h1>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Title</span>
          </label>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            type="text"
            placeholder="Title"
            className="input input-bordered w-full max-w-xs"
          />
        </div>
      </main>
    </>
  );
}
