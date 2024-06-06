import {Flow} from "symulator/app/interfaces/Flow";
import {BackendFlow} from "symulator/app/interfaces/backend/BackendFlow";

export const mapFlowForBackendFlow = (flow: Flow) => {
	const backendFlow: BackendFlow = {
		id: flow.id,
		from: flow.source.key,
		to: flow.destination.key,
		packetSize: flow.packetSize,
		flowType: flow.flowType,
		time: flow.time,
		avgBandwidth: flow.avgBandwidth
	}

	return backendFlow;
}
