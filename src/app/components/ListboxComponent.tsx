import { Listbox, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react";

function ListboxComponent({
  selected,
  options,
  keyTemplate,
  description,
  functionToUpdate,
}: {
  selected: any;
  options: any[];
  keyTemplate: string;
  description: string;
  functionToUpdate: any;
}) {
  return (
    <>
      <p className="ml-5 text-sm relative top-3 z-20 bg-white w-auto">
        {description}
      </p>
      <Listbox value={selected ? selected : {}} onChange={functionToUpdate}>
        <Listbox.Button
          className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-center border-solid border-2 border-gray-100
                          shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 col-span-3
                          focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-md"
        >
          <span className="block truncate min-h-5">
            {selected ? (selected.key ? selected.key : selected) : ""}
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
            className="absolute max-w-[226.01px] z-50 mt-1 overflow-auto max-h-60 w-full rounded-md 
                            bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
          >
            {options.map((option) => (
              <Listbox.Option
                key={keyTemplate + (option.key ? option.key : option)}
                value={option}
                className={
                  selected !== null &&
                  ((selected.key && selected.key === option.key) ||
                    selected === option)
                    ? "relative cursor-default select-none py-2 pl-10 pr-4 bg-slate-100 text-slate-900 z-50"
                    : "relative cursor-default select-none py-2 pl-10 pr-4 text-gray-900 z-50 min-h-5"
                }
              >
                {option.key ? option.key : option}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </Listbox>
    </>
  );
}

export default ListboxComponent;
