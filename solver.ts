import { gridSize, validValues } from "./constants";
import { SudokuState, useSudokuStore } from "./store";

const strategies: ((state: SudokuState) => void)[] = [
  fillLastRowValue,
  fillLastColumnValue,
];

export const solver = () => {
  const state = useSudokuStore.getState();

  strategies.forEach((strat) => strat(state));
};

function fillLastRowValue(state: SudokuState) {
  for (let row = 0; row < gridSize; row++) {
    var values = Array.from({ length: 9 }).map(
      (_, col) => state.getCellValue(row, col).value
    );

    const result = getMissingValue(values);

    if (!result) continue;

    const { index: col, value } = result;

    state.setCellValue(row, col, { value: value, readOnly: false });
  }
}

function fillLastColumnValue(state: SudokuState) {
  for (let col = 0; col < gridSize; col++) {
    var values = Array.from({ length: 9 }).map(
      (_, row) => state.getCellValue(row, col).value
    );

    const result = getMissingValue(values);

    if (!result) continue;

    const { index: row, value } = result;

    state.setCellValue(row, col, { value: value, readOnly: false });
  }
}

interface MissingValue {
  index: number;
  value: string;
}

const getMissingValue: (values: string[]) => MissingValue | null = (values) => {
  const valuesSet = new Set(values);

  if (!valuesSet.has("")) {
    console.log("No missing value.");
    return null;
  }

  // Check for duplicates
  if (valuesSet.size != 9) {
    console.log(`Not all values are unique`);
    return null;
  }

  var index = values.findIndex((v) => v === "");
  var missingValues = validValues.difference(valuesSet);
  var value = [...missingValues.values()][0];

  return { index, value };
};
