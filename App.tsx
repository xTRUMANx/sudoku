import { StatusBar } from "expo-status-bar";
import { StyleSheet, TextInput, View } from "react-native";
import { CellValue, getIndex, useSudokuStore } from "./store";

export default function App() {
  return (
    <View style={styles.container}>
      <Grid />
      <StatusBar style="auto" />
    </View>
  );
}

function Grid() {
  return (
    <View style={{ flexDirection: "column" }}>
      {Array.from({ length: gridSize }).map((_, row) => (
        <Row key={`r${row}`} row={row} />
      ))}
    </View>
  );
}

function Row({ row }: { row: number }) {
  return (
    <View style={{ flexDirection: "row" }}>
      {Array.from({ length: gridSize }).map((_, col) => (
        <Cell key={`r${row}c${col}`} row={row} col={col} />
      ))}
    </View>
  );
}

function Cell({ row, col }: { row: number; col: number }) {
  const cellValue = useSudokuStore((state) => state.gridValues[getIndex(row, col)])
  const setCellValue = useSudokuStore((state) => state.setCellValue)

  const onChangeText = (val: string) => {
    const newCellValue: CellValue = {value: val, readOnly: false};
    setCellValue(row, col, newCellValue);
  };

  return (
    <TextInput
      value={cellValue.value}
      onChangeText={onChangeText}
      readOnly={cellValue.readOnly}
      style={{
        ...styles.cell,
        fontWeight: cellValue.readOnly ? "bold" : "normal",
        color: cellValue.value.length == 1 ? "black" : "blue",
        borderRightWidth: "36".split("").includes((col + 1).toString())
          ? extraBorderWidth
          : standardBorderWidth,
        borderBottomWidth: "36".split("").includes((row + 1).toString())
          ? extraBorderWidth
          : standardBorderWidth,
      }}
      maxLength={3}
    />
  );
}

const gridSize = 9;
const cellSize = 50;
const standardBorderWidth = 1;
const extraBorderWidth = 3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  cell: {
    borderWidth: standardBorderWidth,
    width: cellSize,
    height: cellSize,
    textAlign: "center",
    fontSize: 24,
  },
});
