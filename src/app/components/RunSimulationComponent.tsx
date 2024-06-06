function RunSimulationComponent({
	runSimulation
}: {
	runSimulation: any
}) {

	return(
		<button onClick={runSimulation}
			className="absolute z-10 w-32 right-2 bottom-2 inline-flex justify-center rounded-md bg-green-700 px-3 py-2 text-sm font-semibold
        text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2
        focus-visible:outline-offset-2 focus-visible:outline-green-700 sm:col-start-2 disabled:opacity-25"
		>
			Run simulation
		</button>
	)
}

export default RunSimulationComponent;