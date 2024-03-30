import { SvgIconProps } from "@mui/material";

export interface Circle {
  key: number;
  x: number;
  y: number;
  r: number;
  color: string;
  icon: React.ComponentType<SvgIconProps>;
}
