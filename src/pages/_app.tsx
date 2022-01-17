import { AppProps } from "next/app";
import Head from "next/head";

import { AppProviders, Layout } from "../components";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Foosball My Dudes</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <AppProviders>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppProviders>
    </>
  );
}
