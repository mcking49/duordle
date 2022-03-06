import { cloneDeep } from "lodash/fp";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useWordOfTheDay } from "../hooks/useWordOfTheDay";
import { VALID_GUESSES } from "../lib/validGuesses";
import { WORD_LIST } from "../lib/words";
import { KeyboardKey } from "../models";

export type GameRowState = (KeyboardKey | "")[];

export type RowGuessStatus = "INPROGRESS" | "COMPLETE" | "INCOMPLETE" | "INVALID" | "VALID" | "FINISHED";
export type LetterStatus = "CORRECT" | "INCORRECT" | "WRONG_PLACE" | "NULL";

export type GameStatus = "INPROGRESS" | "FINISHED";

export interface Letter {
  value: KeyboardKey | "";
  status: LetterStatus,
}

export interface BoardRow {
  row: Letter[];
  status: RowGuessStatus;
}

export interface GameState {
  board: GameRowState;
  boardState: BoardRow[];
  currentGuessRow: number;
  currentGuessIndex: number;
  gameStatus: GameStatus,
  onClickKey: (key: KeyboardKey) => void;
}

const defaultState: GameState = {
  board: [],
  boardState: [],
  currentGuessRow: 1,
  currentGuessIndex: 0,
  gameStatus: "INPROGRESS",
  // eslint-disable-next-line
  onClickKey: (_key: KeyboardKey) => {},
};

const GameStateContext = createContext<GameState>(defaultState);

export const useGameState = () => useContext(GameStateContext);

const GameStateProvider: React.FC = (props) => {
  const [guess0, setGuess0] = useState<BoardRow>({row: [{value: "", status: "NULL"}, {value: "", status: "NULL"}, {value: "", status: "NULL"}, {value: "", status: "NULL"}, {value: "", status: "NULL"}], status: "INPROGRESS"});
  const [guess1, setGuess1] = useState<BoardRow>({row: [{value: "", status: "NULL"}, {value: "", status: "NULL"}, {value: "", status: "NULL"}, {value: "", status: "NULL"}, {value: "", status: "NULL"}], status: "INCOMPLETE"});
  const [guess2, setGuess2] = useState<BoardRow>({row: [{value: "", status: "NULL"}, {value: "", status: "NULL"}, {value: "", status: "NULL"}, {value: "", status: "NULL"}, {value: "", status: "NULL"}], status: "INCOMPLETE"});
  const [guess3, setGuess3] = useState<BoardRow>({row: [{value: "", status: "NULL"}, {value: "", status: "NULL"}, {value: "", status: "NULL"}, {value: "", status: "NULL"}, {value: "", status: "NULL"}], status: "INCOMPLETE"});
  const [guess4, setGuess4] = useState<BoardRow>({row: [{value: "", status: "NULL"}, {value: "", status: "NULL"}, {value: "", status: "NULL"}, {value: "", status: "NULL"}, {value: "", status: "NULL"}], status: "INCOMPLETE"});
  const [guess5, setGuess5] = useState<BoardRow>({row: [{value: "", status: "NULL"}, {value: "", status: "NULL"}, {value: "", status: "NULL"}, {value: "", status: "NULL"}, {value: "", status: "NULL"}], status: "INCOMPLETE"});
  const [guess6, setGuess6] = useState<BoardRow>({row: [{value: "", status: "NULL"}, {value: "", status: "NULL"}, {value: "", status: "NULL"}, {value: "", status: "NULL"}, {value: "", status: "NULL"}], status: "INCOMPLETE"});
  const [currentGuessRow, setCurrentGuessRow] = useState<number>(0);
  const [currentGuessIndex, setCurrentGuessIndex] = useState<number>(0);
  const [gameStatus, setGameStatus] = useState<GameStatus>("INPROGRESS");

  const {answer, newWord, loadingWordOfTheDay, setNewWord} = useWordOfTheDay();

  const isLastIndex = currentGuessIndex === 4;
  const isLastRow = currentGuessRow === 6;

  const board = [
    ...guess0.row.map(letter => letter.value),
    ...guess1.row.map(letter => letter.value),
    ...guess2.row.map(letter => letter.value),
    ...guess3.row.map(letter => letter.value),
    ...guess4.row.map(letter => letter.value),
    ...guess5.row.map(letter => letter.value),
    ...guess6.row.map(letter => letter.value),
  ];

  const boardState = [
    guess0,
    guess1,
    guess2,
    guess3,
    guess4,
    guess5,
    guess6,
  ];

  const boardRows: [BoardRow, React.Dispatch<React.SetStateAction<BoardRow>>][] = [
    [guess0, setGuess0],
    [guess1, setGuess1],
    [guess2, setGuess2],
    [guess3, setGuess3],
    [guess4, setGuess4],
    [guess5, setGuess5],
    [guess6, setGuess6],
  ];

  // On app load, load the board state from storage
  useEffect(() => {
    if (!newWord && !loadingWordOfTheDay) {
      console.log("Restoring game board...");

      const storageBoardStateStr = localStorage.getItem("boardState");

      if (storageBoardStateStr) {
        const storedBoardState: BoardRow[] = JSON.parse(storageBoardStateStr);
        setGuess0(storedBoardState[0]);
        setGuess1(storedBoardState[1]);
        setGuess2(storedBoardState[2]);
        setGuess3(storedBoardState[3]);
        setGuess4(storedBoardState[4]);
        setGuess5(storedBoardState[5]);
        setGuess6(storedBoardState[6]);
      }

      const guessIndex = localStorage.getItem("currentGuessIndex");

      if (guessIndex) {
        setCurrentGuessIndex(Number(guessIndex));
      }

      const guessRowIndex = localStorage.getItem("currentGuessRow");

      if (guessRowIndex) {
        setCurrentGuessRow(Number(guessRowIndex));
      }

      const storageGameStatus = localStorage.getItem("gameStatus");

      if (storageGameStatus) {
        setGameStatus(storageGameStatus as GameStatus);
      }
    }
  }, [loadingWordOfTheDay]);

  // Save game state after each guess
  useEffect(() => {
    if (!loadingWordOfTheDay) {
      localStorage.setItem("boardState", JSON.stringify(boardState));
    }
  }, [guess0, guess1, guess2, guess3, guess4, guess5, guess6, loadingWordOfTheDay]);

  // Save game state after each guess
  useEffect(() => {
    if (!loadingWordOfTheDay) {
      localStorage.setItem("currentGuessIndex", currentGuessIndex.toString());
    }
  }, [currentGuessIndex, loadingWordOfTheDay]);

  // Save game state after each guess
  useEffect(() => {
    if (!loadingWordOfTheDay) {
      localStorage.setItem("currentGuessRow", currentGuessRow.toString());
    }
  }, [currentGuessRow, loadingWordOfTheDay]);

  // Save game state after each guess
  useEffect(() => {
    if (!loadingWordOfTheDay) {
      localStorage.setItem("gameStatus", gameStatus);
    }
  }, [gameStatus, loadingWordOfTheDay]);

  // Reset board if new word
  useEffect(() => {
    if (newWord) {
      resetBoard();
      setNewWord(false);
    }
  }, [newWord]);

  const currentRowFull = useMemo(() => {
    const [boardRow] = boardRows[currentGuessRow];
    const isFull = boardRow.row.findIndex(val => val.value === "") === -1;
    return isFull;
  }, [boardRows, currentGuessRow]);

  const onClickKey = (key: KeyboardKey) => {
    const [boardRow, setBoardRow] = boardRows[currentGuessRow];

    if (gameStatus === "FINISHED") {
      return;
    }

    if (key === "ENTER") {
      if (currentRowFull) {
        const guess = boardRow.row.map(r => r.value).join("").toUpperCase();
        const isValidGuess = WORD_LIST.findIndex(val => val.toUpperCase() === guess) >= 0 || VALID_GUESSES.findIndex(val => val.toUpperCase() === guess) >= 0;

        if (isValidGuess) {
          const row = cloneDeep(boardRow);
          const answerLetterCounts: {[key:string]: number} = {};
          const answerArray = Array.from(answer);

          for (const letter of answerArray) {
            if (answerLetterCounts[letter]) {
              answerLetterCounts[letter] += 1;
            } else {
              answerLetterCounts[letter] = 1;
            }
          }

          for (let i = 0; i < guess.length; i++) {
            const guessLetter = guess.charAt(i);
            const answerLetter = answer.charAt(i);
            const rightCharRightPlace = guessLetter === answerLetter;

            if (rightCharRightPlace) {
              row.row[i].status = "CORRECT";
              answerLetterCounts[guessLetter] -= 1;
            } else {
              const guessLetterInAnswer = answerArray.findIndex(letter => letter === guessLetter) > -1;

              if (guessLetterInAnswer && answerLetterCounts[guessLetter] > 0) {
                row.row[i].status = "WRONG_PLACE";
              } else {
                row.row[i].status = "INCORRECT";
              }
            }
          }
          const gameWon = row.row.map(val => val.status === "CORRECT").filter(val => !!val).length === 5;
          if (gameWon) {
            setGameStatus("FINISHED");
          }

          row.status === "COMPLETE";
          setBoardRow(row);

          if (!isLastRow) {
            setCurrentGuessIndex(0);
            setCurrentGuessRow(prev => prev + 1);
          }
        } else {
          if (boardRow.status === "INVALID") {
            setCurrentGuessIndex(0);
            setBoardRow(() => ({row: [{value: "", status: "NULL"}, {value: "", status: "NULL"}, {value: "", status: "NULL"}, {value: "", status: "NULL"}, {value: "", status: "NULL"}], status: "INPROGRESS"}));
          } else {
            setBoardRow(prev => {
              const newState = { ...prev };
              newState.status = "INVALID";
              return newState;
            });
          }
        }
      } else {
        setCurrentGuessIndex(0);
        setBoardRow(() => ({row: [{value: "", status: "NULL"}, {value: "", status: "NULL"}, {value: "", status: "NULL"}, {value: "", status: "NULL"}, {value: "", status: "NULL"}], status: "INPROGRESS"}));
      }
    } else if (key === "DELETE") {
      if (currentGuessIndex === 0 && boardRow.row[currentGuessIndex].value === "") {
        return;
      }

      const newState = cloneDeep(boardRow);
      newState.status = "INPROGRESS";

      if (isLastIndex && boardRow.row[currentGuessIndex].value !== "") {
        newState.row[currentGuessIndex].value = "";
        setBoardRow(newState);
      } else {
        const prevIndex = Math.max(currentGuessIndex - 1, 0);
        newState.row[prevIndex].value = "";
        setBoardRow(newState);
        setCurrentGuessIndex(prevIndex);
      }
    } else {
      if (boardRow.row[currentGuessIndex].value !== "") {
        return;
      }

      const row = cloneDeep(boardRow);
      row.row[currentGuessIndex].value = key;
      setBoardRow(row);

      setCurrentGuessIndex(prev => {
        if (prev === 4) {
          return prev;
        } else {
          return prev + 1;
        }
      });
    }
  };

  const resetBoard = () => {
    setGuess0({row: [{value: "", status: "NULL"}, {value: "", status: "NULL"}, {value: "", status: "NULL"}, {value: "", status: "NULL"}, {value: "", status: "NULL"}], status: "INPROGRESS"});
    setGuess1({row: [{value: "", status: "NULL"}, {value: "", status: "NULL"}, {value: "", status: "NULL"}, {value: "", status: "NULL"}, {value: "", status: "NULL"}], status: "INCOMPLETE"});
    setGuess2({row: [{value: "", status: "NULL"}, {value: "", status: "NULL"}, {value: "", status: "NULL"}, {value: "", status: "NULL"}, {value: "", status: "NULL"}], status: "INCOMPLETE"});
    setGuess3({row: [{value: "", status: "NULL"}, {value: "", status: "NULL"}, {value: "", status: "NULL"}, {value: "", status: "NULL"}, {value: "", status: "NULL"}], status: "INCOMPLETE"});
    setGuess4({row: [{value: "", status: "NULL"}, {value: "", status: "NULL"}, {value: "", status: "NULL"}, {value: "", status: "NULL"}, {value: "", status: "NULL"}], status: "INCOMPLETE"});
    setGuess5({row: [{value: "", status: "NULL"}, {value: "", status: "NULL"}, {value: "", status: "NULL"}, {value: "", status: "NULL"}, {value: "", status: "NULL"}], status: "INCOMPLETE"});
    setGuess6({row: [{value: "", status: "NULL"}, {value: "", status: "NULL"}, {value: "", status: "NULL"}, {value: "", status: "NULL"}, {value: "", status: "NULL"}], status: "INCOMPLETE"});
    setCurrentGuessRow(0);
    setCurrentGuessIndex(0);
    setGameStatus("INPROGRESS");
  };

  const value: GameState = {
    board,
    boardState,
    currentGuessRow,
    currentGuessIndex,
    gameStatus,
    onClickKey,
  };

  return (
    <GameStateContext.Provider value={value}>
      {props.children}
    </GameStateContext.Provider>
  );
};

export default GameStateProvider;
