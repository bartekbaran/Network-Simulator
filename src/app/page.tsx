"use client";
import React, { useState } from "react";
import SimulatorToolbar from "./components/SimulatorToolbar";
import { Circle } from "./interfaces/Circle";
import { SvgIconProps } from "@mui/material";
import Simulation from "./components/Simulation";
import generateRandomColor from "./functions/generateRandomColor";
import {
  maxLeft,
  maxRight,
  maxBottom,
  maxTop,
  circleR,
} from "./constants/static-values";
import { DeviceType } from "./interfaces/DeviceType";
import { Flow } from "./interfaces/Flow";
import PopoverComponent from "./components/PopoverComponent";

export default function Home() {
  const [circles, setCircles] = useState<Circle[]>([]);
  const [trafficGenerators, setTrafficGenerators] = useState<Circle[]>(
    []
  );
  const [flows, setFlows] = useState<Flow[]>([]);
  const [showFlowModal, setShowFlowModal] = useState<boolean>(false);
  const [flowToBeEdited, setFlowToBeEdited] = useState<Flow>(null);

  function addCircle(
    icon: React.ComponentType<SvgIconProps>,
    deviceType: DeviceType,
    key: string
  ) {
    let newCircle = {
      key: key,
      x: Math.floor(Math.random() * (maxRight - maxLeft + 1) + maxLeft),
      y: Math.floor(Math.random() * (maxBottom - maxTop + 1) + maxTop),
      r: circleR,
      color: generateRandomColor(),
      icon: icon,
      deviceType: deviceType,
    };

    if (deviceType === DeviceType.TrafficGenerator) {
      setTrafficGenerators([...trafficGenerators, newCircle]);
    }
    setCircles([...circles, newCircle]);
  }

  function editCircle(draggedCircle: Circle) {
    setCircles(
      circles.map((circle) =>
        circle.key === draggedCircle.key
          ? { ...circle, x: draggedCircle.x, y: draggedCircle.y }
          : circle
      )
    );
  }

  function addFlow(newFlow: Flow) {
    if (newFlow.id) {
      setFlows(flows.map((flow) => flow.id === newFlow.id ? newFlow : flow));
    } else {
      let id = flows.length + 1;
      setFlows([
        ...flows,
        {
          ...newFlow,
          id: id,
        },
      ]);
    }
  }

  function showEditModal(flow: Flow) {
    setFlowToBeEdited(flow);
    setShowFlowModal(true);
  }

  function handleCloseModal() {
    setFlowToBeEdited(null);
    setShowFlowModal(false);
  }

  return (
    <main className="font-sans antialiased">
      <div className="bg-gray-100 min-h-screen mx-auto flex max-w-8xl px-4 sm:px-6 lg:px-8">
        <SimulatorToolbar addCircle={addCircle} />
        <Simulation
          _circles={circles}
          _trafficGeneratorArray={trafficGenerators}
          _editCircle={editCircle}
          _addFlow={addFlow}
          _flowToBeEdited={flowToBeEdited}
          _editFlow={showFlowModal}
          _closeModal={handleCloseModal}
        ></Simulation>
        <PopoverComponent
          flows={flows}
          editFlow={showEditModal}
          showPopover={flows.length > 0}
        ></PopoverComponent>
      </div>
    </main>
  );
}
