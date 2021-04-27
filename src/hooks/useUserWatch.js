import { useEffect } from "react";
import { DISCONNECT } from "../constant";

import { path } from "../firebase";

import { animateCell } from "../helpers/animateCell";
import { playerIS } from "../helpers/player";
import { shuffle } from "../helpers/shuffle";
import { playerWin } from "../helpers/playerWin";

import { useGameState } from "../state/context";

export const useUserWatch = (setTable, setEnemyTable, refEnemyTable) => {
  const [state, dispatch] = useGameState();

  useEffect(() => {
    if (
      state.room &&
      (state.player1 || state.player2)
    ) {
      path.child(state.room).update({
        [playerIS(state)]: true,
      });
      path
        .child(state.room)
        .child(state.player1 ? "player2" : "player1")
        .on("value", async (snapshot) => {
          const { table, number } = snapshot.val();
          if (table && refEnemyTable.current) {
            const elementCell =
              refEnemyTable.current.children[table.indexOf(number)];
            await animateCell(elementCell, table, number);
            setEnemyTable(table);
            if (playerWin(table)) {
              dispatch({
                type: DISCONNECT,
                payload: { message: "Противник победил!" },
              });
              setTable([]);
              setEnemyTable([]);
            }
          }
        });

      if (state.player2) {
        path.child(state.room).update({
          table: shuffle(),
        });
      }
    }
  }, [dispatch, refEnemyTable, setEnemyTable, setTable, state.player1, state.player2]);
};
