import {PairOfCircles} from "symulator/app/interfaces/PairOfCircles";

export interface Link {
  id: number;
  pairOfCircles: PairOfCircles;
  startX: number;
  startY: number;
  length: number;
  degreeToBeApplied: number;
  isDecreasing: boolean;
  bandwidth: number;
}
