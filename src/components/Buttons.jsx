import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { writeOnBoard } from "../store/actions";

function Buttons() {
  const gameStatus = useSelector((state) => state.gameStatus);
  const dispatch = useDispatch();
  const counts = useSelector((state) => state.counts);
  return (
    <div className="buttons">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((val, i) => (
        <div className="btn">
          <button
            disabled={gameStatus !== "play" && gameStatus !== "pause"}
            onClick={() => dispatch(writeOnBoard(val))}
          >
            {val}
          </button>
          <span className="remaining">{counts[val]}</span>
        </div>
      ))}
    </div>
  );
}

export default Buttons;
