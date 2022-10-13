import axios from "axios";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import CoinString from "../components/CoinString";
import { coinDataState } from "../recoilState/recoilState";

interface IProps {
  data: MainCoinData[] | [];
}

const coinGeckoUrl =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true";

const Home = ({ data }: IProps): JSX.Element => {
  const [coins, setCoins] = useRecoilState(coinDataState);

  useEffect(() => {
    setCoins(data);
  }, []);

  return (
    <div className="w-full ">
        <div className=" flex w-full justify-end md:px-4">
          {<>
            <p className=" text-xs md:text-sm text-white/30">
              Last price update:{" "}
              {coins[0] && Array.from(coins[0]?.last_updated).slice(11, 19)} UTC
            </p>
            <p>{Date.UTC}</p>
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
