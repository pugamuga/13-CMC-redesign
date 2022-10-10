import Image from "next/image";
import { useEffect, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { FiMenu } from "react-icons/fi";
import { IoAdd } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import SearchHeader from "./SearchHeader";
import { useRecoilState } from "recoil";
import { burgerMenuState } from "../recoilState/recoilState";
import ProfileWindowHeader from "./ProfileWindowHeader";

export default function Header(): JSX.Element {
  const [showInputHeader, setShowInputHeader] = useState<boolean>(false);
  const [openMenu, setOpenMenu] = useRecoilState(burgerMenuState);

  return (
    <div className=" w-screen h-[60px] bg-primary px-4 md:px-12 flex items-center justify-between">
      <AnimatePresence>
        {showInputHeader && (
          <SearchHeader
            showInputHeader={showInputHeader}
            setShowInputHeader={setShowInputHeader}
          />
        )}
      </AnimatePresence>
      {/* ------------------------ */}
      <AnimatePresence>{openMenu && <ProfileWindowHeader />}</AnimatePresence>
      <div className=" flex items-center space-x-2  select-none">
        <Image src={"/assets/banner.gif"} height={44} width={44} />
        <p className="text-sm font-big md:text-xl ">PugaMarketCap</p>
      </div>
      <div className=" space-x-2 flex md:space-x-4 items-center">
        <div
          className="icon-sm md:icon-big tr-300"
          onClick={() => {
            setShowInputHeader(true);
            setOpenMenu(false);
          }}
        >
          <BiSearchAlt />
        </div>

        <div
          className="icon-sm md:icon-big"
          onClick={() => {
            setOpenMenu((prev) => !prev);
          }}
        >
          {!openMenu ? <FiMenu /> : <IoAdd className="rotate-45 scale-150" />}
        </div>
      </div>
    </div>
  );
}
