export interface BackendFlow {
	id: number,
	from: string,
	to: string,
	packetSize: number,
	flowType: string,
	time: number,
	avgBandwidth: number
}
