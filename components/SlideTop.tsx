import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useRecoilState } from "recoil";
import { auth, db } from "../firebase/clientApp";
import {
  coinDataState,
  currentUserId,
  favoriteCoin,
  globalStar,
  refreshState,
} from "../recoilState/recoilState";
import CoinStringSlider from "./CoinStringSlider";
import LoginHeader from "./LoginHeader";
import { AnimatePresence, motion } from "framer-motion";
import { doc, updateDoc } from "firebase/firestore";

interface Iprops {
  name: string;
  type: "like" | "dislike" | "favorite";
}

export default function SlideTop({ name, type }: Iprops): JSX.Element {
  const [coins, setCoins] = useRecoilState(coinDataState);
  const [likeCoin, setLikeCoin] = useRecoilState(favoriteCoin);
  const [idOfcurrentUser, setIdOfCurrentUser] = useRecoilState(currentUserId);
  const [refresh, setRefresh] = useRecoilState(refreshState);
  const [star, setStar] = useRecoilState(globalStar);

  const coinsForFilter = [...coins];
  const coinsForFilterNew = [...coins];

  const coinGainers: MainCoinData[] = coinsForFilter.sort(
    (a: MainCoinData, b: MainCoinData) => {
      return b.price_change_percentage_24h - a.price_change_percentage_24h;
    }
  );

  const coinLosers: MainCoinData[] = coinsForFilterNew.sort(
    (a: MainCoinData, b: MainCoinData) => {
      return a.price_change_percentage_24h - b.price_change_percentage_24h;
    }
  );

  const deleteAllDatabaseStar = async () => {
    if (idOfcurrentUser) {
      const userDoc = await doc(db, "users", idOfcurrentUser.id);
      const newData = { stars: [] };
      await updateDoc(userDoc, newData);
    }
    setRefresh((prev) => !prev);
  };

  return (
    <div className=" h-full w-full grad-150 rounded-lg p-2">
      <div className=" flex items-center justify-between w-full border-b pb-2 border-white/10">
        <div className=" flex items-center">
          <div className="md:text-3xl px-2 text-xl">
            {type === "like" && <Like />}
            {type === "dislike" && <DisLike />}
            {type === "favorite" && <Favorite />}
          </div>
          <p className="font-bold text-sm md:text-lg">{name}</p>
        </div>
        <AnimatePresence>
          {type === "favorite" && idOfcurrentUser?.stars.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className=" bg-[#ff7171] bg-opacity-20 px-2 mr-2 rounded-md tr-300 hover:bg-opacity-100 cursor-pointer"
              onClick={deleteAllDatabaseStar}
            >
              Delete all
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* ------------Gainers--------------- */}
      {type === "like" && (
        <>
          <div className=" w-full h-full flex flex-col justify-between px-2 pt-2 md:hidden pb-8">
            <AnimatePresence>
              {coinGainers.slice(0, 3).map((coin: MainCoinData) => {
                return (
                  <CoinStringSlider
                    key={coin.id}
                    likeCoin={likeCoin}
                    coin={coin}
                  />
                );
              })}
            </AnimatePresence>
          </div>
          <div className="hidden md:flex w-full h-full flex-col justify-between  pt-2 md:pb-10 pb-8">
            <AnimatePresence>
              {coinGainers.slice(0, 5).map((coin: MainCoinData) => {
                return (
                  <CoinStringSlider
                    key={coin.id}
                    likeCoin={likeCoin}
                    coin={coin}
                  />
                );
              })}
            </AnimatePresence>
          </div>
        </>
      )}
      {/* ------------Gainers--------------- */}
      {/* ------------Losers--------------- */}
      {type === "dislike" && (
        <>
          <div className=" w-full h-full flex flex-col justify-between px-2 pt-2 md:hidden pb-8">
            {coinLosers.slice(0, 3).map((coin: MainCoinData) => {
              return (
                <CoinStringSlider
                  key={coin.id}
                  likeCoin={likeCoin}
                  coin={coin}
                />
              );
            })}
          </div>
          <div className="hidden md:flex w-full h-full flex-col justify-between  pt-2 md:pb-10 pb-8">
            {coinLosers.slice(0, 5).map((coin: MainCoinData) => {
              return (
                <CoinStringSlider
                  key={coin.id}
                  likeCoin={likeCoin}
                  coin={coin}
                />
              );
            })}
          </div>
        </>
      )}
      {/* ------------Losers--------------- */}
      {/* ------------Favorites--------------- */}
      {type === "favorite" && (
        <>
          <FavResult
            user={!!auth.currentUser}
            coins={coins}
            likeCoin={likeCoin}
          />
        </>
      )}
      {/* ------------Favorites--------------- */}
    </div>
  );
}

function Like(): JSX.Element {
  return (
    <>
      <AiFillLike className=" text-[#67dfbd]" />
    </>
  );
}
function DisLike(): JSX.Element {
  return (
    <>
      <AiFillDislike className=" text-[#ff7171]" />
    </>
  );
}
function Favorite(): JSX.Element {
  return (
    <>
      <AiFillStar className="text-violet-500" />
    </>
  );
}

interface FavProps {
  user: boolean;
  coins: MainCoinData[];
  likeCoin: boolean;
}
function FavResult({ user, coins, likeCoin }: FavProps): JSX.Element {
  const [star, setStar] = useRecoilState(globalStar);

  const copyOfCoins = [...coins];

  const filteredStarArray = copyOfCoins.filter((coin: MainCoinData) =>
    star?.includes(coin.id)
  );

  // console.log(filteredStarArray)

  if (user) {
    return (
      <>
        <div className=" w-full h-full flex flex-col justify-start space-y-[8px] px-2 pt-2 md:hidden pb-8">
          {filteredStarArray.length !== 0 ? (
            <AnimatePresence>
              {filteredStarArray.slice(0, 3).map((coin: MainCoinData) => {
                return (
                  <CoinStringSlider
                    key={coin.id}
                    likeCoin={likeCoin}
                    coin={coin}
                  />
                );
              })}
            </AnimatePresence>
          ) : (
            <div className=" w-full h-full superflex relative">
              <div className=" absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex">
                <AiFillStar className=" text-violet-600/20 text-[80px] z-0" />
                <AiFillStar className=" text-violet-600/20 text-[80px] z-0" />
                <AiFillStar className=" text-violet-600/20 text-[80px] z-0" />
              </div>
              <div className="z-10 text-white/70 text-xl">Add some coins </div>
            </div>
          )}
        </div>
        <div className="hidden md:flex w-full h-full flex-col justify-start space-y-[6.5px]  pt-2 md:pb-10 pb-8 ">
          {filteredStarArray.length !== 0 ? (
            <AnimatePresence>
              {filteredStarArray.slice(0, 5).map((coin: MainCoinData) => {
                return (
                  <CoinStringSlider
                    key={coin.id}
                    likeCoin={likeCoin}
                    coin={coin}
                  />
                );
              })}{" "}
            </AnimatePresence>
          ) : (
            <div className=" w-full h-full superflex relative">
              <div className=" absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex">
                <AiFillStar className=" text-violet-600/20 text-[80px] z-0" />
                <AiFillStar className=" text-violet-600/20 text-[80px] z-0" />
                <AiFillStar className=" text-violet-600/20 text-[80px] z-0" />
              </div>
              <div className="z-10 text-white/70 text-xl">Add coins </div>
            </div>
          )}
        </div>
      </>
    );
  } else {
    return (
      <div className=" px-2 pt-2 flex flex-col md:space-y-4 md:scale-100  space-y-2 md:h-full h-[160px] pb-4 overflow-y-scroll scrollbar-hide">
        <LoginHeader />
      </div>
    );
  }
}
