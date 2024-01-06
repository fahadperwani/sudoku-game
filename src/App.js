import { useSelector } from "react-redux";
import "./App.css";
import Board from "./components/Board";
import Header from "./components/Header";
import Menu from "./components/Menu";

function App() {
  const gameStatus = useSelector((state) => state.gameStatus);
  return (
    <div className="App">
      {gameStatus !== "play" && gameStatus !== "pause" && (
        <div className="game-ended">{gameStatus}</div>
      )}
      <Header />
      <main>
        <Board />
        <Menu />
      </main>
    </div>
  );
}

export default App;
