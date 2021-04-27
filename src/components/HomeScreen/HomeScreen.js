import { CONNECT, ROOM } from "../../constant";
import { useGameState } from "../../state/context";
import { path } from "../../firebase";

import "./style.css";

export const HomeScreen = () => {
  const [state, dispatch] = useGameState();
  return (
    <>
      <h1>
        <span className="title">Пятнашки</span> <span className="title">Online</span>
        {state?.message && <span className="title">{state.message}</span>}
      </h1>
      <div className="buttons">
        <button onClick={() => dispatch({ type: CONNECT })}>
          Создать комнату
        </button>
        <button
          onClick={() => {
            const id = prompt("Введите ключ комнаты");
            if (id) {
              path.child(id).once("value", (snapshot) => {
                const result = snapshot.val();
                if (!result) {
                  alert("Такой комнаты нет");
                  return;
                }
                dispatch({ type: ROOM, payload: id });
                dispatch({ type: CONNECT });
              });
            }
          }}
        >
          Подключиться к комнате
        </button>
      </div>
    </>
  );
};
