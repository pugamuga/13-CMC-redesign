import Image from "next/image";
import { useEffect, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { FiMenu } from "react-icons/fi";
import { IoAdd } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import SearchHeader from "./SearchHeader";
import { useRecoilState } from "recoil";
import { burgerMenuState, loginStateMain } from "../recoilState/recoilState";
import ProfileWindowHeader from "./ProfileWindowHeader";
import ToggleDarkMode from "./ToggleDarkMode";
import MobileSideBar from "./MobileSideBar";
import Link from "next/link";
import LoginMainWindow from "./LoginMainWindow";

export default function Header(): JSX.Element {
  const [showInputHeader, setShowInputHeader] = useState<boolean>(false);
  const [openMenu, setOpenMenu] = useRecoilState(burgerMenuState);
  const [show, setShow] = useRecoilState(loginStateMain);


  return (
    <div className=" w-screen h-[60px]   md:px-4 md:pr-12 flex items-center px-4 justify-between">
      <AnimatePresence>
        {showInputHeader && (
          <SearchHeader
            showInputHeader={showInputHeader}
            setShowInputHeader={setShowInputHeader}
          />
        )}
      </AnimatePresence>
      {/* -------------------------------- */}
      <AnimatePresence>{show && <LoginMainWindow setShowInputHeader={setShowInputHeader}/>}</AnimatePresence>
      {/* -------------------------------- */}

      <div className=" flex items-center space-x-2  select-none cursor-pointer">
        <Link href={"/"}>
          <Image src={"/assets/banner.gif"} height={44} width={44} />
        </Link>
      </div>

      <div className=" space-x-2 flex md:space-x-4 items-center">
        {/* ------------------------ */}
        <AnimatePresence>
          {openMenu && (
            <ProfileWindowHeader
              openMenu={openMenu}
              setOpenMenu={setOpenMenu}
            />
          )}
        </AnimatePresence>
        {/* ------------------------ */}
        <div className=" inline md:hidden">
          <MobileSideBar />
        </div>
        <div className="  flex items-center">
          <ToggleDarkMode />
        </div>
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
