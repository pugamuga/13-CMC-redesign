import { AiFillStar, AiOutlineStar } from "react-icons/ai"

interface IProps{
    likeCoin: boolean
    coin: MainCoinData
}

export default function CoinStringSlider({likeCoin, coin}:IProps):JSX.Element {
  return (
    <div className="w-full flex justify-between py-2 grad-150 px-2  rounded-lg">
    <div className=" flex items-center justify-start space-x-2">
      {likeCoin ? (
        <AiFillStar className="text-md md:text-[20px] hover:scale-110 tr-300 text-violet-500  " />
      ) : (
        <AiOutlineStar className="  text-md md:text-[20px] hover:scale-110 tr-300 opacity-50" />
      )}

      <p className=" text-sm text-white/50 truncate w-6">{coin.market_cap_rank}</p>
      <p>{coin.symbol.toUpperCase()}</p>
    </div>
    <div className="flex items-center">
      <p className=" flex items-center"><span className="text-xs text-white/50 ">$</span>{coin.current_price}</p>
    </div>
    <div>
      <p
        className={`${
          coin.price_change_percentage_24h > 0
            ? "text-[#67dfbd]"
            : "text-[#ff7171]"
        } `}
      >
        {coin.price_change_percentage_24h.toFixed(2)}%
      </p>
    </div>
  </div>
  )
}