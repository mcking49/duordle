import { createContext, useContext, useMemo, useState } from "react";
import { WORD_LIST } from "../lib/words";
import { KeyboardKey } from "../models";

type GameRowState = (KeyboardKey | "")[];

export interface GameState {
  board: (KeyboardKey | "")[];
  currentGuessRow: number;
  currentGuessIndex: number;
  onClickKey: (key: KeyboardKey) => void;
}

const defaultState: GameState = {
  board: [],
  currentGuessRow: 1,
  currentGuessIndex: 0,
  // eslint-disable-next-line
  onClickKey: (_key: KeyboardKey) => {},
};

const GameStateContext = createContext<GameState>(defaultState);

export const useGameState = () => useContext(GameStateContext);

const GameStateProvider: React.FC = (props) => {
  const [guess0, setGuess0] = useState<GameRowState>(["", "", "", "", ""]);
  const [guess1, setGuess1] = useState<GameRowState>(["", "", "", "", ""]);
  const [guess2, setGuess2] = useState<GameRowState>(["", "", "", "", ""]);
  const [guess3, setGuess3] = useState<GameRowState>(["", "", "", "", ""]);
  const [guess4, setGuess4] = useState<GameRowState>(["", "", "", "", ""]);
  const [guess5, setGuess5] = useState<GameRowState>(["", "", "", "", ""]);
  const [currentGuessRow, setCurrentGuessRow] = useState<number>(0);
  const [currentGuessIndex, setCurrentGuessIndex] = useState<number>(0);

  const [answer] = useState<string>(() => {
    let a = localStorage.getItem("answer");

    if (!a) {
      a = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)].toUpperCase();
      localStorage.setItem("answer", a);
    }

    return a;
  });

  const isLastIndex = currentGuessIndex === 4;

  const board = [
    ...guess0,
    ...guess1,
    ...guess2,
    ...guess3,
    ...guess4,
    ...guess5,
  ];

  const boardRows: [GameRowState, React.Dispatch<React.SetStateAction<GameRowState>>][] = [
    [guess0, setGuess0],
    [guess1, setGuess1],
    [guess2, setGuess2],
    [guess3, setGuess3],
    [guess4, setGuess4],
    [guess5, setGuess5],
  ];

  const currentRowFull = useMemo(() => {
    const [row] = boardRows[currentGuessRow];
    const isFull = row.findIndex(val => val === "") === -1;
    return isFull;
  }, [boardRows, currentGuessRow]);

  console.log(currentRowFull);


  const onClickKey = (key: KeyboardKey) => {
    const [row, setRow] = boardRows[currentGuessRow];
    const newState = [...row];

    if (key === "ENTER") {
      if (currentRowFull) {
        console.log("enter logic");
      } else {
        setCurrentGuessIndex(0);
        setRow(["", "", "", "", ""]);
      }
    } else if (key === "DELETE") {
      if (currentGuessIndex === 0 && row[currentGuessIndex] === "") {
        return;
      }

      if (isLastIndex && row[currentGuessIndex] !== "") {
        newState[currentGuessIndex] = "";
        setRow(newState);
      } else {
        const prevIndex = Math.max(currentGuessIndex - 1, 0);
        newState[prevIndex] = "";
        setRow(newState);
        setCurrentGuessIndex(prevIndex);
      }
    } else {
      if (row[currentGuessIndex] !== "") {
        return;
      }

      newState[currentGuessIndex] = key;
      setRow(newState);
      setCurrentGuessIndex(prev => {
        if (prev === 4) {
          return prev;
        } else {
          return prev + 1;
        }
      });
    }
  };

  const value: GameState = {
    board,
    currentGuessRow,
    currentGuessIndex,
    onClickKey,
  };

  console.log({currentGuessIndex, guess0, answer});

  return (
    <GameStateContext.Provider value={value}>
      {props.children}
    </GameStateContext.Provider>
  );
};

export default GameStateProvider;
