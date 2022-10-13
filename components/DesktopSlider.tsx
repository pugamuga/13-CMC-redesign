import SlideTop from "./SlideTop";

export default function DesktopSlider(): JSX.Element {
  return (
    <div className=" h-full w-full flex justify-between">
      <div className="h-full w-[32%]">
        <SlideTop name={"1"}/>
      </div>
      <div className="h-full w-[32%]">
        <SlideTop name={"2"}/>
      </div>
      <div className="h-full w-[32%]">
        <SlideTop name={"3"}/>
      </div>
    </div>
  );
}
