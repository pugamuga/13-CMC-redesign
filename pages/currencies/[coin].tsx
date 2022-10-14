import Link from "next/link";
import {IoIosArrowRoundBack} from "react-icons/io"

export default function coin(): JSX.Element {
  return (
    <div>
      <Link href={"/"}>
        <div className=" flex items-center cursor-pointer space-x-2">
            <IoIosArrowRoundBack className="text-xl"/>
            <p>Back</p>
        </div>
      </Link>
    </div>
  );
}
