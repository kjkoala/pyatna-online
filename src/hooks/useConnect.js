import { useEffect } from "react";
import { path } from "../firebase";
import { useGameState } from "../state/context";
import { ROOM, SET_PLAYER, DISCONNECT } from "../constant";

export const useConnect = (setTable, setEnemyTable) => {
  const [state, dispatch] = useGameState();
  useEffect(() => {
    if (state.connect && !state.room) {
      path
        .push({
          player1: false,
          player2: false,
          table: 'CREATE',
        })
        .then((res) => {
          dispatch({ type: ROOM, payload: res.key });
        });
    }
  }, [dispatch, state.connect, state.room]);

  useEffect(() => {
    if (state.room) {
      path.child(state.room).once("value", (snapshot) => {
        let snap = snapshot.val();
        dispatch({
          type: SET_PLAYER,
          payload: {
            player1: snap.player1,
            player2: snap.player2,
          },
        });
      });

      path
        .child(state.room)
        .child("table")
        .on("value", (snapshot) => {
          const snap = snapshot.val();
          if (Array.isArray(snap)) {
            path
              .child(state.room)
              .update({
                player1: {
                  table: snap,
                },
                player2: {
                  table: snap,
                },
              })
            setTable(snap);
            setEnemyTable(snap);
          } else if (!snap) {
            dispatch({
              type: DISCONNECT,
              payload: { message: "Игрок отключился" },
            });
            setTable([]);
            setEnemyTable([]);
          }
        });
    }
  }, [state.room, dispatch, setTable, setEnemyTable, state.gameStatus]);
};
