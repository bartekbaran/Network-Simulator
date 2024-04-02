import { useEffect, useState } from "react";
import { Circle } from "../interfaces/Circle";
import CircleComponent from "./CircleComponent";
import LineComponent from "./LineComponent";
import { PairOfCircles } from "../interfaces/PairOfCircles";
import { Flow } from "../interfaces/Flow";
import FlowModal from "./modal/FlowModal";
import { DeviceType } from "../interfaces/DeviceType";

function Simulation({
  _circles,
  _editCircle,
  _addFlow,
}: {
  _circles: Circle[];
  _editCircle: any;
  _addFlow: any;
}) {
  const [pairsOfCircles, setPairsOfCircles] = useState<PairOfCircles[]>([]);
  const [lineBeginning, setLineBeginning] = useState<Circle>(null);
  const [circles, setCircles] = useState<Circle[]>([]);
  const [trafficGeneratorArray, setTrafficGeneratorArray] = useState<Circle[]>(
    []
  );

  const [showCreateFlowModal, setShowCreateFlowModal] =
    useState<boolean>(false);
  const [selectedSource, setSelectedSource] = useState<Circle>(null);

  useEffect(() => {
    let tempCircles = _circles;
    setCircles(tempCircles);
    setTrafficGeneratorArray(
      tempCircles.filter(
        (circle) => circle.deviceType === DeviceType.TrafficGenerator
      )
    );
  }, [_circles]);

  function addLine(selectedCircle: Circle) {
    if (lineBeginning === null) {
      setLineBeginning(selectedCircle);
    } else if (lineBeginning === selectedCircle) {
      setLineBeginning(null);
    } else {
      setPairsOfCircles([
        ...pairsOfCircles,
        {
          fromCircleKey: lineBeginning.key,
          toCircleKey: selectedCircle.key,
        },
      ]);
      setLineBeginning(null);
    }
  }

  function editCircle(draggedCircle: Circle) {
    _editCircle(draggedCircle);
  }

  function addFlow(flow: Flow) {
    _addFlow(flow);
  }

  function updateSourceAndShowFlowModal(circle: Circle) {
    setSelectedSource(circle);
    setShowCreateFlowModal(true);
  }

  function handleCloseModal() {
    setShowCreateFlowModal(false);
  }

  function handleFlowChange() {}

  return (
    <div id="simulation" className="relative" style={{ zIndex: "1" }}>
      {circles !== undefined &&
        circles.map((circle: Circle) => (
          <CircleComponent
            isSelected={
              lineBeginning !== null && circle.key === lineBeginning.key
            }
            circle={circle}
            addLine={addLine}
            circleDragged={editCircle}
            setShowCreateFlowModal={updateSourceAndShowFlowModal}
          />
        ))}
      {pairsOfCircles.map((pair: PairOfCircles) => (
        <LineComponent
          fromCircleKey={pair.fromCircleKey}
          toCircleKey={pair.toCircleKey}
          circlesArray={circles}
        />
      ))}
      <FlowModal
        isEdit={false}
        showCreateFlowModal={showCreateFlowModal}
        handleCloseModal={handleCloseModal}
        selectedSource={selectedSource}
        trafficGeneratorsArray={trafficGeneratorArray}
        handleSaveFlow={addFlow}
        handleFlowChange={handleFlowChange}
      ></FlowModal>
    </div>
  );
}

export default Simulation;
