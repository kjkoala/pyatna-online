import React from "react";

import { path } from "../../firebase";
import { DISCONNECT } from "../../constant";
import { playerWin } from "../../helpers/playerWin";
import { useGameState } from "../../state/context";

import "./style.css";
import { playerIS } from "../../helpers/player";
import { animateCell } from "../../helpers/animateCell";

export const Cell = ({
  number,
  handleTable,
  table,
  refTable,
  setEnemyTable,
}) => {
  const [state, dispatch] = useGameState();
  const handeClick = async () => {
    if (!number) return;
    const elementCell = refTable.current.children[table.indexOf(number)];
    const newTable = await animateCell(elementCell, table, number);
    handleTable(newTable);
    path.child(state.room).update({
      [playerIS(state)]: {
        table: newTable,
        number,
      },
    });
    if (playerWin(newTable)) {
      dispatch({
        type: DISCONNECT,
        payload: { message: "Ты победил!" },
      });
      handleTable([]);
      setEnemyTable([]);
    }
  };
  return (
    <div
      style={{ "--i": number }}
      onClick={handeClick}
      className={number === 0 ? "null" : "cell"}
    >
      <span>{!!number && number}</span>
    </div>
  );
};
