import type { NextPage } from "next";
import Body from "../components/Body";
import Header from "../components/Header";
import SideBar from "../components/SideBar";

const Home: NextPage = (): JSX.Element => {
  return (
    <div className="h-screen">
     <Header/>
     <SideBar/>
     <Body/>
    </div>
  );
};

export default Home;
