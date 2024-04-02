import { colors } from "../constants/colors";

export default function generateRandomColor(): string {
  return colors[Math.floor(Math.random() * colors.length)];
}
