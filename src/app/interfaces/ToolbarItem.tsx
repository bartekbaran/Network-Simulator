import { SvgIconProps } from "@mui/material";
import { DeviceType } from "./DeviceType";

export interface ToolbarItem {
  name: string;
  icon: React.ComponentType<SvgIconProps>;
  deviceType: DeviceType;
}
