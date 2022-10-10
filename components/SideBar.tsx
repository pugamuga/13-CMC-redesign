import { BiGridAlt } from "react-icons/bi";
import { BiCoinStack } from "react-icons/bi";
import { BsStars } from "react-icons/bs";
import { TbSwords } from "react-icons/tb";

interface ObjProps {
  name: string;
  icon: string;
}

const Icons: ObjProps[] = [
  { name: "Overview", icon: "BiGridAlt" },
  { name: "Portfolio", icon: "BiCoinStack" },
  { name: "Watch List", icon: "BsStars" },
  { name: "Battle", icon: "TbSwords" },
];

export default function SideBar(): JSX.Element {
  return (
    <div className=" fixed left-0 top-5 h-[50%] w-[75px] bottom-0 my-auto flex  flex-col items-center justify-between text-xs">
      {Icons.map((item: ObjProps, id: number) => {
        return (
          <div className=" flex flex-col items-center space-y-2">
            {item.icon === "BiGridAlt"&& <BiGridAlt className="text-2xl text-white " />}
            {item.icon === "BiCoinStack"&& <BiCoinStack className="text-2xl text-primaryLight/50" />}
            {item.icon === "BsStars"&& <BsStars className="text-2xl text-primaryLight/50" />}
            {item.icon === "TbSwords"&& <TbSwords className="text-2xl text-primaryLight/50" />}
            <p className={`text-white/20 ${item.name == "Overview"&&"text-white/80"}`}>{item.name}</p>
          </div>
        );
      })}
    </div>
  );
}
