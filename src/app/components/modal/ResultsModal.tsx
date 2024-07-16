import {Dialog, Field, Label, Transition} from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import {ResponseData} from "symulator/app/interfaces/backend/ResponseData";

function ResultsModal({
	_results,
	showModal,
	handleCloseModal,
}: {
	_results: ResponseData;
	showModal: boolean;
	handleCloseModal: any;
}) {
	const [results, setResults] = useState<ResponseData>(null);

	function clearDataAndCloseModal() {
		handleCloseModal();
		setResults(null);
	}

	useEffect(() => {
		if (_results === null) {
			return;
		}

		setResults(_results);
	}, [_results]);

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
											as="h2"
											className="text-base font-semibold leading-6 text-gray-900 pb-5"
										>
											Results
										</Dialog.Title>
										<div>
											<Field>
												<Label>Delay: {results ? results.delay : 0}</Label>
											</Field>
											<Field>
												<Label>Jitter: {results ? results.jitter : 0}</Label>
											</Field>
											<Field>
												<Label>Packet drop: {results ? results.packetDrop : 0}</Label>
											</Field>
										</div>
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

export default ResultsModal;
