import { Circle } from "./Circle";

export interface Flow {
  id: number;
  source: Circle;
  destination: Circle;
  averageLoad: number;
  packetSize: number;
  flowType: string;
  time: number;
  avgBandwidth: number;
}
