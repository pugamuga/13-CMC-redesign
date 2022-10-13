import Image from "next/image";
import { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { Sparklines, SparklinesLine } from "react-sparklines";

interface IProps {
  coin: MainCoinData;
}

export default function CoinString({ coin }: IProps): JSX.Element {
  const [likeCoin, setLikeCoin] = useState(false);

  const sparklineColor =
    coin.sparkline_in_7d.price[0] <
    coin.sparkline_in_7d.price[coin.sparkline_in_7d.price.length - 1]
      ? "#67dfbd"
      : "#ff7171";

  return (
    <div className=" w-full grad-50 py-2 px-2 md:px-4 rounded-md flex items-center">
      {/* ----------------------- */}
      <div
        className=" flex items-center space-x-3 md:w-[20%] w-[40%] "
        id="name"
      >
        {likeCoin ? <AiFillStar /> : <AiOutlineStar />}
        <p className="md:text-sm text-xs text-center">{coin.market_cap_rank}</p>
        <div className="mx-2 superflex  relative ">
          <img
            src={coin.image}
            className="md:h-6 md:w-6 h-4 w-4 object-contain rounded-full "
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
        className=" flex h-full w-[30%] md:w-[40%] items-center justify-end md:justify-between px-2 md:scale-100 scale-110  "
        id="sparkline"
      >
        <div className="md:truncate md:w-[35%] md:inline hidden">
          <span className="text-xs text-white/50 md:ml-12">$</span>
          {coin.market_cap}
        </div>
        <div className={`md:w-[50%] w-full h-full md:ml-4`}>
          <Sparklines data={coin.sparkline_in_7d.price}>
            <SparklinesLine color={sparklineColor} />
          </Sparklines>
        </div>
      </div>
      {/* ----------------------- */}
    </div>
  );
}
