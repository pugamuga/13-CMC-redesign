import Image from "next/image";
import { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { FiMenu } from "react-icons/fi";

export default function Header(): JSX.Element {
  const [showInputHeader, setShowInputHeader] = useState<boolean>(false);
  return (
    <div className=" w-screen h-[60px] bg-primary px-4 md:px-12 flex items-center justify-between">
      <div className=" flex items-center space-x-2  select-none">
        <Image src={"/assets/banner.gif"} height={44} width={44} />
        <p className="text-sm font-big md:text-xl ">PugaMarketCap</p>
      </div>
      <div className=" space-x-2 flex md:space-x-4 items-center">
        <div
          className="icon-sm md:icon-big"
          onClick={() => {
            setShowInputHeader((prev) => !prev);
          }}
        >
          <BiSearchAlt />
        </div>
        {showInputHeader && (
          <div className=" hidden md:inline">
            <input
              style={{ width: "200px" }}
              type="text"
              className="text-primary font- outline-none px-2 py-1 rounded-lg text-sm "
              placeholder="Search coin..."
            />
          </div>
        )}
        <div className="icon-sm md:icon-big">
          <FiMenu />
        </div>
      </div>
    </div>
  );
}
