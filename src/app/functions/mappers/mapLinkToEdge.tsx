import {Link} from "symulator/app/interfaces/Link";
import {Edge} from "symulator/app/interfaces/backend/Edge";
import {mapCircleToId} from "symulator/app/functions/mappers/mapCircleToId";

export const mapLinkToEdge = (link: Link) => {
	const edge: Edge = {
		id: link.id,
		from: mapCircleToId(link.pairOfCircles.fromCircle),
		to: mapCircleToId(link.pairOfCircles.toCircle),
		bandwidth: link.bandwidth
	};

	return edge;
}
