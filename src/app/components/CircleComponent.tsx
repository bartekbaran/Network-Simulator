import Draggable, { DraggableData } from "react-draggable";
import { Circle } from "../interfaces/Circle";

function CircleComponent({
  circle,
  addLine,
  isSelected,
}: {
  circle: Circle;
  addLine: any;
  isSelected: boolean;
}) {
  const trackPos = (data: DraggableData) => {
    circle = {
      ...circle,
      x: data.x,
      y: data.y,
    };
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
    <Draggable onDrag={(e, data) => trackPos(data)}>
      <div
        key={circle.key}
        style={{
          position: "absolute",
          cursor: "move",
          margin: "auto",
          userSelect: "none",
          left: circle.x,
          top: circle.y,
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
          transform: "translate(0px, 0px)",
        }}
        onContextMenu={handleClick}
      >
        <circle.icon />
      </div>
    </Draggable>
  );
}

export default CircleComponent;
