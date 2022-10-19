import { motion } from "framer-motion";
import OutsideClickHandler from "react-outside-click-handler";
import { useRecoilState } from "recoil";
import { loginStateMain } from "../recoilState/recoilState";
import LoginHeader from "./LoginHeader";
import { AiOutlineClose } from "react-icons/ai";
import { Dispatch, SetStateAction, useEffect } from "react";

interface IProps {
  setShowInputHeader: Dispatch<SetStateAction<boolean>>;
}

export default function LoginMainWindow({
  setShowInputHeader,
}: IProps): JSX.Element {
  const [show, setShow] = useRecoilState(loginStateMain);

  useEffect(() => {
    setShowInputHeader(false);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className=" absolute z-[9999] top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 "
    >
      <OutsideClickHandler
        onOutsideClick={() => {
          setShow(false);
        }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ delay: 0.05, duration: 0.3 }}
          className=" bg-violet-900/30 p-4 rounded-lg backdrop-blur-lg w-[88vw] md:w-[320px] h-[240px] space-y-2"
        >
          <div
            className=" w-6 h-6 grad absolute top-1 right-1 rounded-md superflex hover:scale-110 tr-300 cursor-pointer"
            onClick={() => {
              setShow(false);
            }}
          >
            <AiOutlineClose className="text-xl" />
          </div>
          <LoginHeader />
        </motion.div>
      </OutsideClickHandler>
    </motion.div>
  );
}
