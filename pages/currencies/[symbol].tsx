import axios from "axios";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import moment from "moment";
import { GetStaticPropsContext } from "next";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AiFillStar, AiOutlineStar, AiFillCaretDown } from "react-icons/ai";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { useRecoilState } from "recoil";
import { auth, db } from "../../firebase/clientApp";
import {
  coinDataState,
  currentUserId,
  globalStar,
  loginStateMain,
  refreshState,
} from "../../recoilState/recoilState";

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
  const [star, setStar] = useRecoilState(globalStar);
  const [idOfcurrentUser, setIdOfCurrentUser] = useRecoilState(currentUserId);
  const [refresh, setRefresh] = useRecoilState(refreshState);
  const [users, setUsers] = useState<any>([]);
  const [show, setShow] = useRecoilState(loginStateMain);



  useEffect(() => {
    console.log(idOfcurrentUser?.stars);
  }, [refresh]);

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
  const allTimeHigh: number | boolean =
    typeof sort !== "boolean" && sort[sort.length - 1];

  const handleDeleteStar = () => {
    const deleteStar = [...star].filter((star: string) => star !== coinUse?.id);
    setStar([...deleteStar]);
  };
  const handleAddStar = () => {
    setStar([...star, coinUse?.id]);
  };

  const bodyRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    bodyRef.current.scrollTo(0, 0);
  }, []);

  const addToDatabaseStar = async () => {
    if (idOfcurrentUser) {
      const userDoc = await doc(db, "users", idOfcurrentUser?.id);
      const newData = { stars: [...star, coinUse?.id] };
      await updateDoc(userDoc, newData);
    }
    setRefresh((prev) => !prev);
  };
  const deleteDatabaseStar = async () => {
    if (idOfcurrentUser) {
      const userDoc = await doc(db, "users", idOfcurrentUser?.id);
      const newData = { stars: star.filter((i: string) => i !== coinUse?.id) };
      await updateDoc(userDoc, newData);
    }
    setRefresh((prev) => !prev);
  };

  useEffect(() => {
    if (auth.currentUser) {
      const currentEmail = auth.currentUser.email;
      const currentObj = users.filter(
        (user: any) => user.email?.toLowerCase() === currentEmail?.toLowerCase()
      );

      setIdOfCurrentUser(currentObj[0]);
      setStar(currentObj[0]?.stars);
    } else {
      setIdOfCurrentUser(null);
    }
  }, [users, auth.currentUser, refresh]);
  
  const userCollectionRef = collection(db, "users");

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(userCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, [refresh]);

  if (coin) {
    return (
      <div ref={bodyRef} className=" w-full h-full pb-4 ">
        <Link href={"/"}>
          <div className=" flex w-[80px] md:w-[80px] items-center cursor-pointer space-x-2 bg-violet-700/0 hover:bg-violet-700/40 tr-300 rounded-md pl-1  py-1">
            <IoIosArrowRoundBack className="text-xl" />
            <p>Back</p>
          </div>
        </Link>
        <div className=" flex flex-col md:flex-row md:justify-between  md:items-center md:h-[220px] mt-2">
          <div className=" w-full flex justify-between p-4 border-2 rounded-md border-white/10 mt-2 md:w-[39%] md:h-full md:mt-0">
            <div className=" w-full h-full md:flex md:flex-col items-center">
              <div className=" flex items-center  w-full justify-between ">
                <div className=" flex items-center  space-x-2 mr-2">
                  <img
                    src={coinUse?.image}
                    className={`w-12 h-12 object-contain md:w-32 md:h-32`}
                  />
                  <p className=" text-2xl">{coinUse?.name}</p>
                  <div className=" grad-150 text-white px-2 py-1 rounded-md">
                    {coinUse?.symbol.toUpperCase()}
                  </div>
                </div>
              </div>
              <div className=" w-full justify-between flex items-center  mt-4">
                <div className="  text-xs md:text-xl grad-150 text-white px-2 py-1 rounded-md text-center w-[80px] md:w-[130px] ">
                  <p>Rank #{coinUse?.market_cap_rank}</p>
                </div>
                {star?.includes(coinUse?.id) ? (
                  <AiFillStar
                    className="text-3xl md:text-[40px] hover:scale-110 tr-300 text-violet-500  cursor-pointer "
                    onClick={() => {
                      if (idOfcurrentUser) {
                        deleteDatabaseStar();
                      } else {
                        setShow(true);
                      }
                    }}
                  />
                ) : (
                  <AiOutlineStar
                    className="text-3xl md:text-[40px] hover:scale-110 tr-300 opacity-50 cursor-pointer"
                    onClick={() => {
                      if (idOfcurrentUser) {
                        addToDatabaseStar();
                      } else {
                        setShow(true);
                      }
                    }}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="p-4 border-2 rounded-md border-white/10 w-full flex mt-4 md:w-[60%] md:h-full md:mt-0">
            <div className=" flex flex-col space-y-2 w-full" id="price">
              <p className=" text-xs text-white/40">
                {coinUse?.name} Price ({coinUse?.symbol.toUpperCase()})
              </p>
              <div className="flex items-center  space-x-2 ">
                <p className="text-3xl truncate w-[70%] md:w-[180px]">
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
                      {(
                        coinUse?.current_price / coins[0]?.current_price
                      ).toFixed(8)}{" "}
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
                      {(
                        coinUse?.current_price / coins[1]?.current_price
                      ).toFixed(8)}{" "}
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
        </div>
        {/* ----------------MarketCap------------------- */}
        <div className="border-2 rounded-md border-white/10 w-full flex flex-col mt-4 p-2 h-[200px] divide-y-[2px] divide-white/10 ">
          <div className=" w-full h-1/2 divide-x-[2px] divide-white/10 flex">
            <div className="h-full w-1/2 flex justify-center flex-col items-center ">
              <p className=" text-sm text-white/50">Market Cap</p>
              {coinUse?.market_cap ? (
                <p className=" pt-2 text-sm md:text-xl">
                  ${coinUse.market_cap.toLocaleString("en-US")}
                </p>
              ) : (
                <p className=" text-md text-white/50">No data</p>
              )}
            </div>
            <div className="h-full w-1/2 flex justify-center flex-col items-center ">
              <p className=" text-sm text-white/50">Volume 24h</p>
              {coinUse?.total_volume ? (
                <p className="  pt-2 text-sm md:text-xl">
                  ${coinUse.total_volume.toLocaleString("en-US")}
                </p>
              ) : (
                <p className=" text-md text-white/50">No data</p>
              )}
            </div>
          </div>
          <div className=" w-full h-1/2 divide-x-[2px] divide-white/10 flex">
            <div className="h-full w-1/2 flex justify-center flex-col items-center  pt-2">
              <p className=" text-sm text-white/50">Total Supply</p>
              {coinUse?.total_supply ? (
                <p className="  pt-2 text-sm md:text-xl">
                  {coinUse.total_supply.toLocaleString("en-US")}
                </p>
              ) : (
                <p className=" text-md text-white/50">No data</p>
              )}
            </div>
            <div className="h-full w-1/2 flex justify-center flex-col items-center pt-2">
              <p className=" text-sm text-white/50">Circulating Supply</p>
              {coinUse?.circulating_supply ? (
                <p className=" pt-2 text-sm md:text-xl">
                  {coinUse.circulating_supply.toLocaleString("en-US")}
                </p>
              ) : (
                <p className=" text-md text-white/50">No data</p>
              )}
            </div>
          </div>
        </div>
        {/* ----------------MarketCap------------------- */}
        {/* ----------------sparkline------------------- */}
        <div className="  border-2 rounded-md border-white/10 w-full flex mt-4 h-[130px] md:h-[400px] items-center overflow-scroll scrollbar-hide ">
          <div className=" h-full border-r-2 border-r-white/10 px-1 truncate text-xs flex flex-col  items-center justify-between py-2 w-[80px] ">
            <p className="text-[#67dfbd]/50 truncate w-[60px] text-center">
              ${typeof allTimeHigh !== "boolean" && allTimeHigh.toFixed(2)}
            </p>
            <p className="text-white/50 truncate w-[60px] text-center">
              $
              {typeof allTimeLow !== "boolean" &&
                typeof allTimeHigh !== "boolean" &&
                ((allTimeHigh + allTimeLow) / 2).toFixed(2)}
            </p>
            <p className="text-[#ff7171]/50 truncate w-[60px] text-center">
              ${typeof allTimeLow !== "boolean" && allTimeLow.toFixed(2)}
            </p>
          </div>
          <div className="w-full ">
            <div className=" w-full scale-y-[150%] md:scale-y-100  mx-[-2px] ">
              <Sparklines data={coinUse?.sparkline_in_7d?.price}>
                <SparklinesLine color={sparklineColor} />
              </Sparklines>
            </div>
            <div className=" flex justify-between mt-4 -mx-2 md:mt-[-8px]">
              <p className=" text-[6px] md:text-sm rotate-[-90deg] bg-primary ">
                {moment().subtract(7, "days").calendar()}
              </p>
              <p className=" text-[6px] rotate-[-90deg] bg-primary md:text-sm">
                {moment().subtract(6, "days").format("L")}
              </p>
              <p className=" text-[6px] rotate-[-90deg] bg-primary md:text-sm">
                {moment().subtract(5, "days").format("L")}
              </p>
              <p className=" text-[6px] rotate-[-90deg] bg-primary md:text-sm">
                {moment().subtract(4, "days").format("L")}
              </p>
              <p className=" text-[6px] rotate-[-90deg] bg-primary md:text-sm">
                {moment().subtract(3, "days").format("L")}
              </p>
              <p className=" text-[6px] rotate-[-90deg] bg-primary md:text-sm">
                {moment().subtract(2, "days").format("L")}
              </p>
              <p className=" text-[6px] rotate-[-90deg] bg-primary md:text-sm">
                {moment().subtract(1, "days").format("L")}
              </p>

              <p className=" text-[6px] rotate-[-90deg] bg-primary md:text-sm">
                {moment().format("L")}
              </p>
            </div>
          </div>
        </div>
        {/* ----------------sparkline------------------- */}
        <div className="py-2" />
      </div>
    );
  }
  return <div>Error Api</div>;
}
