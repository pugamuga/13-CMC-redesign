import SlideTop from "./SlideTop";
import { BsChevronRight } from "react-icons/bs";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MobileSlider(): JSX.Element {
  const [MSstate, setMSstate] = useState<number>(1);
  const [animationLeftRight, setAnimationLeftRight] = useState<
    "left" | "right"
  >("right");

  console.log(MSstate);
  return (
    <div className="w-full h-full relative ">
      <div
        onClick={() => {
          if (MSstate > 1) {
            setMSstate(MSstate - 1);
            setAnimationLeftRight("left");
          }
        }}
        className={`${
          MSstate === 2 || MSstate === 3 ? "opacity-100" : "opacity-0"
        } grad w-6 h-6 rounded-full absolute top-0 bottom-0 my-auto shadow-lg left-[-12px] superflex tr-300
       hover:scale-110 cursor-pointer`}
      >
        <BsChevronRight className=" text-white stroke-2 text-xs rotate-180 mr-1" />
      </div>
      <div className=" w-full h-full overflow-x-hidden scrollbar-hide ">
        <AnimatePresence>
          {MSstate === 1 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: 150 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95, x: -150 }}
              transition={{ ease: "easeOut" }}
              className=" absolute h-full w-full top-0 left-0"
            >
              <SlideTop name={"Top Gainers"} type={"like"} />
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {MSstate === 2 && (
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.95,
                x: animationLeftRight === "left" ? 150 : -150,
              }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{
                opacity: 0,
                scale: 0.95,
                x: animationLeftRight === "right" ? 150 : -150,
              }}
              transition={{ ease: "easeOut" }}
              className=" absolute h-full w-full top-0 left-0"
            >
              <SlideTop name={"Top Losers"} type={"dislike"} />
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {MSstate === 3 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: -150 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95, x: 150 }}
              transition={{ ease: "easeOut" }}
              className=" absolute h-full w-full top-0 left-0"
            >
              <SlideTop name={"Favorites"} type={"favorite"} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div
        onClick={() => {
          if (MSstate < 3) {
            setMSstate(MSstate + 1);
            setAnimationLeftRight("right");
          }
        }}
        className={`${
          MSstate === 1 || MSstate === 2 ? "opacity-100" : "opacity-0"
        } grad w-6 h-6 rounded-full absolute top-0 bottom-0 my-auto shadow-lg  superflex right-[-12px] tr-300 
      hover:scale-110 cursor-pointer`}
      >
        <BsChevronRight className=" text-white stroke-2 text-xs " />
      </div>
      <div className="flex w-full items-center justify-center space-x-2 mt-2">
        <div
          className={` w-2 h-2 rounded-full border-2 border-white/10 ${
            MSstate === 1 ? "bg-violet-500" : "bg-transparent"
          }`}
        />
        <div
          className={` w-2 h-2 rounded-full border-2 border-white/10 ${
            MSstate === 2 ? "bg-violet-500" : "bg-transparent"
          }`}
        />
        <div
          className={` w-2 h-2 rounded-full border-2 border-white/10 ${
            MSstate === 3 ? "bg-violet-500" : "bg-transparent"
          }`}
        />
      </div>
    </div>
  );
}
