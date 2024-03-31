"use client";
import { useState } from "react";
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
} from "./constants/min-max-values";

export default function Home() {
  const [circles, setCircles] = useState<Circle[]>([]);

  function addCircle(icon: React.ComponentType<SvgIconProps>) {
    setCircles([
      ...circles,
      {
        key: circles.length + 1,
        x: Math.floor(Math.random() * (maxRight - maxLeft + 1) + maxLeft),
        y: Math.floor(Math.random() * (maxBottom - maxTop + 1) + maxTop),
        r: 50,
        color: "#" + generateRandomColor(),
        icon: icon,
      },
    ]);
  }

  return (
    <main className="bg-white flex min-h-screen flex-col items-center justify-between text-black">
      <div className="grid grid-cols-12 w-full">
        <div className="col-span-2">
          <SimulatorToolbar addCircle={addCircle} />
        </div>
        <div className="col-span-10 bg-gray-100">
          <Simulation _circles={circles}></Simulation>
        </div>
      </div>
    </main>
  );
}
