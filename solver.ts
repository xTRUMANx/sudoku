import { gridSize } from "./constants";
import { SudokuState, useSudokuStore } from "./store";

export const solver = () => {
  const state = useSudokuStore.getState();

  fillEmptySpaces(state);
};

// for each row, if there is an empty cell, fill it!
function fillEmptySpaces(state: SudokuState) {
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      if (!state.getCellValue(row, col).value) {
        state.setCellValue(row, col, { value: "X", readOnly: false });
      }
    }
  }
}
