import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en" data-theme="dracula">
      <Head>
        <meta
          content="width=device-width, initial-scale=1 user-scalable=no"
          name="viewport"
        />
        <meta
          content="Track places you have visited in your life"
          name="description"
        />
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
