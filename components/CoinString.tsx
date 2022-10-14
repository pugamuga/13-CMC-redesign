import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { useRecoilState } from "recoil";
import { favoriteCoin } from "../recoilState/recoilState";
import { motion, AnimatePresence } from "framer-motion";

interface IProps {
  coin: MainCoinData;
}

export default function CoinString({ coin }: IProps): JSX.Element {
  const [likeCoin, setLikeCoin] = useRecoilState(favoriteCoin);

  const sparklineColor =
    coin.sparkline_in_7d.price[0] <
    coin.sparkline_in_7d.price[coin.sparkline_in_7d.price.length - 1]
      ? "#67dfbd"
      : "#ff7171";

  return (
    <Link href={`/currencies/${coin.symbol}`}>
      <motion.div
        layout
        className=" w-full grad-50 py-2 px-2 md:px-4 rounded-md flex items-center cursor-pointer hover:scale-x-[101%] 
      border-[2px] hover:border-white/20 border-white/0 tr-300"
      >
        {/* ----------------------- */}
        <div
          className=" flex items-center space-x-1 md:space-x-3 md:w-[20%] w-[40%] "
          id="name"
        >
          {likeCoin ? (
            <AiFillStar className="text-2xl md:text-[40px] hover:scale-110 tr-300 text-violet-500 md:w-16 " />
          ) : (
            <AiOutlineStar className=" md:w-16 text-2xl md:text-[40px] hover:scale-110 tr-300 opacity-50" />
          )}
          <p className="md:text-sm text-xs text-center w-12">
            {coin.market_cap_rank}
          </p>
          <div className="mx-2 superflex  relative ">
            <img
              src={coin.image}
              className="md:h-10 md:w-10 h-6 w-6 object-contain rounded-full md:mx-8"
            />
          </div>
          <p className="md:text-sm text-xs truncate w-full">{coin.name}</p>
        </div>
        {/* ----------------------- */}
        <div
          className="md:w-[40%] w-[30%] flex items-center justify-center md:justify-between md:px-12 "
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
      </motion.div>
    </Link>
  );
}
