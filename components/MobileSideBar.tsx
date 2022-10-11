import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { BsCheckAll } from "react-icons/bs";
import { FiChevronsDown } from "react-icons/fi";
import { BiGridAlt } from "react-icons/bi";
import { BiCoinStack } from "react-icons/bi";
import { BsStars } from "react-icons/bs";
import { TbSwords } from "react-icons/tb";

const pages = [
  { name: "Overview" },
  { name: "Portfolio" },
  { name: "Watch List" },
  { name: "Battle" },
];

export default function MobileSideBar() {
  const [selected, setSelected] = useState(pages[0]);

  return (
    <div className=" text-white relative z-30 text-xs    ">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-[140px] cursor-default rounded-lg bg-white/10 drop-shadow-md py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <div className="flex items-center space-x-2">
              {selected.name === "Overview" && <BiGridAlt className="" />}
              {selected.name === "Portfolio" && <BiCoinStack className="" />}
              {selected.name === "Watch List" && <BsStars className="" />}
              {selected.name === "Battle" && <TbSwords className="" />}
              <span className="block truncate">{selected.name}</span>
            </div>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <FiChevronsDown
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {pages.map((page, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-4 pr-4 text-xs ${
                      active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                    }`
                  }
                  value={page}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {page.name}
                      </span>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
