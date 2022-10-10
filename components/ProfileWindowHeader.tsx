import { motion, AnimatePresence } from "framer-motion";
import { IoMdSettings } from "react-icons/io";
import { BiPowerOff } from "react-icons/bi";
import { MdAccountCircle } from "react-icons/md";

export default function ProfileWindowHeader(): JSX.Element {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{easy:"easeOut"}}
      className="flex justify-between text-white font-bold flex-col items-end absolute bg-[#6558de]/40 space-y-4
      backdrop-blur-md  right-0 top-[50px] rounded-lg origin-top
       md:origin-top-right shadow-lg p-4 w-[90%] md:w-[25%] left-0 mx-auto md:mx-0 md:right-12 md:left-auto"
    >
      <div className=" flex items-center space-x-4 w-full">
        <div className="w-12 h-12 grad rounded-2xl superflex" >U</div>
        <p className="truncate w-44">User Najhbhjbjkbdasdsad</p>
      </div>
      <div className=" btnStyleOne">
        <MdAccountCircle />
        <p className="text-white">Account</p>
        <MdAccountCircle />
      </div>
      <div className=" btnStyleOne ">
        <IoMdSettings />
        <p className=" text-white">Settings</p>
        <IoMdSettings />
      </div>
     
      <div className=" btnStyleOne">
        <BiPowerOff />
        <p className="text-white">Log out</p>
        <BiPowerOff />
      </div>
    </motion.div>
  );
}
