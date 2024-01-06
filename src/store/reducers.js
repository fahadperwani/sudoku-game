import { countRemainings } from "../utils";
import {
  SET_BOARD,
  CHANGE_CURRENT,
  WRITE_ON_BOARD,
  CHANGE_STATUS,
  SET_DIFFICULTY,
} from "./actions";

const globalState = {
  initial: Array.from({ length: 9 }, () => Array(9).fill(0)),
  board: Array.from({ length: 9 }, () => Array(9).fill(0)),
  current: null,
  result: null,
  gameStatus: "play",
  chances: 3,
  difficulty: "easy",
  counts: { 1: 10, 2: 10, 3: 10, 4: 10, 5: 10, 6: 10, 7: 10, 8: 10, 9: 10 },
};

const gameReducer = (state = globalState, action) => {
  if (state.gameStatus !== "play" && action.type !== CHANGE_STATUS)
    return state;
  switch (action.type) {
    case SET_BOARD:
      return {
        ...state,
        initial: action.payload[0],
        board: action.payload[0].slice().map((arr) => arr.slice()),
        result: action.payload[1],
        counts: countRemainings(action.payload[0], 1, 2, 3, 4, 5, 6, 7, 8, 9),
      };
    case CHANGE_CURRENT:
      if (state.current && state.current.element)
        state.current.element.classList.remove("active");
      action.payload.element.classList.add("active");
      return {
        ...state,
        current: action.payload,
      };
    case WRITE_ON_BOARD:
      state.current.element.innerText = action.payload;
      let chances = state.chances;
      let gameStatus = state.gameStatus;
      let board = state.board;
      if (state.result[state.current.ri][state.current.ci] != action.payload) {
        state.current.element.classList.add("wrong");
        chances--;
        if (chances == 0) gameStatus = "Game Over";
      } else {
        state.current.element.classList.remove("wrong");
        board[state.current.ri][state.current.ci] = action.payload;

        if (countRemainings(board, 0)[0] == 9) gameStatus = "Game Won";
      }
      return {
        ...state,
        board,
        chances,
        gameStatus,
        counts: countRemainings(board, 1, 2, 3, 4, 5, 6, 7, 8, 9),
      };
    // case WRITE_ON_BOARD:
    //   state.current.element.innerText = action.payload;
    //   if (state.result[state.current.ri][state.current.ci] != action.payload) {
    //     state.current.element.classList.add("wrong");
    //     if (state.chances == 1) {
    //       return {
    //         ...state,
    //         chances: 0,
    //         gameStatus: "Game Over",
    //         counts: countRemainings(
    //           action.payload[0],
    //           1,
    //           2,
    //           3,
    //           4,
    //           5,
    //           6,
    //           7,
    //           8,
    //           9
    //         ),
    //       };
    //     }
    //     return {
    //       ...state,
    //       chances: state.chances - 1,
    //       counts: countRemainings(action.payload[0], 1, 2, 3, 4, 5, 6, 7, 8, 9),
    //     };
    //   } else {
    //     state.current.element.classList.remove("wrong");
    //   }
    //   return {
    //     ...state,
    //     counts: countRemainings(action.payload[0], 1, 2, 3, 4, 5, 6, 7, 8, 9),
    //   };
    case CHANGE_STATUS:
      return {
        ...state,
        gameStatus: action.payload,
      };
    case SET_DIFFICULTY:
      return {
        ...state,
        difficulty: action.payload,
      };
  }
  return state;
};

export default gameReducer;
