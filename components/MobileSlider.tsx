import SlideTop from "./SlideTop";
import { BsChevronRight } from "react-icons/bs";

export default function MobileSlider(): JSX.Element {
  return (
    <div className="w-full h-full relative ">
      <div
        className={`${
          !true ? "opacity-100" : "opacity-0"
        } grad w-6 h-6 rounded-full absolute top-0 bottom-0 my-auto shadow-lg left-[-12px] superflex tr-300
       hover:scale-110 cursor-pointer`}
      >
        <BsChevronRight className=" text-white stroke-2 text-xs rotate-180 mr-1" />
      </div>
      <div className=" min-w-[315%] space-x-5 h-full overflow-x-scroll scrollbar-hide flex ">
        <SlideTop name={"Top Gainers"} type={"like"} />
        <SlideTop name={"Top Losers"} type={"dislike"} />
        <SlideTop name={"Favorites"} type={"favorite"} />
      </div>
      <div
        className={`${
          true ? "opacity-100" : "opacity-0"
        } grad w-6 h-6 rounded-full absolute top-0 bottom-0 my-auto shadow-lg  superflex right-[-12px] tr-300 
      hover:scale-110 cursor-pointer`}
      >
        <BsChevronRight className=" text-white stroke-2 text-xs " />
      </div>
    </div>
  );
}
