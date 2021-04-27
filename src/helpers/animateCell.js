import { cellCanTrun } from "./callTurnCell";
import { TABLE_WIDTH, CELL_WEIGHT } from "../constant";

export async function animateCell(target, table, number) {
  if (!target) {
    return table
  }
  const newTable = [...table],
    indexNumber = newTable.indexOf(number),
    indexNull = newTable.indexOf(0),
    availableTurn = cellCanTrun(indexNull);
  if (availableTurn.includes(indexNumber)) {
    newTable[indexNumber] = 0;
    newTable[indexNull] = number;
  }
  const newIndex = newTable.indexOf(number),
    prevIndex = table.indexOf(number),
    difX = (newIndex % TABLE_WIDTH) - (prevIndex % TABLE_WIDTH),
    difY =
      Math.floor(newIndex / TABLE_WIDTH) - Math.floor(prevIndex / TABLE_WIDTH);

  target.style.transform = `translate(${CELL_WEIGHT * difX}px, ${CELL_WEIGHT * difY}px)`;

  await new Promise((resolve) => setTimeout(resolve, 150));

  target.style.transform = "";

  return newTable;
}
