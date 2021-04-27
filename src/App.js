import { useState, useEffect, useRef } from "react";
import { Cell } from "./components/Cell/Cell";
import { useGameState } from "./state/context";
import { HomeScreen } from "./components/HomeScreen/HomeScreen";

import { path } from "./firebase";

import "./App.css";
import { useConnect } from "./hooks/useConnect";
import { useUserWatch } from "./hooks/useUserWatch";
import { KeyRoomCodeScreen } from "./components/KeyRoomCodeScreen/KeyRoomCodeScreen";

const App = () => {
  const [table, setTable] = useState([]);
  const [enemyTable, setEnemyTable] = useState([]);
  const [state] = useGameState();
  const refEnemyTable = useRef(null);
  const refMyTable = useRef(null);

  useConnect(setTable, setEnemyTable);

  useUserWatch(setTable, setEnemyTable, refEnemyTable);

  useEffect(() => {
    if (state.connect && state.room) {
      path.child(state.room).onDisconnect().update({
        table: false,
        player1: false,
        player2: false,
      });
    }
  }, [state.connect, state.room]);

  if (!state.connect) {
    return <HomeScreen />;
  }

  if (!enemyTable.length) {
    return <KeyRoomCodeScreen />;
  }

  return (
    <div className="gameFury">
      <div className="table" ref={refMyTable}>
        {table.map((cell) => (
          <Cell
            refTable={refMyTable}
            handleTable={setTable}
            setEnemyTable={setEnemyTable}
            table={table}
            number={cell}
          />
        ))}
      </div>
      <div className="table enemy" ref={refEnemyTable}>
        {enemyTable.length && enemyTable.map((cell) => (
          <Cell
            refTable={refEnemyTable}
            handleTable={() => {}}
            table={enemyTable}
            number={cell}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
