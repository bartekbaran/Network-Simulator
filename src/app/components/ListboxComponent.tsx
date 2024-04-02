import { Listbox, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react";
import { Circle } from "../interfaces/Circle";

function ListboxComponent({
  selected,
  options,
  keyTemplate,
  functionToUpdate,
}: {
  selected: Circle;
  options: Circle[];
  keyTemplate: string;
  functionToUpdate: any;
}) {
  return (
    <Listbox value={selected ? selected : {}} onChange={functionToUpdate}>
      <Listbox.Button
        className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left border-solid border-2 border-gray-100
                          shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 col-span-3
                          focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
      >
        <span className="block truncate min-h-5">
          {selected ? selected.key : ""}
        </span>
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronDownIcon
            className="h-5 w-5 text-gray-500"
            aria-hidden="true"
          />
        </span>
      </Listbox.Button>
      <Transition
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        enterTo="opacity-100 translate-y-0 sm:scale-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      >
        <Listbox.Options
          className="absolute max-w-[464.01px] z-20 mt-1 overflow-auto max-h-60 w-full rounded-md 
                            bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
        >
          {options.map((option) => (
            <Listbox.Option
              key={keyTemplate + option.key}
              value={option}
              className={
                selected !== null && selected.key === option.key
                  ? "relative cursor-default select-none py-2 pl-10 pr-4 bg-amber-100 text-amber-900 z-20"
                  : "relative cursor-default select-none py-2 pl-10 pr-4 text-gray-900 z-20 min-h-5"
              }
            >
              {option.key}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Transition>
    </Listbox>
  );
}

export default ListboxComponent;
