import axios from "axios";
import { GetStaticPropsContext } from "next";
import Link from "next/link";
import { AiFillStar, AiOutlineStar, AiFillCaretDown } from "react-icons/ai";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Sparklines, SparklinesLine } from "react-sparklines";
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
};

interface IProps {
  coin: string;
}

export default function CoinPage({ coin }: IProps): JSX.Element {
  const [coins, setCoins] = useRecoilState(coinDataState);

  const coinDataOnPage: MainCoinData | MainCoinData[] = coins.filter(
    (coinName: MainCoinData) => coinName.symbol === coin
  );
  const coinUse: MainCoinData = coinDataOnPage[0];
  const mathLine: number =
    100 /
    ((coinUse?.high_24h - coinUse?.low_24h) /
      (coinUse?.current_price - coinUse?.low_24h));

  const sparklineColor =
    coinUse?.sparkline_in_7d?.price[0] <
    coinUse?.sparkline_in_7d?.price[coinUse?.sparkline_in_7d?.price.length - 1]
      ? "#67dfbd"
      : "#ff7171";

  const sparkData: number[] = coinUse?.sparkline_in_7d.price;
  const sparkDataCopy: number[] | null =
    sparkData !== undefined ? [...sparkData] : null;
  const sort: number[] | boolean =
    sparkDataCopy !== null && sparkDataCopy?.sort((a, b) => a - b);

  const allTimeLow: number | boolean = typeof sort !== "boolean" && sort[0];
  const allTimeHigh: number | boolean = typeof sort !== "boolean" && sort[sort.length-1];

  console.log(allTimeLow);
  console.log(allTimeHigh);

  if (coin) {
    return (
      <div className=" w-full h-full">
        <Link href={"/"}>
          <div className=" flex w-[80px] md:w-[80px] items-center cursor-pointer space-x-2 bg-violet-700/0 hover:bg-violet-700/40 tr-300 rounded-md pl-1  py-1">
            <IoIosArrowRoundBack className="text-xl" />
            <p>Back</p>
          </div>
        </Link>
        <div className=" w-full flex justify-between p-4 border-2 rounded-md border-white/10 mt-2">
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
          <div className=" flex flex-col space-y-2 w-full" id="price">
            <p className=" text-xs text-white/40">
              {coinUse?.name} Price ({coinUse?.symbol.toUpperCase()})
            </p>
            <div className="flex items-center  space-x-2 ">
              <p className="text-3xl truncate w-[70%]">
                {" "}
                $
                {coinUse?.current_price > 2
                  ? coinUse?.current_price.toFixed(2)
                  : coinUse?.current_price}
              </p>
              <div
                className={` tr-300  px-2 py-1 text-xs rounded-lg flex space-x-1 items-center ${
                  coinUse?.price_change_percentage_24h > 0
                    ? "bg-[#67dfbd]"
                    : "bg-[#ff7171]"
                }`}
              >
                <AiFillCaretDown
                  className={`tr-300 ${
                    coinUse?.price_change_percentage_24h > 0
                      ? "rotate-180"
                      : "rotate-0"
                  }`}
                />
                <p>{coinUse?.price_change_percentage_24h.toFixed(2)}%</p>
              </div>
            </div>
            <div className=" flex flex-col space-y-1 ">
              {/* -----------btc------------ */}
              {coinUse?.id !== coins[0]?.id && (
                <div className=" flex space-x-2 items-center">
                  <p className=" text-xs text-white/50">
                    {(coinUse?.current_price / coins[0]?.current_price).toFixed(
                      8
                    )}{" "}
                    BTC
                  </p>
                  <div
                    className={` tr-300  px-2 py-1 text-xs rounded-lg flex space-x-1 items-center ${
                      coinUse?.price_change_percentage_24h > 0
                        ? "text-[#67dfbd]"
                        : "text-[#ff7171]"
                    }`}
                  >
                    <AiFillCaretDown
                      className={`tr-300 ${
                        coinUse?.price_change_percentage_24h > 0
                          ? "rotate-180"
                          : "rotate-0"
                      }`}
                    />
                    <p>
                      {(
                        coinUse?.price_change_percentage_24h -
                        coins[0]?.price_change_percentage_24h
                      ).toFixed(4)}
                      %
                    </p>
                  </div>
                </div>
              )}
              {/* -----------btc------------ */}
              {/* -----------eth------------ */}
              {coinUse?.id !== coins[1]?.id && (
                <div className="flex space-x-2 items-center">
                  <p className=" text-xs text-white/50">
                    {(coinUse?.current_price / coins[1]?.current_price).toFixed(
                      8
                    )}{" "}
                    ETH
                  </p>
                  <div
                    className={` tr-300  px-2 py-1 text-xs rounded-lg flex space-x-1 items-center ${
                      coinUse?.price_change_percentage_24h -
                        coins[0]?.price_change_percentage_24h >
                      0
                        ? "text-[#67dfbd]"
                        : "text-[#ff7171]"
                    }`}
                  >
                    <AiFillCaretDown
                      className={`tr-300 ${
                        coinUse?.price_change_percentage_24h -
                          coins[0]?.price_change_percentage_24h >
                        0
                          ? "rotate-180"
                          : "rotate-0"
                      }`}
                    />
                    <p>
                      {(
                        coinUse?.price_change_percentage_24h -
                        coins[1]?.price_change_percentage_24h
                      ).toFixed(4)}
                      %
                    </p>
                  </div>
                </div>
              )}
              {/* -----------eth------------ */}
            </div>
            <div className=" w-full pt-4 ">
              <p className=" w-full text-center text-xs text-white/50 pb-1">
                24h <span className="text-[#ff7171]/50">low</span> and{" "}
                <span className="text-[#67dfbd]/50">high</span>{" "}
              </p>
              <div className=" flex justify-between w-full items-center text-xs ">
                <p className=" w-24 truncate text-[#ff7171] text-center">
                  {coinUse?.low_24h}
                </p>
                <div className=" bg-white/10 w-full mx-2 rounded-full h-4 flex items-center px-1">
                  <div
                    className="grad h-2 rounded-full "
                    style={{
                      width: `${mathLine.toFixed(0)}%`,
                    }}
                  />
                </div>
                <p className=" w-24 truncate text-[#67dfbd] text-center">
                  {coinUse?.high_24h}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* ----------------sparkline------------------- */}
        <div className="  border-2 rounded-md border-white/10 w-full flex mt-4 h-[140px] items-center">
          <div className=" h-full border-r-2 border-r-white/10 px-1 truncate text-xs flex justify-center py-2 w-[60px]">
            prices
          </div>
          <div className=" w-full scale-y-[150%]  mx-[-2px]">
            <Sparklines data={coinUse?.sparkline_in_7d?.price}>
              <SparklinesLine color={sparklineColor} />
            </Sparklines>
          </div>
        </div>
      </div>
    );
  }
  return <div>Error Api</div>;
}
