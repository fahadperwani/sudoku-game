import React from "react";
import { IoMdStopwatch, IoMdGrid } from "react-icons/io";
import { MdOutlineWifiOff } from "react-icons/md";
import Buttons from "./Buttons";
import Timer from "./Timer";
import { useSelector } from "react-redux";

function Menu() {
  const difficulty = useSelector((state) => state.difficulty);
  return (
    <div className="menu">
      <div className="heading">
        <IoMdStopwatch size={20} />
        <h3>Time</h3>
      </div>
      <div className="block timer">
        <Timer />
      </div>
      <div className="heading">
        <MdOutlineWifiOff size={20} />
        <h3>Game Difficulty</h3>
      </div>
      <div className="block">{difficulty}</div>
      <div className="heading">
        <IoMdGrid size={20} />
        <h3>Remaining Numbers</h3>
      </div>
      <Buttons />
    </div>
  );
}

export default Menu;
