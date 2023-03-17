import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          content="width=device-width, initial-scale=1 user-scalable=no"
          name="viewport"
        />
        <meta
          content="Track places you have visited in your life"
          name="description"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
