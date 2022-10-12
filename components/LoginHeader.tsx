import { useState } from "react";
import { MdOutlineSupervisorAccount } from "react-icons/md";
import { BiLogIn } from "react-icons/bi";

export default function LoginHeader(): JSX.Element {
  const [isSignUp, setIsSignUp] = useState<boolean>(true);
  return (
    <>
      <div className=" flex items-center justify-between px-12 w-full">
        <div className="relative cursor-pointer" onClick={() => {
         setIsSignUp(true)   
        }}>
          <p>Sign Up</p>
          <div
            className={` w-full bottom-[-10px] h-2 grad rounded-full absolute right-0 left-0 mx-auto tr-300  ${
              isSignUp ? "opacity-100" : "opacity-0"
            }`}
          ></div>
        </div>
        <div className="relative cursor-pointer" onClick={() => {
         setIsSignUp(false)   
        }}>
          <p>Log In</p>
          <div
            className={` w-full bottom-[-10px] h-2 grad rounded-full absolute right-0 left-0 mx-auto  tr-300 ${
              !isSignUp ? "opacity-100" : "opacity-0"
            }`}
          ></div>
        </div>
      </div>
      <div className="w-full flex flex-col space-y-4 pt-4">
        <div className="w-full">
          <input type="email" placeholder="Email" className="inputLogin" />
        </div>
        <div className="w-full">
          <input
            type="password"
            placeholder="Password"
            className="inputLogin"
          />
        </div>
        {isSignUp?<div className=" btnStyleOne">
          <p className="text-white">Create account</p>
          <MdOutlineSupervisorAccount />
        </div>:
        <div className=" btnStyleOne">
          <p className="text-white">Log In</p>
          <BiLogIn />
        </div>}
      </div>
    </>
  );
}
