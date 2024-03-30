import { useEffect, useState } from "react";
import { Circle } from "../interfaces/Circle";
import { Line } from "../interfaces/Line";
import genearteLine from "../functions/generateLine";

function LineComponent({
  fromCircle,
  toCircle,
}: {
  fromCircle: Circle;
  toCircle: Circle;
}) {
  const [line, setLine] = useState<Line>(null);

  useEffect(() => {
    setLine(genearteLine(fromCircle, toCircle));
  }, [fromCircle, toCircle]);

  return (
    <>
      {line !== null && (
        <div
          style={{
            position: "absolute",
            top: line.startY + "px",
            left: line.startX + "px",
            height: "2px",
            width: line.length,
            backgroundColor: "black",
            zIndex: "2",
            rotate: line.isDecreasing
              ? "-" + line.degreeToBeApplied + "deg"
              : line.degreeToBeApplied + "deg",
          }}
        ></div>
      )}
    </>
  );
}

export default LineComponent;
