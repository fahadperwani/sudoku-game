import React, { useEffect } from "react";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import {
  changeCurrent,
  setBoard,
  writeOnBoard,
  setDifficulty,
} from "../store/actions";
import { isNumeric } from "../utils";

function Board() {
  const dispatch = useDispatch();
  const initial = useSelector((state) => state.initial);
  const chances = useSelector((state) => state.chances);
  const current = useSelector((state) => state.current);
  const board = useSelector((state) => state.board);

  const handleKey = (e) => {
    if (isNumeric(e.key) && e.key !== "0") {
      dispatch(writeOnBoard(e.key));
    }
  };

  useEffect(() => {
    fetch("https://sudoku-api.vercel.app/api/dosuku")
      .then((res) => res.json())
      .then((data) => {
        dispatch(setDifficulty(data.newboard.grids[0].difficulty));
        dispatch(
          setBoard(
            data.newboard.grids[0].value,
            data.newboard.grids[0].solution
          )
        );
      });
  }, []);
  return (
    <div className="board">
      <div className="chances">
        <span>{`Chances left : ${chances}`}</span>
      </div>
      <table id="board">
        {initial.length != 0 &&
          [1, 2, 3, 4, 5, 6, 7, 8, 9].map((row, ri) => (
            <tr>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((col, ci) => {
                const isWritten = initial[ri][ci] == 0;
                return (
                  <td
                    style={{
                      borderRight:
                        col % 3 == 0 && col != 9 ? "6px solid black" : "",
                      borderBottom:
                        row % 3 == 0 && row != 9 ? "6px solid black" : "",
                      backgroundColor: initial
                        ? isWritten
                          ? ""
                          : "hsl(201.75deg 93.02% 83.14%)"
                        : "",
                      cursor: !isWritten ? "not-allowed" : "pointer",
                    }}
                    onClick={
                      isWritten
                        ? (e) => dispatch(changeCurrent(e.target, ri, ci))
                        : () => {}
                    }
                    tabIndex={"0"}
                    onKeyDown={handleKey}
                  >
                    {isWritten && initial[ri][ci] == "0" ? "" : initial[ri][ci]}
                  </td>
                );
              })}
            </tr>
          ))}
      </table>
    </div>
  );
}

export default Board;
