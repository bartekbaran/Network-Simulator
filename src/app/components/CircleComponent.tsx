import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { Circle } from "../interfaces/Circle";
import {
  maxLeft,
  maxRight,
  maxBottom,
  maxTop,
} from "../constants/staticValues";
import { useRef, useState } from "react";
import generateCircleStyle from "../functions/styles/generateCircleStyle";
import generateCircleContainerStyle from "../functions/styles/generateCircleContainerStyle";
import { DeviceType } from "../interfaces/DeviceType";

function CircleComponent({
  circle,
  addLink,
  isSelected,
  circleDragged,
  setShowCreateFlowModal,
}: {
  circle: Circle;
  addLink: any;
  isSelected: boolean;
  circleDragged: any;
  setShowCreateFlowModal: any;
}) {
  const [oldTimeStamp, setOldTimeStamp] = useState<number>(null);

  const draggableRef = useRef(null);

  const trackPos = (e: DraggableEvent, data: DraggableData) => {
    if (oldTimeStamp === null || e.timeStamp - oldTimeStamp >= 10) {
      setOldTimeStamp(e.timeStamp);
      circle = {
        ...circle,
        x: data.x,
        y: data.y,
      };
      circleDragged(circle);
    }
  };

  const onContextMenu = (event: {
    nativeEvent: { button: number };
    preventDefault: () => void;
  }) => {
    if (event.nativeEvent.button === 2) {
      event.preventDefault();
      addLink(circle);
    }
  };

  const handleClick = (event: { detail: number }) => {
    if (event.detail === 2) {
      if (circle.deviceType === DeviceType.TrafficGenerator) {
        setShowCreateFlowModal(circle);
      }
    }
  };

  return (
    <Draggable
      key={"draggable" + circle.key}
      ref={draggableRef}
      bounds={{
        left: maxLeft,
        right: maxRight,
        bottom: maxBottom,
        top: maxTop,
      }}
      onDrag={(e, data) => trackPos(e, data)}
      defaultPosition={{ x: circle.x, y: circle.y }}
    >
      <div className={generateCircleContainerStyle()}>
        <div>
          <h1>{circle.key}</h1>
        </div>
        <div
          key={circle.key}
          className={generateCircleStyle(circle, isSelected)}
          onContextMenu={onContextMenu}
          onClick={handleClick}
        >
          <circle.icon />
        </div>
      </div>
    </Draggable>
  );
}

export default CircleComponent;
