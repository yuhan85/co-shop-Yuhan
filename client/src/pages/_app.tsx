import { Helmet } from 'react-helmet';
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Helmet>
        <link rel="stylesheet" href="/styles/global.css" />
      </Helmet>
      <Component {...pageProps} />
    </>
  )
}
