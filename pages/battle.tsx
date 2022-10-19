import { TbSwords } from "react-icons/tb";

export default function Battle(): JSX.Element {
  return (
    <div className=" w-full h-full superflex text-white/50 text-xl">
      <div className=" absolute">
        <TbSwords className=" text-[200px] text-[#230f3f]" />
      </div>

      <div className=" flex flex-col items-center z-10">
        <p>Wait version 1.2.0</p>
        <p className="text-sm text-white/20">Current version 1.1.0</p>
      </div>
    </div>
  );
}
