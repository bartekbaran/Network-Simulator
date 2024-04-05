import { useEffect, useState } from "react";
import { Circle } from "../interfaces/Circle";
import CircleComponent from "./CircleComponent";
import LineComponent from "./LineComponent";
import { PairOfCircles } from "../interfaces/PairOfCircles";
import { Flow } from "../interfaces/Flow";
import FlowModal from "./modal/FlowModal";

function Simulation({
  _circles,
  _trafficGeneratorArray,
  _editCircle,
  _addFlow,
  _flowToBeEditted,
  _editFlow,
  _closeModal,
}: {
  _circles: Circle[];
  _trafficGeneratorArray: Circle[];
  _editCircle: any;
  _addFlow: any;
  _flowToBeEditted: Flow;
  _editFlow: boolean;
  _closeModal: any;
}) {
  const [pairsOfCircles, setPairsOfCircles] = useState<PairOfCircles[]>([]);
  const [lineBeginning, setLineBeginning] = useState<Circle>(null);
  const [circles, setCircles] = useState<Circle[]>([]);
  const [trafficGeneratorArray, setTrafficGeneratorArray] = useState<Circle[]>(
    []
  );
  const [showFlowModal, setShowFlowModal] = useState<boolean>(false);
  const [selectedSource, setSelectedSource] = useState<Circle>(null);
  const [flowToBeEditted, setFlowToBeEditted] = useState<Flow>(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  useEffect(() => {
    setCircles(_circles);
  }, [_circles]);

  useEffect(() => {
    setTrafficGeneratorArray(_trafficGeneratorArray);
  }, [_trafficGeneratorArray]);

  useEffect(() => {
    setFlowToBeEditted(_flowToBeEditted);
  }, [_flowToBeEditted]);

  useEffect(() => {
    setIsEdit(_editFlow);
    setShowFlowModal(_editFlow);
  }, [_editFlow]);

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
    setShowFlowModal(true);
  }

  function handleCloseModal() {
    setShowFlowModal(false);
    _closeModal();
    setIsEdit(false);
    setFlowToBeEditted(null);
  }

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
        isEdit={isEdit}
        flowToEditted={flowToBeEditted}
        showModal={showFlowModal}
        handleCloseModal={handleCloseModal}
        selectedSource={selectedSource}
        trafficGeneratorArray={trafficGeneratorArray}
        handleSave={addFlow}
      ></FlowModal>
    </div>
  );
}

export default Simulation;
