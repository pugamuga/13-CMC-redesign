import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useRecoilState } from "recoil";
import { coinDataState } from "../recoilState/recoilState";

interface Iprops {
  name: string;
  type: "like" | "dislike" | "favorite";
}

export default function SlideTop({ name, type }: Iprops): JSX.Element {
    const [coins, setCoins] = useRecoilState(coinDataState);

  return (
    <div className=" h-full w-full grad-150 rounded-lg p-2">
      <div className=" flex items-center justify-start w-full border-b pb-2 border-white/10">
        <div className="md:text-3xl px-2 text-xl">
            {type === "like"&&<Like/>}
            {type === "dislike"&&<DisLike/>}
            {type === "favorite"&&<Favorite/>}
        </div>
        <p className="font-bold text-sm md:text-lg">{name}</p>
      </div>
      <div>
        {coins.slice(0,3).map((coin:MainCoinData)=>{
            return (
                <div>{coin.name}</div>
            )
        })}
      </div>
    </div>
  );
}

function Like(): JSX.Element {
  return (
    <>
      <AiFillLike className=" text-[#67dfbd]"/>
    </>
  );
}
function DisLike(): JSX.Element {
  return (
    <>
      <AiFillDislike className=" text-[#ff7171]"/>
    </>
  );
}
function Favorite(): JSX.Element {
  return <><AiFillStar  className="text-violet-500"/></>;
}

