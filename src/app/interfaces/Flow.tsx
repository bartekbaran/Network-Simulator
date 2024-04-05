import { Circle } from "./Circle";
import { FlowType } from "./FlowType";

export interface Flow {
  id: number;
  source: Circle;
  destination: Circle;
  averageLoad: number;
  packetSize: number;
  flowType: string;
}
