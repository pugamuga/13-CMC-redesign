import { Listbox, Transition } from "@headlessui/react";
import { Dispatch, Fragment, SetStateAction, useState } from "react";
import { FiChevronsDown } from "react-icons/fi";

interface IProps {
  amountPagesShown: number;
  setAmountPagesShown: Dispatch<SetStateAction<number>>;
}

export default function PagesAmountAtTime({
  amountPagesShown,
  setAmountPagesShown,
}: IProps): JSX.Element {
  return (
    <div className=" text-white relative z-30 text-xs  cursor-pointer  ">
      <Listbox value={amountPagesShown} onChange={setAmountPagesShown}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-[80px] cursor-pointer rounded-lg bg-white/10 drop-shadow-md py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 ">
            <div className="flex items-center space-x-2">
              {amountPagesShown}
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <FiChevronsDown
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
            </div>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white/10 backdrop-blur-md py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {[10, 25, 50, 100].map((page: number, personIdx: number) => (
                <Listbox.Option
                  onClick={() => {
                    setAmountPagesShown(page);
                  }}
                  key={personIdx}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 pl-4 pr-4 text-xs  ${
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
                        {page}
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
