export const WRITE_ON_BOARD = "WRITE_ON_BOARD";
export const SET_BOARD = "SET_BOARD";
export const SET_DIFFICULTY = "SET_DIFFICULTY";
export const CHANGE_CURRENT = "CHANGE_CURRENT";
export const CHANGE_STATUS = "CHANGE_STATUS";

export const setBoard = (board, result) => ({
  type: SET_BOARD,
  payload: [board, result],
});

export const writeOnBoard = (val) => ({
  type: WRITE_ON_BOARD,
  payload: val,
});

export const changeCurrent = (element, ri, ci) => ({
  type: CHANGE_CURRENT,
  payload: { element, ri, ci },
});

export const changeStatus = (status) => ({
  type: CHANGE_STATUS,
  payload: status,
});

export const setDifficulty = (difficulty) => ({
  type: SET_DIFFICULTY,
  payload: difficulty,
});
