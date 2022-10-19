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
import { auth, db } from "../firebase/clientApp";
import { loginState, refreshState, userState } from "../recoilState/recoilState";
import { RecoilState, useRecoilState } from "recoil";
import { addDoc, collection } from "firebase/firestore";

export default function LoginHeader(): JSX.Element {
  const [isSignUp, setIsSignUp] = useState<boolean>(true);
  const [isLogin, setIsLogin] = useRecoilState<boolean>(loginState);

  const [inputEmail, setInputEmail] = useState("");
  const [inputPass, setInputPass] = useState("");

  const [noEmail, setNoEmail] = useState(false);
  const [noPass, setNoPass] = useState(false);

  const [inputError, setinputError] = useState<
    "password or email wrong" | "password less 6" | "user already exist" | null
  >(null);

  const userCollectionRef = collection(db, "users")
  const [refresh, setRefresh] = useRecoilState(refreshState);



  useEffect(() => {
    setinputError(null);
  }, [inputEmail, inputPass]);

  const registerFB = async (e: any) => {
    if (inputEmail === "") {
      setNoEmail(true);
    }
    if (inputPass === "") {
      setNoPass(true);
    }

    e.preventDefault();
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        inputEmail,
        inputPass
      );
      setIsLogin(true);
      const addUserToDb = async()=>{
        await addDoc(userCollectionRef, {email:inputEmail, stars:[]})
      }
      addUserToDb()
    } catch (error: any) {
      setinputError("user already exist");
    }
    setRefresh((prev) => !prev);
    
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
      setIsLogin(true);
    } catch (error: any) {
      setinputError("password or email wrong");
    }
    setRefresh((prev) => !prev);
  };

  return (
    <>
      <div className=" flex items-center justify-between px-12 w-full">
        <div
          className="relative cursor-pointer"
          onClick={() => {
            setIsSignUp(true);
            setNoPass(false);
            setNoEmail(false);
            setinputError(null);
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
            setNoPass(false);
            setNoEmail(false);
            setinputError(null);
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
              noEmail && "border-[#ff7171]"
            } tr-300`}
          />
          {noEmail && (
            <div className=" flex space-x-2 items-center bg-[#ff7171] absolute top-0 bottom-0 my-auto right-2 px-2 h-7 rounded-lg ">
              <BiErrorAlt />
              <p className=" text-xs">Email required</p>
            </div>
          )}
          {!Array.from(inputEmail).includes("@") && inputEmail !== "" && (
            <div className=" absolute bottom-[-10px] right-4 bg-[#ff7171]  px-2 rounded-md text-xs py-1 ">
              {!Array.from(inputEmail).includes("@") && "Email should have @"}
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
              noPass && "border-[#ff7171]"
            } tr-300`}
          />
          {noPass && (
            <div className=" flex space-x-2 items-center bg-[#ff7171] absolute top-0 bottom-0 my-auto right-2 px-2 h-7 rounded-lg ">
              <BiErrorAlt />
              <p className=" text-xs">Password required</p>
            </div>
          )}
          {((inputError === "password or email wrong" && inputPass !== "") ||
            inputError === "user already exist"&& inputPass !== "") && (
            <div className=" absolute bottom-[-10px] right-4 bg-[#ff7171]  px-2 rounded-md text-xs py-1 ">
              {inputError === "password or email wrong" &&
                "Password or Email wrong"}
              {inputError === "user already exist" && "Account already exist"}
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
