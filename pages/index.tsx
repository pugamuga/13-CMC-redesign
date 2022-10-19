import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import CoinString from "../components/CoinString";
import {
  coinDataState,
  currentUserId,
  globalStar,
  refreshState,
  userState,
} from "../recoilState/recoilState";
import moment from "moment";
import MobileSlider from "../components/MobileSlider";
import DesktopSlider from "../components/DesktopSlider";
import PagesAmountAtTime from "../components/PagesAmountAtTime";
import { FiChevronsDown } from "react-icons/fi";
import { AnimatePresence } from "framer-motion";
import { auth, db } from "../firebase/clientApp";
import { uid } from "uid";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";

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
  const [star, setStar] = useRecoilState(globalStar);
  const [idOfcurrentUser, setIdOfCurrentUser] = useRecoilState(currentUserId);
  const [refresh, setRefresh] = useRecoilState(refreshState);

  const [users, setUsers] = useState<any>([]);
  const userCollectionRef = collection(db, "users");

  // console.log(idOfcurrentUser);
useEffect(() => {
  setStar(idOfcurrentUser?.stars)
  // console.log(idOfcurrentUser?.stars)
},[refresh]);
 

  useEffect(() => {
    if (auth.currentUser) {
    const currentEmail = auth.currentUser.email;
      const currentObj = users.filter(
        (user: any) => user.email?.toLowerCase() === currentEmail?.toLowerCase()
      );
      
      setIdOfCurrentUser(currentObj[0]);
      setStar(currentObj[0]?.stars)
      
    } else {
      setIdOfCurrentUser(null);
    }
  }, [users, auth.currentUser,refresh]);

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(userCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, [refresh]);

  // useEffect(() => {
  //   const updateStarsForUser = async (id: string, stars: string[]) => {
  //     const userDoc = doc(db, "users", id);
  //     const newData = { stars: star };
  //     await updateDoc(userDoc, newData);
  //   };

  //   updateStarsForUser("ow9AgQI0DEU3HzgJA2qm", star);
  // }, [star]);

  const lastTimeUpdatePrice: string =
    coins[0] && Array.from(coins[1]?.last_updated).slice(11, 19).join("");

  useEffect(() => {
    setTimeout(() => {
      const now = moment().subtract(3, "hour").format("hh:mm:ss");
      setCurrentTime(now);
    }, 1000);
  }, [currentTime]);

  useEffect(() => {
    if (data) {
      setCoins(data);
    }
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
      <div className=" flex w-full justify-center items-center md:justify-between  mt-12 pb-2 ">
        {
          <>
            <div className=" hidden md:inline ">
              <PagesAmountAtTime
                amountPagesShown={amountPagesShown}
                setAmountPagesShown={setAmountPagesShown}
              />
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
        <AnimatePresence>
          {coins.length > 0 &&
            coins
              .slice(
                currentPage * amountPagesShown - amountPagesShown,
                currentPage * amountPagesShown
              )
              .map((coin: MainCoinData, id: number) => {
                return <CoinString key={id} coin={coin} />;
              })}
        </AnimatePresence>
      </div>
      <div className=" flex items-center">
        <div
          onClick={() => {
            setCurrentPage(1);
          }}
        >
          <FiChevronsDown
            className="h-5 w-5 text-gray-400 rotate-90 mx-2 cursor-pointer hover:scale-110 tr-300"
            aria-hidden="true"
          />
        </div>
        <div className=" py-4 flex space-x-2">
          {Array.from({ length: 100 / amountPagesShown }, (_, i) => i + 1)
            .filter(
              (i) =>
                (i < currentPage + 3 && i > currentPage - 2) ||
                i === 10 ||
                i === 1
            )
            .map((btn: number) => {
              return (
                <>
                  {btn === 10 &&
                    currentPage !== 10 &&
                    currentPage !== 9 &&
                    currentPage !== 8 &&
                    currentPage !== 7 && (
                      <div className=" text-xl md:text-3xl md:mt-2">...</div>
                    )}
                  <div
                    onClick={() => {
                      setCurrentPage(btn);
                    }}
                    key={btn}
                    className={`w-6 h-6 md:h-10 md:w-10 ${
                      btn === currentPage ? "grad" : "grad-150"
                    } hover:grad tr-300 superflex rounded-md shadow-md cursor-pointer text-sm`}
                  >
                    {btn}
                  </div>
                  {btn === 1 &&
                    currentPage !== 1 &&
                    currentPage !== 2 &&
                    currentPage !== 3 && (
                      <div className=" text-xl md:text-3xl md:mt-2">...</div>
                    )}
                </>
              );
            })}
        </div>
        <div
          onClick={() => {
            setCurrentPage(100 / amountPagesShown);
          }}
        >
          <FiChevronsDown
            className="h-5 w-5 text-gray-400 rotate-[270deg] mx-2 cursor-pointer hover:scale-110 tr-300"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const responce = await fetch(coinGeckoUrl);
  const data = await responce.json();
  return {
    props: {
      data: data,
    },
  };
};
