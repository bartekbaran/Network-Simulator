import { useEffect, useState } from "react";
import { Circle } from "../interfaces/Circle";
import { Line } from "../interfaces/Line";
import genearteLine from "../functions/generateLine";

function LineComponent({
  fromCircleKey,
  toCircleKey,
  circlesArray,
}: {
  fromCircleKey: number;
  toCircleKey: number;
  circlesArray: Circle[];
}) {
  const [line, setLine] = useState<Line>(null);

  useEffect(() => {
    console.log(circlesArray);
    if (circlesArray === null || circlesArray === undefined) {
      return;
    }

    let fromCircle = circlesArray.find(
      (circle) => circle.key === fromCircleKey
    );
    let toCircle = circlesArray.find((circle) => circle.key === toCircleKey);
    setLine(genearteLine(fromCircle, toCircle));
    console.log("use effect");
  }, [circlesArray]);

  function getLineStyle(): React.CSSProperties {
    return {
      position: "absolute",
      top: `${line.startY}px`,
      left: `${line.startX}px`,
      height: "2px",
      width: `${line.length}px`,
      backgroundColor: "black",
      zIndex: "2",
      rotate: line.isDecreasing
        ? "-" + line.degreeToBeApplied + "deg"
        : line.degreeToBeApplied + "deg",
    };
  }

  return <>{line !== null && <div style={getLineStyle()}></div>}</>;
}

export default LineComponent;
