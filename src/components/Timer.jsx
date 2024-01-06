import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Timer() {
  const [time, setTime] = useState({ minutes: 0, seconds: 0 });
  const gameStatus = useSelector((state) => state.gameStatus);

  useEffect(() => {
    let intervalId;

    if (gameStatus === "play") {
      intervalId = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime.seconds === 59) {
            return { minutes: prevTime.minutes + 1, seconds: 0 };
          }

          return { ...prevTime, seconds: prevTime.seconds + 1 };
        });
      }, 1000);
    }

    // Cleanup the interval when the component unmounts or when the gameStatus changes to something other than "play"
    return () => clearInterval(intervalId);
  }, [gameStatus]);

  const displayTime = () => {
    return `${time.minutes < 10 ? "0" : ""}${time.minutes}:${
      time.seconds < 10 ? "0" : ""
    }${time.seconds}`;
  };

  return (
    <>
      <p>{displayTime()}</p>
    </>
  );
}

export default Timer;
