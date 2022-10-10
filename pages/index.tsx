import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRecoilState } from "recoil";
import DarkModeToggle from "../components/DarkModeToggle";
import SvgIcon from "../components/SvgIcon";
import { testState } from "../recoilState/recoilState";

const Home: NextPage = (): JSX.Element => {
  const [state, setState] = useRecoilState(testState);
  return (
    <div className="p-12">
      <div className=" h-96 w-96 rounded-lg bg-primary superflex">
        <div className=" w-32 h-32 rounded-lg grad">sdvsdvdsv</div>

      </div>
    </div>
  );
};

export default Home;
