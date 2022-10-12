import { MdOutlineSupervisorAccount } from "react-icons/md";

export default function LoginHeader(): JSX.Element {
  return (
    <>
      <div className=" flex items-center justify-between px-12 w-full">
        <div className="relative">
          <p>Sign Up</p>
          <div className=" w-full bottom-[-10px] h-2 grad rounded-full absolute right-0 left-0 mx-auto"></div>
        </div>
        <div className="relative">
          <p>Log In</p>
          <div className=" w-full bottom-[-10px] h-2 grad rounded-full absolute right-0 left-0 mx-auto"></div>
        </div>
      </div>
      <div className="w-full flex flex-col space-y-4 pt-4">
        <div className="w-full">
          <input type="email"  placeholder="Email" className="inputLogin"/>
        </div>
        <div className="w-full">
          <input type="password" placeholder="Password" className="inputLogin"/>
        </div>
        <div className=" btnStyleOne">
          <p className="text-white">Create account</p>
          <MdOutlineSupervisorAccount />
        </div>
      </div>
    </>
  );
}
