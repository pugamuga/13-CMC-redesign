import "../styles/globals.css";
import "../styles/nprogress.css"
import type { AppProps } from "next/app";
import { RecoilRoot, useRecoilState } from "recoil";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }: AppProps) {
 

  return (
    <RecoilRoot>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </RecoilRoot>
  );
}

export default MyApp;
