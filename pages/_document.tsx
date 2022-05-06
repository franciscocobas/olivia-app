import {Html, Head, Main, NextScript} from "next/document";

export default function Document() {
  return (
    <Html className="h-full">
      <Head>
        <style>
          {`#__next {
              height: 100%
            }`}
        </style>
      </Head>
      <body className="h-full">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
