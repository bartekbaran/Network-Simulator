import Draggable, { DraggableData } from "react-draggable";
import { Circle } from "../interfaces/Circle";
import {
  maxLeft,
  maxRight,
  maxBottom,
  maxTop,
} from "../constants/min-max-values";

function CircleComponent({
  circle,
  addLine,
  isSelected,
  circleDragged,
}: {
  circle: Circle;
  addLine: any;
  isSelected: boolean;
  circleDragged: any;
}) {
  const trackPos = (data: DraggableData) => {
    circle = {
      ...circle,
      x: data.x,
      y: data.y,
    };
    circleDragged(circle);
  };

  const handleClick = (e: {
    nativeEvent: { button: number };
    preventDefault: () => void;
  }) => {
    if (e.nativeEvent.button === 2) {
      e.preventDefault();
      addLine(circle);
    }
  };

  return (
    <Draggable
      bounds={{
        left: maxLeft,
        right: maxRight,
        bottom: maxBottom,
        top: maxTop,
      }}
      onDrag={(e, data) => trackPos(data)}
      defaultPosition={{ x: circle.x, y: circle.y }}
    >
      <div
        key={circle.key}
        style={{
          position: "absolute",
          cursor: "move",
          margin: "auto",
          userSelect: "none",
          width: circle.r + "px",
          height: circle.r + "px",
          borderRadius: "50%",
          borderStyle: "solid",
          borderColor: isSelected ? "red" : "black",
          borderWidth: "3px",
          backgroundColor: circle.color,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: "3",
        }}
        onContextMenu={handleClick}
      >
        <circle.icon />
      </div>
    </Draggable>
  );
}

export default CircleComponent;
