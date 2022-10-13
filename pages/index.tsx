import axios from "axios";
import type { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import CoinString from "../components/CoinString";
import { coinDataState } from "../recoilState/recoilState";
import moment from "moment";
import MobileSlider from "../components/MobileSlider";
import DesktopSlider from "../components/DesktopSlider";
import PagesAmountAtTime from "../components/PagesAmountAtTime";

interface IProps {
  data: MainCoinData[] | [];
}

const coinGeckoUrl =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true";

const Home = ({ data }: IProps): JSX.Element => {
  const [coins, setCoins] = useRecoilState(coinDataState);
  const [currentTime, setCurrentTime] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [amountPagesShown, setAmountPagesShown] = useState(10);

  const lastTimeUpdatePrice: string =
    coins[0] && Array.from(coins[1]?.last_updated).slice(11, 19).join("");

  useEffect(() => {
    setTimeout(() => {
      const now = moment().subtract(3, "hour").format("hh:mm:ss");
      setCurrentTime(now);
    }, 1000);
  }, [currentTime]);

  useEffect(() => {
    setCoins(data);
  }, []);

  return (
    <div className="w-full relative">
      <div className="  md:h-[300px] h-[200px]  w-full">
        <div className=" hidden md:inline">
          <DesktopSlider />
        </div>
        <div className=" inline md:hidden">
          <MobileSlider />
        </div>
      </div>
      <div className=" flex w-full justify-center items-center md:justify-between  mt-12 pb-2">
        {
          <>
            <div className=" hidden md:inline ">
              <PagesAmountAtTime amountPagesShown={amountPagesShown} setAmountPagesShown={setAmountPagesShown}/>
            </div>
            <div className=" flex items-center">
              <p className=" text-xs md:text-sm text-white/30">
                Last price update: {lastTimeUpdatePrice} UTC
              </p>
              <p className=" text-xs md:text-sm text-white/30 ">
                / Current UTC {currentTime}
              </p>
            </div>
          </>
        }
      </div>
      <div className=" flex flex-col w-full space-y-2 items-center  ">
        {coins
          .slice(
            currentPage * amountPagesShown - amountPagesShown,
            currentPage * amountPagesShown
          )
          .map((coin: MainCoinData, id: number) => {
            return <CoinString key={id} coin={coin} />;
          })}
      </div>
      <div className=" py-4 flex space-x-2">
        {Array.from({ length: 100/amountPagesShown }, (_, i) => i + 1).map((btn: number) => {
          return (
            <div
              onClick={() => {
                setCurrentPage(btn);
              }}
              key={btn}
              className="w-6 h-6 md:h-10 md:w-10 grad-150 hover:grad tr-300 superflex rounded-md shadow-md cursor-pointer text-sm"
            >
              {btn}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const responce = await axios.get(coinGeckoUrl).catch((e) => console.log(e));
  return {
    props: {
      data: responce?.data,
    },
  };
};
