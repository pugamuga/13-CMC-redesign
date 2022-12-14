import "../styles/globals.css";
import "../styles/nprogress.css";
import type { AppProps } from "next/app";
import { RecoilRoot, useRecoilState } from "recoil";
import Layout from "../components/Layout";
import { useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const loader = document.getElementById("globalLoader");
      if (loader)
        setTimeout(() => {
          loader.style.display = "none";
        }, 1000);
    }
  }, []);

  return (
    <RecoilRoot>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </RecoilRoot>
  );
}

export default MyApp;
