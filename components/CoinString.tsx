import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { useRecoilState } from "recoil";
import {
  currentUserId,
  favoriteCoin,
  globalStar,
} from "../recoilState/recoilState";
import { motion, AnimatePresence } from "framer-motion";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/clientApp";

interface IProps {
  coin: MainCoinData;
}

export default function CoinString({ coin }: IProps): JSX.Element {
  const [star, setStar] = useRecoilState(globalStar);
  const [idOfcurrentUser, setIdOfCurrentUser] = useRecoilState(currentUserId);

  const sparklineColor =
    coin.sparkline_in_7d.price[0] <
    coin.sparkline_in_7d.price[coin.sparkline_in_7d.price.length - 1]
      ? "#67dfbd"
      : "#ff7171";

  const handleDeleteStar = () => {
    const deleteStar = [...star].filter((star: string) => star !== coin.id);
    setStar([...deleteStar]);
  };
  const handleAddStar = () => {
    setStar([...star, coin.id]);
  };

  const addToDatabaseStar = async () => {
    if (idOfcurrentUser !== null) {
      const userDoc = doc(db, "users", idOfcurrentUser);
      const newData = { stars: [coin.id] };
      await updateDoc(userDoc, newData);
    }
  };
  const deleteDatabaseStar = async () => {
    if (idOfcurrentUser !== null) {
      const userDoc = doc(db, "users", idOfcurrentUser);
      const newData = { stars: [] };
      await updateDoc(userDoc, newData);
    }
  };

  return (
    <motion.div
      layout
      className=" w-full grad-50 py-2 px-2 md:px-4 rounded-md hover:scale-x-[101%] cursor-pointer relative pl-6 md:pl-16
      border-[2px] hover:border-white/20 border-white/0 tr-300"
    >
      <div className=" absolute top-1/2 left-1 transform  -translate-y-1/2 z-10 cursor-pointer ">
        {star.includes(coin.id) ? (
          <AiFillStar
            className="text-xl md:text-[30px] hover:scale-110 tr-300 text-violet-500 md:w-16  cursor-pointer "
            onClick={handleDeleteStar}
          />
        ) : (
          <AiOutlineStar
            className=" md:w-16 text-xl md:text-[30px] hover:scale-110 tr-300 opacity-50 cursor-pointer"
            onClick={handleAddStar}
          />
        )}
      </div>
      {/* ----------------------- */}
      <Link href={`/currencies/${coin.symbol}`}>
        <div className="w-full flex items-center ">
          <div
            className=" flex items-center space-x-1 md:space-x-3 md:w-[20%] w-[40%] "
            id="name"
          >
            <p className="md:text-sm text-xs text-center w-12 cursor-pointer">
              {coin.market_cap_rank}
            </p>
            <div className="mx-2 superflex  relative  cursor-pointer">
              <img
                src={coin.image}
                className="md:h-10 md:w-10 h-6 w-6 object-contain rounded-full md:mx-8"
              />
            </div>
            <p className="md:text-sm text-xs truncate w-full cursor-pointer">
              {coin.name}
            </p>
          </div>
          {/* ----------------------- */}

          <div
            className="md:w-[40%]  w-[30%] flex items-center justify-center md:justify-between md:px-12 cursor-pointer"
            id="price"
          >
            <p className=" md:inline hidden">{coin.symbol.toUpperCase()}</p>
            <div className="  superflex md:text-base text-sm">
              <span className="text-xs text-white/50  ">$</span>
              {coin.current_price}
            </div>
            <div
              className={`${
                coin.price_change_percentage_24h > 0
                  ? "text-[#67dfbd]"
                  : "text-[#ff7171]"
              } md:inline hidden`}
            >
              {coin.price_change_percentage_24h.toFixed(2)}%
            </div>
          </div>

          {/* ----------------------- */}
          <div
            className=" flex h-full w-[30%] md:w-[40%] items-center justify-end md:justify-between px-2 md:scale-100 scale-x-[100%] scale-y-125 "
            id="sparkline"
          >
            <div className="md:truncate lg:w-[35%] md:w-[65%] md:inline hidden lg:-ml-0 md:-ml-16">
              <span className="text-xs text-white/50 md:ml-12">$</span>
              {coin.market_cap.toLocaleString("en-US")}
            </div>
            <div className={`md:w-[50%] w-full h-full md:ml-4`}>
              <Sparklines data={coin.sparkline_in_7d.price}>
                <SparklinesLine color={sparklineColor} />
              </Sparklines>
            </div>
          </div>
          {/* ----------------------- */}
        </div>
      </Link>
    </motion.div>
  );
}
