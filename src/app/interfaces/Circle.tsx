import React from "react";
import { SvgIconProps } from "@mui/material";
import { DeviceType } from "./DeviceType";

export interface Circle {
  id: number;
  key: string;
  x: number;
  y: number;
  r: number;
  color: string;
  icon: React.ComponentType<SvgIconProps>;
  deviceType: DeviceType;
}
