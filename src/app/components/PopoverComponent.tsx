import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon, PencilIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react";
import { Flow } from "../interfaces/Flow";

function PopoverComponent({
  flows,
  editFlow,
}: {
  flows: Flow[];
  editFlow: any;
}) {
  return (
    <div className="absolute right-5 top-16 w-full max-w-sm px-4">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${
                  open
                    ? "text-gray-950 ring-slate-700 "
                    : "text-gray-600 ring-slate-400"
                }
                group inline-flex transition duration-200 items-center rounded-md bg-gray-100 px-3 py-2 text-base font-medium 
                hover:text-gray-950 focus:outline-none ring-2 hover:ring-slate-700`}
            >
              <span className="w-16">Flows</span>
              <ChevronDownIcon
                className={`${open ? "text-gray-950" : "text-gray-500"}
                  ml-2 h-5 w-5 transition duration-150 ease-in-out group-hover:text-gray-950`}
                aria-hidden="true"
              />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 mt-3 w-full right-1/3 max-w-sm transform px-4 sm:px-0 lg:max-w-3xl">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
                  <div className="relative grid gap-8 bg-white p-7 lg:grid-cols-1">
                    {flows.map((flow) => (
                      <div
                        key={"id" + flow.id}
                        className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 
                        focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50"
                      >
                        <button
                          onClick={() => editFlow(flow)}
                          className="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12"
                        >
                          <PencilIcon className="text-black bg-gray-100 rounded-md p-1 border-solid border-2 border-gray-200" />
                        </button>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-900">
                            Source: {flow && flow.source ? flow.source.key : ""}
                            {"   "}
                            Destination:{" "}
                            {flow && flow.destination
                              ? flow.destination.key
                              : ""}
                          </p>
                          <p className="text-sm text-gray-500">
                            ID: {flow ? flow.id : ""}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}

export default PopoverComponent;
