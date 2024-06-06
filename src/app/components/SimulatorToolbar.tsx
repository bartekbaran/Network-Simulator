import RouterRoundedIcon from "@mui/icons-material/RouterRounded";
import DnsRoundedIcon from "@mui/icons-material/DnsRounded";
import StorageRoundedIcon from "@mui/icons-material/StorageRounded";
import { ToolbarItem } from "../interfaces/ToolbarItem";
import { SvgIconProps } from "@mui/material";
import { DeviceType } from "../interfaces/DeviceType";
import { useState } from "react";

function SimulatorToolbar(props: any) {
  const [routerCounter, setRouterCounter] = useState<number>(0);
  const [switchCounter, setSwitchCounter] = useState<number>(0);
  const [trafficGeneratorCounter, setTrafficGeneratorCounter] =
    useState<number>(0);

  function handleClick(
    icon: React.ComponentType<SvgIconProps>,
    deviceType: DeviceType
  ) {
    let key = deviceType.valueOf() + getCounter(deviceType);
    props.addCircle(icon, deviceType, key);
  }

  function getCounter(deviceType: DeviceType): number {
    switch (deviceType) {
      case DeviceType.Router:
        let newRouterCounter = routerCounter + 1;
        setRouterCounter(newRouterCounter);
        return newRouterCounter;
      case DeviceType.Switch:
        let newSwitchCounter = switchCounter + 1;
        setSwitchCounter(newSwitchCounter);
        return newSwitchCounter;
      case DeviceType.TrafficGenerator:
        let newTrafficGeneratorCounter = trafficGeneratorCounter + 1;
        setTrafficGeneratorCounter(newTrafficGeneratorCounter);
        return newTrafficGeneratorCounter;
    }
  }

  const toolbarItems: ToolbarItem[] = [
    { name: "Router", icon: RouterRoundedIcon, deviceType: DeviceType.Router },
    { name: "Switch", icon: StorageRoundedIcon, deviceType: DeviceType.Switch },
    {
      name: "Traffic generator",
      icon: DnsRoundedIcon,
      deviceType: DeviceType.TrafficGenerator,
    },
  ];

  return (
    <>
      <div className="hidden w-64 shrink-0 lg:block lg:pr-8 border-r-2 border-solid">
        <div className="grid justify-items-center w-auto whitespace-nowrap">
          <span className="text-xl py-8">Toolbar</span>
        </div>
        <div className="sticky top-[120px]">
          <nav className="mx-auto space-y-4 text-gray-400">
            {toolbarItems.map((item) => (
              <button
                className="flex items-center whitespace-nowrap roundedpx-1 font-medium transition-colors 
                duration-200 hover:text-gray-950 lg:px-0 lg:py-0 lg:text-sm text-gray-600 w-full border-solid
                border-2 border-slate-300 hover:border-slate-400 shadow-md rounded-lg"
                onClick={() => handleClick(item.icon, item.deviceType)}
              >
                <span className="pl-3 pr-5 py-1">
                  <item.icon sx={{ fontSize: 24 }} />
                </span>
                <span className="text-base">{item.name}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}

export default SimulatorToolbar;
