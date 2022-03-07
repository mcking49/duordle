import { createContext, useContext } from "react";
import { useBoardState } from "../hooks/useBoardState";
import { KeyboardKey } from "../models";

export interface GameState {
  onClickKey: (key: KeyboardKey) => void;
}

const defaultGameState: GameState = {
  onClickKey: (_key: KeyboardKey) => null,
};

const GameStateContext = createContext<GameState>(defaultGameState);

export const useGameState = () => useContext(GameStateContext);

const GameStateProvider: React.FC = (props) => {
  const board0 = useBoardState(0);
  const board1 = useBoardState(1);

  const onClickKey = (key: KeyboardKey) => {
    board0.onClickKey(key);
    board1.onClickKey(key);
  };

  const value: GameState = {
    onClickKey,
  };

  return (
    <GameStateContext.Provider value={value}>
      {props.children}
    </GameStateContext.Provider>
  );
};

export default GameStateProvider;
