import { BiGridAlt } from "react-icons/bi";
import { BiCoinStack } from "react-icons/bi";
import { BsStars } from "react-icons/bs";
import { TbSwords } from "react-icons/tb";
import { useRecoilState } from "recoil";
import { pages, pageState, PageProps } from "../recoilState/recoilState";

export default function SideBar(): JSX.Element {
  const [selected, setSelected] = useRecoilState(pageState);

  return (
    <div className=" fixed left-0 top-5 h-[50%] w-[75px] bottom-0 my-auto md:flex  flex-col items-center justify-between text-xs hidden ">
      {pages.map((item: PageProps, id: number) => {
        const iconsClassName = `text-2xl ${
          item.name === selected.name ? "text-white/100" : "text-primaryLight"
        }`;

        return (
          <div
            onClick={() => {
              setSelected(item);
            }}
            className=" flex flex-col items-center space-y-2 cursor-pointer tr-300  relative"
            key={id}
          >
            <div
              className={` h-10 w-10 absolute grad rounded-full -z-10 top-0 tr-300  ${
                item.name === selected.name ? "opacity-50" : "opacity-0 "
              }`}
            ></div>
            {item.name === "Overview" && (
              <BiGridAlt className={iconsClassName} />
            )}
            {item.name === "Portfolio" && (
              <BiCoinStack className={iconsClassName} />
            )}
            {item.name === "Watch List" && (
              <BsStars className={iconsClassName} />
            )}
            {item.name === "Battle" && <TbSwords className={iconsClassName} />}
            <p
              className={` p-1 ${
                item.name === selected.name
                  ? "text-white/100"
                  : "text-primaryLight"
              }`}
            >
              {item.name}
            </p>
          </div>
        );
      })}
    </div>
  );
}
