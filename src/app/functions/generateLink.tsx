import { Circle } from "../interfaces/Circle";
import { Link } from "../interfaces/Link";

export default function generateLink(
  id: number,
  fromCircle: Circle,
  toCircle: Circle
): Link {
  let link: Link = {
    id: id,
    pairOfCircles: { fromCircle: fromCircle, toCircle: toCircle },
    startX: 0,
    startY: 0,
    length: 0,
    degreeToBeApplied: 0,
    isDecreasing: false,
    bandwidth: 100000
  };

  if (fromCircle.x > toCircle.x) {
    if (fromCircle.y < toCircle.y) {
      link.isDecreasing = true;
    }
  } else {
    if (toCircle.y < fromCircle.y) {
      link.isDecreasing = true;
    }
  }

  let triangleHeight = Math.abs(fromCircle.y - toCircle.y);
  let triangleWidth = Math.abs(fromCircle.x - toCircle.x);
  link.length = Math.sqrt(
    Math.pow(triangleHeight, 2) + Math.pow(triangleWidth, 2)
  );
  link.startX = (fromCircle.x + toCircle.x - link.length) / 2 + 25;
  link.startY = (fromCircle.y + toCircle.y) / 2 + 50;

  const sinValue = triangleHeight / link.length;
  const asinValue = Math.asin(sinValue);
  link.degreeToBeApplied = (asinValue * 180) / Math.PI;

  return link;
}
