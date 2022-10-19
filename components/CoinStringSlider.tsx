import Link from "next/link";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

interface IProps {
  likeCoin?: boolean;
  coin: MainCoinData;
}

export default function CoinStringSlider({
  likeCoin,
  coin,
}: IProps): JSX.Element {
  return (
    <div className="w-full items-center flex relative justify-between py-2 grad-150 px-2 cursor-pointer rounded-lg hover:scale-x-[102%] tr-300 border-[1px] border-white/0 hover:border-white/30">
      <div className=" absolute top-1/2 bottom-0 -translate-y-1/2">
        {likeCoin ? (
          <AiFillStar className="text-md mt-[1px] md:mt-0   md:text-[20px] hover:scale-110 tr-300 text-violet-500  " />
        ) : (
          <AiOutlineStar className="  text-md  mt-[1px] md:mt-0  md:text-[20px] hover:scale-110 tr-300 opacity-50" />
        )}
      </div>
      <Link href={`/currencies/${coin.symbol}`}>
        <>
          <div className=" flex items-center  space-x-2  w-[300px] md:w-[30%] ml-6 md:ml-7">
            <p className=" text-sm text-white/50 truncate w-6">
              {coin.market_cap_rank}
            </p>
            <p>{coin.symbol.toUpperCase()}</p>
          </div>
          <div className=" flex justify-center w-full">
            <p className=" flex items-center  ">
              <p className="w-[80px] text-center truncate">
                <span className="text-xs text-white/50 ">$</span>

                {coin.current_price}
              </p>
            </p>
          </div>
          <div className="">
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
        </>
      </Link>
    </div>
  );
}
