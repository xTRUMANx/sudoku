import { produce } from "immer";
import { create } from "zustand";

export interface CellValue {
  value: string;
  readOnly: boolean;
}

const gridValues: CellValue[] = Array.from({ length: 81 });
for (let row = 0; row < 9; row++) {
  for (let col = 0; col < 9; col++) {
    gridValues[row * 9 + col] = {
      value: `${row + 1}${col + 1}`,
      readOnly: row % 3 == 0 && col % 3 == 0,
    };
  }
}

interface SudokuState {
  gridValues: CellValue[];
  setCellValue: (row: number, col: number, value: CellValue) => void;
}

export const getIndex = (row: number, col: number) => row * 9 + col;

export const useSudokuStore = create<SudokuState>((set) => ({
  gridValues: gridValues,
  setCellValue: (row, col, cellValue) => {
    set(
      produce<SudokuState>((state) => {
        state.gridValues[getIndex(row, col)] = cellValue;
      })
    );
  },
}));
