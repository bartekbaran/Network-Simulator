import {Circle} from "symulator/app/interfaces/Circle";
import {Node} from "symulator/app/interfaces/backend/Node";

export const mapCircleToNode = (circle: Circle) => {
	const node: Node = {
		id: circle.id,
		name: circle.key,
		deviceType: circle.deviceType
	}

	return node;
}
