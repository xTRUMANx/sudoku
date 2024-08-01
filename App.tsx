import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, TextInput, View } from "react-native";
import { CellValue, useSudokuStore } from "./store";
import { gridSize } from "./constants";

export default function App() {
  return (
    <View style={styles.container}>
      <Grid />
      <StatusBar style="auto" />
    </View>
  );
}

function Grid() {
  const solve = useSudokuStore(state => state.solve);

  return (
    <View style={{ flexDirection: "column" }}>
      {Array.from({ length: gridSize }).map((_, row) => (
        <Row key={`r${row}`} row={row} />
      ))}
      <Button onPress={solve} title="Solve!" />
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
  const cellValue = useSudokuStore((state) => state.getCellValue(row, col));
  const setCellValue = useSudokuStore((state) => state.setCellValue);

  const onChangeText = (val: string) => {
    const newCellValue: CellValue = { value: val, readOnly: false };
    setCellValue(row, col, newCellValue);
  };

  const thickedTargetBorderWidths = (rowOrCol: number, targets: string) =>
    targets.split("").includes((rowOrCol + 1).toString())
      ? extraBorderWidth
      : standardBorderWidth;

  return (
    <TextInput
      value={cellValue.value}
      keyboardType="number-pad"
      onChangeText={onChangeText}
      readOnly={cellValue.readOnly}
      style={{
        ...styles.cell,
        fontWeight: cellValue.readOnly ? "bold" : "normal",
        color: cellValue.value.length == 1 ? "black" : "blue",
        borderTopWidth: thickedTargetBorderWidths(row, "1"),
        borderLeftWidth: thickedTargetBorderWidths(col, "1"),
        borderRightWidth: thickedTargetBorderWidths(col, "369"),
        borderBottomWidth: thickedTargetBorderWidths(row, "369"),
      }}
      maxLength={3}
    />
  );
}

const cellSize = 42;
const fontSize = 24;
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
    fontSize: fontSize,
  },
});
