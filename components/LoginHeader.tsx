import { useEffect, useState } from "react";
import { MdOutlineSupervisorAccount } from "react-icons/md";
import { BiLogIn } from "react-icons/bi";
import { BiErrorAlt } from "react-icons/bi";
import { SubmitHandler, useForm } from "react-hook-form";

export default function LoginHeader(): JSX.Element {
  const [isSignUp, setIsSignUp] = useState<boolean>(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
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
      <form
        onSubmit={handleSubmit((data: any) => {
          onSubmit(data);
        })}
        className="w-full flex flex-col space-y-4 pt-4"
      >
        <div className="w-full relative">
          <input
            {...register("email", { required: true })}
            type="email"
            placeholder="Email"
            className={`inputLogin border border-transparent ${
              errors?.email && "border-[#ff7171]"
            } tr-300`}
          />
          {errors?.email && (
            <div className=" flex space-x-2 items-center bg-[#ff7171] absolute top-0 bottom-0 my-auto right-2 px-2 h-7 rounded-lg ">
              <BiErrorAlt />
              <p className=" text-xs">Email required</p>
            </div>
          )}
        </div>
        <div className="w-full relative">
          <input
            {...register("password", { required: true })}
            type="password"
            placeholder="Password"
            className={`inputLogin border border-transparent ${
              errors?.password && "border-[#ff7171]"
            } tr-300`}
          />
          {errors?.password && (
            <div className=" flex space-x-2 items-center bg-[#ff7171] absolute top-0 bottom-0 my-auto right-2 px-2 h-7 rounded-lg ">
              <BiErrorAlt />
              <p className=" text-xs">Password required</p>
            </div>
          )}
        </div>
        {isSignUp ? (
          <button type="submit" className=" btnStyleOne text-white">
            Create account
            <MdOutlineSupervisorAccount />
          </button>
        ) : (
          <button type="submit" className=" btnStyleOne text-white">
            Log In
            <BiLogIn />
          </button>
        )}
      </form>
    </>
  );
}
