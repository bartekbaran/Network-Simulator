import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import ListboxComponent from "../ListboxComponent";
import ColoredButtonComponent from "../ColoredButtonComponent";
import UncoloredButtonComponent from "../UncoloredButtonComponent";
import { Link } from "symulator/app/interfaces/Link";
import {bandwidthSizes} from "symulator/app/constants/bandwidthSizes";

function LinkModal({
	isEdit,
	linkToBeEdited,
	showModal,
	handleCloseModal,
	handleSave,
}: {
	isEdit: boolean;
	linkToBeEdited: Link;
	showModal: boolean;
	handleCloseModal: any;
	handleSave: any;
}) {
	const [newBandwidth, setNewBandwidth] = useState<number>(null);

	function clearDataAndCloseModal() {
		handleCloseModal();
		setNewBandwidth(null);
	}

	function submitBandwidth(event: any) {
		event.preventDefault();
		let LinkToBeSaved = {
			...linkToBeEdited,
			bandwidth: newBandwidth,
		};
		handleSave(LinkToBeSaved);
		clearDataAndCloseModal();
	}

	useEffect(() => {
		if (linkToBeEdited === null) {
			return;
		}

		setNewBandwidth(linkToBeEdited.bandwidth);
	}, [linkToBeEdited]);

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
											{isEdit ? "Edit link" : "Add link"}
										</Dialog.Title>
										<form action="submit" onSubmit={submitBandwidth}>
											<div className="my-3 sm:grid sm:grid-flow-row-dense text-left">
												<div>
													<ListboxComponent
														selected={newBandwidth}
														options={bandwidthSizes}
														optionToBeDisabled={null}
														keyTemplate="bandwidth"
														description="Bandwidth"
														functionToUpdate={setNewBandwidth}
													></ListboxComponent>
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

export default LinkModal;
