import axios from "axios";
import { GetStaticPropsContext } from "next";
import Link from "next/link";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useRecoilState } from "recoil";
import { coinDataState } from "../../recoilState/recoilState";

const coinGeckoUrl =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true";

export const getStaticPaths = async () => {
  const responce = await fetch(coinGeckoUrl);
  const data = await responce.json();

  const paths = data.map((coin: MainCoinData) => {
    return {
      params: { symbol: coin.symbol },
    };
  });

  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  if (context.params?.symbol) {
    const coinData = context.params.symbol;
    return {
      props: { coin: coinData },
    };
  }

  // try {
  //   if (context.params?.symbol) {
  //     const responce = await fetch(coinGeckoUrl);
  //     const data = await responce.json();

  //     const coinData = context.params.symbol;

  //     if (data) {
  //       const arrayCoinsCheck: MainCoinData = data?.filter(
  //         (coin: MainCoinData) => coin.symbol === coinData
  //       );

  //       return {
  //         props: { coin: arrayCoinsCheck },
  //       };
  //     }
  //   }
  // } catch (error) {
  //   return null;
  // }
};

interface IProps {
  coin: MainCoinData[];
}

export default function CoinPage({ coin }: any): JSX.Element {
  const [coins, setCoins] = useRecoilState(coinDataState);

  const coinDataOnPage: MainCoinData | MainCoinData[] = coins.filter(
    (coinName: MainCoinData) => coinName.symbol === coin
  );
  const coinUse: MainCoinData = coinDataOnPage[0];

  console.log(coinUse);
  if (coin) {
    return (
      <div className=" w-full h-full">
        <Link href={"/"}>
          <div className=" flex w-[80px] md:w-[80px] items-center cursor-pointer space-x-2 bg-violet-700/0 hover:bg-violet-700/40 tr-300 rounded-md pl-1  py-1">
            <IoIosArrowRoundBack className="text-xl" />
            <p>Back</p>
          </div>
        </Link>
        <div className=" w-full flex justify-between p-4 border-2 rounded-md border-white/10">
          <div className=" w-full ">
            <div className=" flex items-center  w-full justify-between ">
              <div className=" flex items-center  space-x-2 mr-2">
                <img
                  src={coinUse?.image}
                  className={`w-12 h-12 object-contain`}
                />
                <p className=" text-2xl">{coinUse?.name}</p>
                <div className=" grad-150 text-white px-2 py-1 rounded-md">
                  {coinUse?.symbol.toUpperCase()}
                </div>
              </div>
              {true ? (
                <AiFillStar className="text-3xl md:text-[40px] hover:scale-110 tr-300 text-violet-500  " />
              ) : (
                <AiOutlineStar className="text-3xl md:text-[40px] hover:scale-110 tr-300 opacity-50" />
              )}
            </div>
            <div className=" mt-4 text-xs grad-150 text-white px-2 py-1 rounded-md text-center w-[80px]">
              Rank #{coinUse?.market_cap_rank}
            </div>
          </div>
        </div>
        <div className="p-4 border-2 rounded-md border-white/10 w-full flex mt-4">

        </div>
      </div>
    );
  }
  return <div>Error Api</div>;
}
