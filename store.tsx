import { produce } from "immer";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface CellValue {
  value: string;
  readOnly: boolean;
}
function createGrid() {
  const newGrid: CellValue[] = Array.from({ length: 81 });
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      newGrid[row * 9 + col] = {
        value: `${row + 1}${col + 1}`,
        readOnly: row % 3 == 0 && col % 3 == 0,
      };
    }
  }
  return newGrid;
}

interface SudokuState {
  gridValues: CellValue[];
  getCellValue: (row: number, col: number) => CellValue;
  setCellValue: (row: number, col: number, value: CellValue) => void;
}

const getIndex = (row: number, col: number) => row * 9 + col;

export const useSudokuStore = create<SudokuState>()(
  devtools((set, get) => ({
    gridValues: createGrid(),
    getCellValue: (row, col) => get().gridValues[getIndex(row, col)],
    setCellValue: (row, col, cellValue) => {
      set(
        produce<SudokuState>((state) => {
          state.gridValues[getIndex(row, col)] = cellValue;
        })
      );
    },
  }))
);
