import axios from "axios";
import type { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import CoinString from "../components/CoinString";
import { coinDataState } from "../recoilState/recoilState";
import moment from "moment";

interface IProps {
  data: MainCoinData[] | [];
}

const coinGeckoUrl =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true";

const Home = ({ data }: IProps): JSX.Element => {
  const [coins, setCoins] = useRecoilState(coinDataState);
  const [currentTime, setCurrentTime] = useState();

  const lastTimeUpdatePrice: string =
    coins[0] && Array.from(coins[1]?.last_updated).slice(11, 19).join("");

  useEffect(() => {
    setCoins(data);
  }, []);

  return (
    <div className="w-full relative">
      <div className=" md:flex  md:grid-rows-3 justify-between grid-rows-3 overflow-x-scroll w-full scrollbar-hide md:h-[300px] h-[200px]" id="top">
        <div className=" grad-150 w-full md:w-[32.5%] h-full rounded-lg"></div>
        <div className=" grad-150 w-full md:w-[32.5%] h-full rounded-lg"></div>
        <div className=" grad-150 w-full md:w-[32.5%] h-full rounded-lg"></div>


      </div>
      <div className=" flex w-full justify-end md:px-4 px-0 mt-12">
        {
          <>
            <p className=" text-xs md:text-sm text-white/30">
              Last price update: {lastTimeUpdatePrice} UTC
            </p>
            <p className=" text-xs md:text-sm text-white/30 ">{}</p>
          </>
        }
      </div>
      <div className=" flex flex-col w-full space-y-2 items-center h-12 ">
        {coins.slice(0, 20).map((coin: MainCoinData, id: number) => {
          return <CoinString key={id} coin={coin} />;
        })}
      </div>
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const responce = await axios.get(coinGeckoUrl);
  return {
    props: {
      data: responce.data,
    },
  };
};
