import { motion, AnimatePresence } from "framer-motion";
import { IoMdSettings } from "react-icons/io";
import { BiPowerOff } from "react-icons/bi";
import { MdAccountCircle } from "react-icons/md";
import { SetterOrUpdater, useRecoilState } from "recoil";
import OutsideClickHandler from "react-outside-click-handler";
import { useEffect, useState } from "react";
import LoginHeader from "./LoginHeader";
import { auth } from "../firebase/clientApp";
import { signOut } from "firebase/auth";
import {
  globalStar,
  loginState,
  refreshState,
} from "../recoilState/recoilState";

interface IProps {
  openMenu: boolean;
  setOpenMenu: SetterOrUpdater<boolean>;
}

export default function ProfileWindowHeader({
  openMenu,
  setOpenMenu,
}: IProps): JSX.Element {
  const [isLogin, setIsLogin] = useRecoilState<boolean>(loginState);
  const [refresh, setRefresh] = useRecoilState(refreshState);
  const [star, setStar] = useRecoilState(globalStar);

  useEffect(() => {
    if (auth.currentUser) {
      setIsLogin(true);
    }
  });

  const logoutFB = async () => {
    await signOut(auth);
    setIsLogin(false);
    setRefresh((prev) => !prev);
  };
  return (
    <>
      <OutsideClickHandler
        onOutsideClick={() => {
          setOpenMenu(false);
        }}
      >
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ easy: "easeOut" }}
          className="flex justify-between text-white font-bold flex-col items-end absolute bg-white/10 shadow-md space-y-4
        backdrop-blur-md  right-0 top-[50px] rounded-lg origin-top
        md:origin-top-right  p-4 w-[96%] md:w-[25%] left-0 mx-auto md:mx-0 md:right-12 md:left-auto z-20 min-w-[300px] "
        >
          {(isLogin || auth.currentUser) && openMenu ? (
            <>
              <div className=" flex items-center space-x-4 w-full ">
                <div className="w-12 h-12 grad rounded-2xl superflex">
                  {auth?.currentUser?.email?.split("")[0].toUpperCase()}
                </div>
                <p className="truncate w-44">{auth?.currentUser?.email}</p>
              </div>
              <div className=" btnStyleOne">
                <p className="text-white">Account</p>
                <MdAccountCircle />
              </div>
              <div className=" btnStyleOne ">
                <p className=" text-white">Settings</p>
                <IoMdSettings />
              </div>

              <div onClick={logoutFB} className=" btnStyleOne">
                <p className="text-white">Log out</p>
                <BiPowerOff />
              </div>
            </>
          ) : (
            <LoginHeader />
          )}
        </motion.div>
      </OutsideClickHandler>
    </>
  );
}
