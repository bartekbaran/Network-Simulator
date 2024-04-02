import { Circle } from "../../interfaces/Circle";

export default function generateCircleStyle(
  circle: Circle,
  isSelected: boolean
): string {
  let color = circle.color;
  return `absolute bg-auto cursor-move w-12 h-12 border-2 border-solid rounded-full ${
    isSelected ? "border-red-600 text-red-600" : "border-black"
  } ${color} flex justify-center items-center z-40]`;
}
