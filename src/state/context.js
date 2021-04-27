import React, { useContext, useReducer } from "react";
import {
  CONNECT,
  SET_PLAYER,
  DISCONNECT,
  ROOM,
  GAME_STATUS,
} from "../constant";

const initialState = {
  connect: false,
  player1: false,
  player2: false,
  room: undefined,
  gameStatus: "PENDING",
};

export const GameContext = React.createContext();

export const useGameState = () => {
  return useContext(GameContext);
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case CONNECT:
      return Object.assign({}, state, { connect: true });
    case SET_PLAYER:
      return Object.assign({}, state, {
        player1: payload.player1 === false,
        player2: payload.player1 && payload.player2 === false,
      });
    case DISCONNECT:
      return Object.assign({}, state, {
        player1: false,
        player2: false,
        connect: false,
        room: undefined,
        gameStatus: 'PENDING',
        message: payload.message,
      });
    case GAME_STATUS:
      return Object.assign({}, state, { gameStatus: payload });
    case ROOM:
      return Object.assign({}, state, {
        room: payload,
      });
    default:
      return state;
  }
};

export const WrapperGameContext = ({ children }) => {
  const state = useReducer(reducer, initialState);
  return <GameContext.Provider value={state}>{children}</GameContext.Provider>;
};
