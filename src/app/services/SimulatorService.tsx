import {Link} from "symulator/app/interfaces/Link";
import {Flow} from "symulator/app/interfaces/Flow";
import {Circle} from "symulator/app/interfaces/Circle";
import {ResponseData} from "symulator/app/interfaces/backend/ResponseData";
import {mapLinkToEdge} from "symulator/app/functions/mappers/mapLinkToEdge";
import {mapFlowForBackendFlow} from "symulator/app/functions/mappers/mapFlowForBackendFlow";
import {mapCircleToNode} from "symulator/app/functions/mappers/mapCircleToNode";
import axios from "axios";

const baseUrl = "http://127.0.0.1:5000";

async function getCalculationsFromSimulator(links: Link[], flows: Flow[], circles: Circle[]): Promise<ResponseData> {
	let edges = links.map(mapLinkToEdge);
	let backendFlows = flows.map(mapFlowForBackendFlow);
	let nodes = circles.map(mapCircleToNode);

	const response = await axios.post(`${baseUrl}/simulation`, {
		edges: edges,
		nodes: nodes,
		flows: backendFlows
	});

	return {
		"delay": response.data.delay,
		"jitter": response.data.jitter,
		"packetDrop": response.data.packetDrop,
		"fromSimulator": response.data.fromSimulator
	} as ResponseData;
}

export { getCalculationsFromSimulator };
