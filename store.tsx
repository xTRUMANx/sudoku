import { produce } from "immer";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { gridSize } from "./constants";
import { solver } from "./solver";

export interface CellValue {
  value: string;
  readOnly: boolean;
}

function createGrid() {
  const newGrid: CellValue[] = Array.from({ length: 81 });
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      newGrid[row * 9 + col] = {
        value: (((row + col) % 9) + 1).toString(),
        readOnly: row % 3 == 0 && col % 3 == 0,
      };
    }
  }
  return newGrid;
}

export interface SudokuState {
  gridValues: CellValue[];
  getCellValue: (row: number, col: number) => CellValue;
  setCellValue: (row: number, col: number, value: CellValue) => void;
  solve: () => void;
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
    solve: solver,
  }))
);
