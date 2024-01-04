import React, { useEffect, useState } from "react";
import "../App.css";
import Buttons from "./Buttons";

function Board() {
  const [board, setBoard] = useState([]);
  const [result, setResult] = useState([]);
  const [difficulty, setDifficulty] = useState("easy");
  const [current, setCurrent] = useState({});

  const writeOnBoard = (val) => {
    if (result[current.ri][current.ci] != val) {
      //   console.log(current[ri][ci]);
      //   current.element.style.borderColor = "red";
      current.element.innerText = val;
      current.element.classList.add("wrong");
      //   current.element.style.color = "red";
      //   setTimeout(() => (current.element.style.borderColor = "black"), 200);
    } else {
      current.element.classList.remove("wrong");
      current.element.innerText = val;
    }
  };

  const handleClick = (e, ri, ci) => {
    if (current && current.element) current.element.classList.remove("active");
    e.target.classList.add("active");
    setCurrent({ element: e.target, ri, ci });
  };

  useEffect(() => {
    fetch("https://sudoku-api.vercel.app/api/dosuku")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.newboard.grids[0].value);
        setBoard(data.newboard.grids[0].value);
        setResult(data.newboard.grids[0].solution);
        setDifficulty(data.newboard.grids[0].difficulty);
        console.log("Board: " + board[0]);
        console.log("Result: " + result[0]);
      });
  }, []);
  return (
    <>
      <table id="board">
        {board.length != 0 &&
          [1, 2, 3, 4, 5, 6, 7, 8, 9].map((row, ri) => (
            <tr>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((col, ci) => {
                const isWritten = board[ri][ci] == 0;
                return (
                  <td
                    style={{
                      borderRight:
                        col % 3 == 0 && col != 9 ? "6px solid black" : "",
                      borderBottom:
                        row % 3 == 0 && row != 9 ? "6px solid black" : "",
                      backgroundColor: board
                        ? isWritten
                          ? ""
                          : "hsl(201.75deg 93.02% 83.14%)"
                        : "",
                      cursor: !isWritten ? "not-allowed" : "pointer",
                    }}
                    onClick={
                      isWritten ? (e) => handleClick(e, ri, ci) : () => {}
                    }
                  >
                    {isWritten && board[ri][ci] == "0" ? "" : board[ri][ci]}
                  </td>
                );
              })}
            </tr>
          ))}
      </table>
      <Buttons writeOnBoard={writeOnBoard} />
    </>
  );
}

export default Board;
