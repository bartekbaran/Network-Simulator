import { SvgIconProps } from "@mui/material";

export interface ToolbarItem {
    name: string;
    icon: React.ComponentType<SvgIconProps>;
}