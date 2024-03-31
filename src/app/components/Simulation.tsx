import { useEffect, useState } from "react";
import { Circle } from "../interfaces/Circle";
import CircleComponent from "./CircleComponent";
import LineComponent from "./LineComponent";
import { PairOfCircles } from "../interfaces/PairOfCircles";

function Simulation({ _circles }: { _circles: Circle[] }) {
  const [pairsOfCircles, setPairsOfCircles] = useState<PairOfCircles[]>([]);
  const [savedSelectedCircle, setSavedSelectedCircle] = useState<Circle>(null);
  const [circles, setCircles] = useState<Circle[]>([]);

  useEffect(() => {
    let tempCircles = _circles;
    setCircles(tempCircles);
    console.log(circles);
  }, [_circles]);

  function addLine(selectedCircle: Circle) {
    if (savedSelectedCircle === null) {
      setSavedSelectedCircle(selectedCircle);
    } else if (savedSelectedCircle === selectedCircle) {
      setSavedSelectedCircle(null);
    } else {
      setPairsOfCircles([
        ...pairsOfCircles,
        {
          fromCircleKey: savedSelectedCircle.key,
          toCircleKey: selectedCircle.key,
        },
      ]);
      setSavedSelectedCircle(null);
    }
  }

  function circleDragged(draggedCircle: Circle) {
    setCircles(
      circles.map((circle) =>
        circle.key === draggedCircle.key
          ? { ...circle, x: draggedCircle.x, y: draggedCircle.y }
          : circle
      )
    );
  }

  return (
    <div id="simulation" className="relative" style={{ zIndex: "1" }}>
      {circles !== undefined &&
        circles.map((circle: Circle) => (
          <CircleComponent
            isSelected={
              savedSelectedCircle !== null &&
              circle.key === savedSelectedCircle.key
            }
            circle={circle}
            addLine={addLine}
            circleDragged={circleDragged}
          />
        ))}
      {pairsOfCircles.map((pair: PairOfCircles) => (
        <LineComponent
          fromCircleKey={pair.fromCircleKey}
          toCircleKey={pair.toCircleKey}
          circlesArray={circles}
        />
      ))}
    </div>
  );
}

export default Simulation;
