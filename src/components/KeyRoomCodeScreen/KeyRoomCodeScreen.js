import { useRef, useState } from "react";
import scissors from "../../assets/scissors.svg";
import { useGameState } from "../../state/context";

import "./style.css";

export const KeyRoomCodeScreen = () => {
  const [state] = useGameState();
  const [notify, setNotify] = useState("");
  const ref = useRef(null);

  const selectInput = () => {
    if (ref.current) {
      ref.current.select();
    }
  };

  const copyKey = () => {
    if (!navigator.clipboard) {
      alert("Функция не поддерживается вашим устройством");
      return;
    }

    navigator.clipboard
      .writeText(state.room)
      .then(() => {
        setNotify("success");
      })
      .catch(() => {
        setNotify("error");
      })
      .finally(() => {
        setTimeout(() => setNotify(""), 2000);
      });
  };
  return (
    <div className="display-id">
      <div className={`notify ${notify === "success" && "success"}`}>
        Ключ скопирован
      </div>
      <div className={`notify ${notify === "error" && "error"}`}>Ошибка при копировании</div>
      <svg>
        <rect></rect>
      </svg>
      <div className="scissors">
        <img src={scissors} alt="НОЖНИЦА РЕЖУЦА!" />
      </div>
      <div className="head">Ключ комнаты:</div>
      <input
        className="input"
        type="text"
        readOnly
        value={state.room ?? "Создаю ключ..."}
        onClick={selectInput}
        ref={ref}
      />
      <button
        className="button"
        type="button"
        onClick={copyKey}
        disabled={!state.room}
      >
        Копировать ключ
      </button>
      <div className="note">
        Отправь другу для игры с ним...
        <br /> и жди пока подключится
      </div>
    </div>
  );
};
