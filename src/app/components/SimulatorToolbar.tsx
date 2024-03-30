import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import DnsIcon from "@mui/icons-material/Dns";
import ListItemText from "@mui/material/ListItemText";
import RouterIcon from "@mui/icons-material/Router";
import StorageIcon from "@mui/icons-material/Storage";
import { ToolbarItem } from "../interfaces/ToolbarItem";
import { SvgIconProps } from "@mui/material";

function SimulatorToolbar(props: any) {
  function handleClick(icon: React.ComponentType<SvgIconProps>) {
    props.addCircle(icon);
  }

  const toolbarItems: ToolbarItem[] = [
    { name: "Router", icon: RouterIcon },
    { name: "Switch", icon: StorageIcon },
    { name: "Traffic generator", icon: DnsIcon },
  ];

  return (
    <>
      <div className="h-screen">
        <Toolbar>Toolbar</Toolbar>
        <Divider />
        <List>
          {toolbarItems.map((item) => (
            <ListItem key={item.name} disablePadding>
              <ListItemButton onClick={() => handleClick(item.icon)}>
                <ListItemIcon>
                  <item.icon />
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </div>
    </>
  );
}

export default SimulatorToolbar;
