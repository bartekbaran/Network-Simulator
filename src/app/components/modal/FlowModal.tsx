import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { Circle } from "symulator/app/interfaces/Circle";
import { Flow } from "symulator/app/interfaces/Flow";
import ListboxComponent from "../ListboxComponent";
import ColoredButtonComponent from "../ColoredButtonComponent";
import UncoloredButtonComponent from "../UncoloredButtonComponent";
import { packetSizes } from "symulator/app/constants/packetSizes";
import { flowTypes } from "symulator/app/constants/flowTypes";
import InputComponent from "symulator/app/components/InputComponent";

function FlowModal({
  isEdit,
  flowToBeEdited,
  showModal,
  handleCloseModal,
  selectedSource,
  handleSave,
  trafficGeneratorArray,
}: {
  isEdit: boolean;
  flowToBeEdited: Flow;
  showModal: boolean;
  handleCloseModal: any;
  selectedSource: Circle;
  handleSave: any;
  trafficGeneratorArray: Circle[];
}) {
  const [newFlow, setNewFlow] = useState<Flow>(null);

  const [source, setSource] = useState<Circle>(null);
  const [destination, setDestination] = useState<Circle>(null);
  const [packetSize, setPacketSize] = useState<number>(null);
  const [flowType, setFlowType] = useState<string>(null);
  const [time, setTime] = useState<number>(null);
  const [avgBandwidth, setAvgBandwidth] = useState<number>(null);

  const handleSetTime = (event) => {
    setTime(event.target.value);
  };

  const handleSetAvgBandwidth = (event) => {
    setAvgBandwidth(event.target.value)
  }

  function clearDataAndCloseModal() {
    handleCloseModal();
    setNewFlow(null);
    setSource(null);
    setDestination(null);
    setPacketSize(null);
    setFlowType(null);
    setTime(null);
    setAvgBandwidth(null);
  }

  function submitFlow(event: any) {
    event.preventDefault();
    let flowToBeSaved = {
      ...newFlow,
      source: source,
      destination: destination,
      packetSize: packetSize,
      flowType: flowType,
      time: time,
      avgBandwidth: avgBandwidth
    };
    handleSave(flowToBeSaved);
    clearDataAndCloseModal();
  }

  useEffect(() => {
    if (selectedSource === null) {
      return;
    }

    setSource(selectedSource);

    setNewFlow({
      ...newFlow,
      source: selectedSource,
    });
  }, [selectedSource]);

  useEffect(() => {
    if (flowToBeEdited) {
      setNewFlow({
        ...newFlow,
        id: flowToBeEdited.id,
      });
      setSource(flowToBeEdited.source);
      setDestination(flowToBeEdited.destination);
      setPacketSize(flowToBeEdited.packetSize);
      setFlowType(flowToBeEdited.flowType);
      setTime(flowToBeEdited.time);
      setAvgBandwidth(flowToBeEdited.avgBandwidth);
    }
  }, [flowToBeEdited]);

  return (
    <Transition.Root show={showModal} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleCloseModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className="relative transform overflow-visible rounded-lg bg-white px-4 pb-4 pt-5
                  text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
              >
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      {isEdit ? "Edit flow" : "Add flow"}
                    </Dialog.Title>
                    <form action="submit" onSubmit={submitFlow}>
                      <div className="my-5 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3 text-left">
                        <div>
                          <ListboxComponent
                            selected={source}
                            options={trafficGeneratorArray}
                            optionToBeDisabled={null}
                            keyTemplate="source"
                            description="Source"
                            functionToUpdate={setSource}
                          ></ListboxComponent>
                        </div>
                        <div>
                          <ListboxComponent
                            selected={destination}
                            options={trafficGeneratorArray}
                            optionToBeDisabled={source}
                            keyTemplate="destination"
                            description="Destination"
                            functionToUpdate={setDestination}
                          ></ListboxComponent>
                        </div>
                      </div>
                      <div className="my-3 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3 text-left">
                        <div>
                          <ListboxComponent
                            selected={packetSize}
                            options={packetSizes}
                            optionToBeDisabled={null}
                            keyTemplate="packetSize"
                            description="Packet size"
                            functionToUpdate={setPacketSize}
                          ></ListboxComponent>
                        </div>
                        <div>
                          <ListboxComponent
                            selected={flowType}
                            options={flowTypes}
                            optionToBeDisabled={null}
                            keyTemplate="flowType"
                            description="Flow type"
                            functionToUpdate={setFlowType}
                          ></ListboxComponent>
                        </div>
                      </div>
                      <div className="my-3 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3 text-left">
                        <div>
                          <InputComponent
                            name="Time"
                            defaultValue={time}
                            functionToUpdate={handleSetTime}
                          ></InputComponent>
                        </div>
                        <div>
                          <InputComponent name="Average bandwidth" defaultValue={avgBandwidth} functionToUpdate={handleSetAvgBandwidth}></InputComponent>
                        </div>
                      </div>
                      <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                        <ColoredButtonComponent
                          color="green"
                          disabled={false}
                          text="Save"
                        ></ColoredButtonComponent>
                        <UncoloredButtonComponent
                          color="gray"
                          onClickFunction={clearDataAndCloseModal}
                          text="Cancel"
                        ></UncoloredButtonComponent>
                      </div>
                    </form>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default FlowModal;
