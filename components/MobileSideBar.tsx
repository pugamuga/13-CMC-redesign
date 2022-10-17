import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { BsCheckAll } from "react-icons/bs";
import { FiChevronsDown } from "react-icons/fi";
import { BiGridAlt } from "react-icons/bi";
import { BiCoinStack } from "react-icons/bi";
import { BsStars } from "react-icons/bs";
import { TbSwords } from "react-icons/tb";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { pageState } from "../recoilState/recoilState";
import { pages } from "../recoilState/recoilState";
import Router from "next/router";
import nProgress from "nprogress";

interface PageProps {
  name: string;
  link: string;
}

export default function MobileSideBar() {
  const [selected, setSelected] = useRecoilState(pageState);
  const router = useRouter(); 
  nProgress.configure({ showSpinner: false });

  useEffect(() => {
    router.push(selected.link);
    Router.events.on("routeChangeStart", () => {
      nProgress.start();
    });
    Router.events.on("routeChangeComplete", () => {
      nProgress.done();
    });
  }, [selected]);

  return (
    <div className=" text-white relative z-30 text-xs    ">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-[140px] cursor-default rounded-lg bg-white/10 drop-shadow-md py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 ">
            <div className="flex items-center space-x-2">
              {selected.name === "Overview" && (
                <BiGridAlt className="text-base" />
              )}
              {selected.name === "Portfolio" && (
                <BiCoinStack className="text-base" />
              )}
              {selected.name === "Watch List" && (
                <BsStars className="text-base" />
              )}
              {selected.name === "Battle" && <TbSwords className="text-base" />}
              <span className="block truncate mt-[1px]">{selected.name}</span>
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
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white/10 backdrop-blur-md py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {pages.map((page: PageProps, personIdx: number) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-4 pr-4 text-xs  ${
                      active ? "bg-primary/40 text-white" : "text-white"
                    }`
                  }
                  value={page}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-bold" : "font-normal"
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
