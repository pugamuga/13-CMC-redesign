import { useEffect, useState } from "react";
import { MdOutlineSupervisorAccount } from "react-icons/md";
import { BiLogIn } from "react-icons/bi";
import { BiErrorAlt } from "react-icons/bi";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Auth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { auth } from "../firebase/clientApp";
import { userState } from "../recoilState/recoilState";
import { RecoilState, useRecoilState } from "recoil";

export default function LoginHeader(): JSX.Element {
  const [isSignUp, setIsSignUp] = useState<boolean>(true);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPass, setSignUpPass] = useState("");

  // const [user, setUser] = useRecoilState(userState);
  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser: any) => {
    setUser(currentUser);
  });


  // console.log(user !== null && user.email);

  const registerFB = async (e: any) => {
    e.preventDefault();
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        signUpEmail,
        signUpPass
      );
    } catch (error: any) {
      console.log(error?.message);
    }
  };

  // console.log(auth.currentUser?.email)
  const loginFB = async () => {};
  const logoutFB = async () => {};

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
              if (isSignUp) {
                setSignUpEmail(e.target.value);
              } else {
                setLoginEmail(e.target.value);
              }
            }}
            type="email"
            placeholder="Email"
            className={`inputLogin border border-transparent ${
              true && "border-[#ff7171]"
            } tr-300`}
          />
          {/* {errors?.email && (
            <div className=" flex space-x-2 items-center bg-[#ff7171] absolute top-0 bottom-0 my-auto right-2 px-2 h-7 rounded-lg ">
              <BiErrorAlt />
              <p className=" text-xs">Email required</p>
            </div>
          )} */}
        </div>
        <div className="w-full relative">
          <input
            onChange={(e) => {
              if (isSignUp) {
                setSignUpPass(e.target.value);
              } else {
                setLoginPass(e.target.value);
              }
            }}
            type="password"
            placeholder="Password"
            className={`inputLogin border border-transparent ${
              true && "border-[#ff7171]"
            } tr-300`}
          />
          {/* {errors?.password && (
            <div className=" flex space-x-2 items-center bg-[#ff7171] absolute top-0 bottom-0 my-auto right-2 px-2 h-7 rounded-lg ">
              <BiErrorAlt />
              <p className=" text-xs">Password required</p>
            </div>
          )} */}
        </div>
        {isSignUp ? (
          <button onClick={registerFB} className=" btnStyleOne text-white">
            Create account
            <MdOutlineSupervisorAccount />
          </button>
        ) : (
          <button className=" btnStyleOne text-white">
            Log In
            <BiLogIn />
          </button>
        )}
      </form>
    </>
  );
}
