import { useState } from "react";
import { Circle } from "../interfaces/Circle";
import CircleComponent from "./CircleComponent";
import { Line } from "../interfaces/Line";
import LineComponent from "./LineComponent";
import genearteLine from "../functions/generateLine";
import { PairOfCircles } from "../interfaces/PairOfCircles";

function Simulation({ circles }: { circles: Circle[] }) {
  const [pairsOfCircles, setPairsOfCircles] = useState<PairOfCircles[]>([]);
  const [savedSelectedCircle, setSavedSelectedCircle] = useState<Circle>(null);

  function addLine(selectedCircle: Circle) {
    if (savedSelectedCircle === null) {
      setSavedSelectedCircle(selectedCircle);
    } else if (savedSelectedCircle === selectedCircle) {
      setSavedSelectedCircle(null);
    } else {
      setPairsOfCircles([
        ...pairsOfCircles,
        {
          fromCircle: savedSelectedCircle,
          toCircle: selectedCircle,
        },
      ]);
      setSavedSelectedCircle(null);
    }
  }

  return (
    <div id="simulation" className="relative" style={{ zIndex: "1" }}>
      {circles.map((circle: Circle) => (
        <CircleComponent
          isSelected={
            savedSelectedCircle !== null &&
            circle.key === savedSelectedCircle.key
          }
          circle={circle}
          addLine={addLine}
        />
      ))}
      {pairsOfCircles.map((pair: PairOfCircles) => (
        <LineComponent fromCircle={pair.fromCircle} toCircle={pair.toCircle} />
      ))}
    </div>
  );
}

export default Simulation;
