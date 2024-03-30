import { Circle } from "../interfaces/Circle";
import { Line } from "../interfaces/Line";

export default function genearteLine(
  fromCircle: Circle,
  toCircle: Circle
): Line {
  let line: Line = {
    startX: 0,
    startY: 0,
    length: 0,
    degreeToBeApplied: 0,
    isDecreasing: false,
  };

  if (fromCircle.x > toCircle.x) {
    if (fromCircle.y < toCircle.y) {
      line.isDecreasing = true;
    }
  } else {
    if (toCircle.y < fromCircle.y) {
      line.isDecreasing = true;
    }
  }

  let triangleHeight = Math.abs(fromCircle.y - toCircle.y);
  let triangleWidth = Math.abs(fromCircle.x - toCircle.x);
  line.length = Math.sqrt(
    Math.pow(triangleHeight, 2) + Math.pow(triangleWidth, 2)
  );
  line.startX = (fromCircle.x + toCircle.x - line.length) / 2 + 25;
  line.startY = (fromCircle.y + toCircle.y) / 2 + 25;

  const sinValue = triangleHeight / line.length;
  const asinValue = Math.asin(sinValue);
  line.degreeToBeApplied = (asinValue * 180) / Math.PI;

  return line;
}
