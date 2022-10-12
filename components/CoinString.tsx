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
  console.log(sparklineColor);

  return (
    <div className=" w-full grad-50 py-2 px-4 rounded-md flex items-center">
      <div className=" flex items-center space-x-3 w-[20%] ">
        {likeCoin ? <AiFillStar /> : <AiOutlineStar />}
        <p className="text-sm text-center">{coin.market_cap_rank}</p>
        <div className="mx-2 superflex  relative ">
          <img
            src={coin.image}
            className="h-6 w-6 object-contain rounded-full "
          />
        </div>
        <p className="text-sm">{coin.name}</p>
      </div>
      <div className="w-[40%] flex items-center justify-between px-12">
        <p>{coin.symbol.toUpperCase()}</p>
        <div className="  superflex">{coin.current_price}</div>
        <div className={`${coin.price_change_percentage_24h>0?"text-[#67dfbd]":"text-[#ff7171]"}`}>
          {coin.price_change_percentage_24h.toFixed(2)}%
        </div>
      </div>
      <div className=" flex h-full w-[40%] items-center justify-between px-2">
        <div className="md:truncate md:w-[35%] md:inline hidden">${coin.market_cap}</div>
        <div className={`w-[50%] h-full ml-4`}>
          <Sparklines data={coin.sparkline_in_7d.price}>
            <SparklinesLine color={sparklineColor} />
          </Sparklines>
        </div>
      </div>
    </div>
  );
}
