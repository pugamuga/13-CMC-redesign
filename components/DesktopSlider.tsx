import SlideTop from "./SlideTop";

export default function DesktopSlider(): JSX.Element {
  return (
    <div className=" h-full w-full flex justify-between">
      <div className="h-full w-[32%]">
        <SlideTop name={"Top Gainers"} type={"like"}/>
      </div>
      <div className="h-full w-[32%]">
        <SlideTop name={"Top Losers"} type={"dislike"}/>
      </div>
      <div className="h-full w-[32%]">
        <SlideTop name={"Favorites"} type={"favorite"}/>
      </div>
    </div>
  );
}
