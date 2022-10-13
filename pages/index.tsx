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
  const [currentTime, setCurrentTime] = useState<string>("");

  const lastTimeUpdatePrice: string =
    coins[0] && Array.from(coins[1]?.last_updated).slice(11, 19).join("");

    useEffect(() => {
      setTimeout(()=>{
        const now = moment().subtract(3,"hour").format('hh:mm:ss');
        setCurrentTime(now)
      },1000)

    }, [currentTime]);

  useEffect(() => {
    setCoins(data);
  }, []);

  return (
    <div className="w-full relative">
      <div className="  md:h-[300px] h-[200px] flex overflow-x-scroll scrollbar-hide ">
        <div
          className=" md:flex flex-row md:grid-rows-3 md:justify-between w-full  h-full"
          id="top"
        >
          <div className=" grad-150 w-full md:w-[32.5%] h-full rounded-lg">
            <p>Top Gainers</p>
          </div>
          <div className=" grad-150 w-full md:w-[32.5%] h-full rounded-lg">
          <p>Top Losers</p>
          </div>
          <div className=" grad-150 w-full md:w-[32.5%] h-full rounded-lg">
            <p>Favorite</p>
          </div>
        </div>
      </div>
      <div className=" flex w-full justify-end md:px-4 px-0 mt-12">
        {
          <>
            <p className=" text-xs md:text-sm text-white/30">
              Last price update: {lastTimeUpdatePrice} UTC
            </p>
            <p className=" text-xs md:text-sm text-white/30 ">/ Current UTC {currentTime}</p>
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
