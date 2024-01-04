import React from "react";

function Buttons({ writeOnBoard }) {
  return (
    <div className="buttons">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((val, i) => (
        <div className="btn">
          <button onClick={() => writeOnBoard(val)}>{val}</button>
          <span className="remaining">{val}</span>
        </div>
      ))}
    </div>
  );
}

export default Buttons;
