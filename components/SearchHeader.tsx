import { motion, AnimatePresence } from "framer-motion";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import OutsideClickHandler from "react-outside-click-handler";
import { useRecoilState } from "recoil";
import { coinDataState } from "../recoilState/recoilState";
import CoinStringSlider from "./CoinStringSlider";

interface IProps {
  showInputHeader: boolean;
  setShowInputHeader: Dispatch<SetStateAction<boolean>>;
}

export default function SearchHeader({
  showInputHeader,
  setShowInputHeader,
}: IProps): JSX.Element {
  const [inputValue, setInputValue] = useState<string>("");
  const [coins, setCoins] = useRecoilState(coinDataState);

  console.log(!!inputValue);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      id="input-blur"
      className=" absolute h-screen w-screen z-50 backdrop-blur-sm top-0 left-0 bg-gradient-to-br from-primary to-purple-900 flex justify-center"
    >
      <motion.div
        id="blur-div"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.05, ease: "easeOut" }}
        className={` relative md:w-1/3 w-3/4 h-14 mt-[100px] drop-shadow-md `}
      >
        <OutsideClickHandler
          onOutsideClick={() => {
            setShowInputHeader(false);
          }}
        >
          <BiSearchAlt className="text-primary/50 md:text-2xl text-xl tr-300 absolute top-0 right-4 bottom-0 my-auto select-none " />
          <input
            autoFocus
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            type="text"
            className={` h-14 w-full rounded-lg  text-primary px-5 outline-none text-sm placeholder:text-primary/50 `}
            placeholder="Search coin..."
          />
          {inputValue && (
            <div className=" bg-white/10 text-white rounded-lg p-2 space-y-2 min-h-[100px] max-h-[250px] md:max-h-[400px] overflow-y-scroll scrollbar-hide mt-2">
              {coins
                .filter((coin: MainCoinData) => {
                  return (
                    coin.name
                      .toLowerCase()
                      .includes(inputValue.toLowerCase()) ||
                    coin.symbol
                      .toLowerCase()
                      .includes(inputValue.toLowerCase()) ||
                    coin.market_cap_rank.toString() === inputValue
                  );
                })
                .map((coin: MainCoinData) => {
                  return <CoinStringSlider key={coin.id} coin={coin} />;
                })}
              {coins.length === 100 && (
                <div className=" h-[80px] superflex ">
                  <p className=" text-2xl text-white/30">No match...</p>
                </div>
              )}
            </div>
          )}
        </OutsideClickHandler>
      </motion.div>
    </motion.div>
  );
}
