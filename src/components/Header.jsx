import React from "react";
import { FaPause, FaPlay } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { changeStatus } from "../store/actions";

function Header() {
  const gameStatus = useSelector((state) => state.gameStatus);
  const dispatch = useDispatch();
  return (
    <header>
      <h1>Sudoku Game</h1>
      <div className="pause">
        {gameStatus === "play" ? (
          <FaPause
            size={25}
            cursor={"pointer"}
            onClick={
              gameStatus === "play" || gameStatus === "pause"
                ? () => dispatch(changeStatus("pause"))
                : () => {}
            }
          />
        ) : (
          <FaPlay
            cursor={"pointer"}
            size={25}
            onClick={
              gameStatus === "play" || gameStatus === "pause"
                ? () => dispatch(changeStatus("play"))
                : () => {}
            }
          />
        )}
        <span>{gameStatus === "play" ? "Pause" : "Play"}</span>
      </div>
    </header>
  );
}

export default Header;
