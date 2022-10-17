import { useEffect, useState } from "react";
import { MdOutlineSupervisorAccount } from "react-icons/md";
import { BiLogIn } from "react-icons/bi";
import { BiErrorAlt } from "react-icons/bi";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Auth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { auth } from "../firebase/clientApp";
import { loginState, userState } from "../recoilState/recoilState";
import { RecoilState, useRecoilState } from "recoil";

export default function LoginHeader(): JSX.Element {
  const [isSignUp, setIsSignUp] = useState<boolean>(true);
  const [isLogin, setIsLogin] = useRecoilState<boolean>(loginState);

  const [inputEmail, setInputEmail] = useState("");
  const [inputPass, setInputPass] = useState("");

  const [noEmail, setNoEmail] = useState(false);
  const [noPass, setNoPass] = useState(false);

  const [inputError, setinputError] = useState<
    "password wrong" | "password less 6" | "user already exist" | null
  >(null);

  console.log(inputError);

  const registerFB = async (e: any) => {
    if (inputEmail === "") {
      setNoEmail(true);
    }
    if (inputPass === "") {
      setNoPass(true);
    }
    if (Array.from(inputPass).length > 6) {
      setinputError("password less 6");
    }
    e.preventDefault();
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        inputEmail,
        inputPass
      );
    } catch (error: any) {
      setinputError("user already exist");
    }
    return setIsLogin(false);
  };

  // console.log(auth.currentUser?.email)
  const loginFB = async (e: any) => {
    if (inputEmail === "") {
      setNoEmail(true);
    }
    if (inputPass === "") {
      setNoPass(true);
    }
    e.preventDefault();
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        inputEmail,
        inputPass
      );
    } catch (error: any) {
      setinputError("password wrong");
    }
    return setIsLogin(true);
  };

  return (
    <>
      <div className=" flex items-center justify-between px-12 w-full">
        <div
          className="relative cursor-pointer"
          onClick={() => {
            setIsSignUp(true);
          }}
        >
          <p>Sign Up</p>
          <div
            className={` w-full bottom-[-10px] h-2 grad rounded-full absolute right-0 left-0 mx-auto tr-300  ${
              isSignUp ? "opacity-100" : "opacity-0"
            }`}
          ></div>
        </div>
        <div
          className="relative cursor-pointer"
          onClick={() => {
            setIsSignUp(false);
          }}
        >
          <p>Log In</p>
          <div
            className={` w-full bottom-[-10px] h-2 grad rounded-full absolute right-0 left-0 mx-auto  tr-300 ${
              !isSignUp ? "opacity-100" : "opacity-0"
            }`}
          ></div>
        </div>
      </div>
      <form className="w-full flex flex-col space-y-4 pt-4">
        <div className="w-full relative">
          <input
            onChange={(e) => {
              setInputEmail(e.target.value);
              setNoEmail(false);
            }}
            type="email"
            placeholder="Email"
            className={`inputLogin border border-transparent ${
              false && "border-[#ff7171]"
            } tr-300`}
          />
          {noEmail && (
            <div className=" flex space-x-2 items-center bg-[#ff7171] absolute top-0 bottom-0 my-auto right-2 px-2 h-7 rounded-lg ">
              <BiErrorAlt />
              <p className=" text-xs">Email required</p>
            </div>
          )}
        </div>
        <div className="w-full relative">
          <input
            onChange={(e) => {
              setInputPass(e.target.value);
              setNoPass(false);
            }}
            type="password"
            placeholder="Password"
            className={`inputLogin border border-transparent ${
              false && "border-[#ff7171]"
            } tr-300`}
          />
          {noPass && (
            <div className=" flex space-x-2 items-center bg-[#ff7171] absolute top-0 bottom-0 my-auto right-2 px-2 h-7 rounded-lg ">
              <BiErrorAlt />
              <p className=" text-xs">Password required</p>
            </div>
          )}
        </div>
        {isSignUp ? (
          <button onClick={registerFB} className=" btnStyleOne text-white">
            Create account
            <MdOutlineSupervisorAccount />
          </button>
        ) : (
          <button onClick={loginFB} className=" btnStyleOne text-white">
            Log In
            <BiLogIn />
          </button>
        )}
      </form>
    </>
  );
}
