import { useEffect, useState } from "react";
import Header from "./Header";
import Head from "next/head";
import SideBar from "./SideBar";

interface IProps {
  children: JSX.Element;
}

export default function Layout({ children }: IProps): JSX.Element {
  const [userHeight, setuserHeight] = useState<number>(0);

 

  useEffect(() => {
    const resizeHandler = () => {
      setuserHeight(window.innerHeight);
    };
    setuserHeight(window.innerHeight);
    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  useEffect(() => {}, [userHeight]);
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
        />
      </Head>
      <Header />
      <SideBar />
      <div style={{ height: `${userHeight - 76}px` }} className="bodyPart ">
        {children}
      </div>
    </>
  );
}
