import Image from "next/image";
import { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

interface IProps {
  coin: MainCoinData;
}

export default function CoinString({ coin }: IProps): JSX.Element {
  const [likeCoin, setLikeCoin] = useState(false);

  return (
    <div className=" w-full grad-50 py-2 px-4 rounded-md flex items-center">
      <div className=" flex items-center space-x-3 w-[30%] ">
        {likeCoin ? <AiFillStar /> : <AiOutlineStar />}
        <p className="w-[10%] text-sm text-center">{coin.market_cap_rank}</p>
        <div className="mx-2 superflex h-6 w-6 relative rounded-full">
          <Image src={coin.image} layout="fill" />
        </div>
        <p className="text-sm">{coin.name}</p>
      </div>
      <div className="w-[15%] superflex">
        <p>{coin.symbol.toUpperCase()}</p>
      </div>
      <div className=" w-[15%] superflex">{coin.current_price}</div>
      <div className=" w-[10%] superflex">
        {coin.price_change_percentage_24h.toFixed(2)}%
      </div>
      <div className="truncate w-[15%]">${coin.market_cap}</div>
    </div>
  );
}
