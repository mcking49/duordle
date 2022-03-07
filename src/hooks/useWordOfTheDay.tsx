import { startOfDay } from "date-fns/fp";
import { useEffect, useState } from "react";
import { WORD_LISTS } from "../lib/words";

export const useWordOfTheDay = (boardNum = 0) => {
  const [answer, setAnswer] = useState<string>("");
  const [newWord, setNewWord] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let wordOfTheDayForBoard = localStorage.getItem(`answer_${boardNum}`);
    const now = startOfDay(Date.now());
    const wordDayISO = localStorage.getItem("wordForDay");
    const isWordForToday = wordDayISO === now.toISOString();
    const wordList = WORD_LISTS[boardNum];

    if (!isWordForToday || !wordOfTheDayForBoard) {
      const epochMs = new Date(2022, 0).valueOf();
      const msInDay = 24 * 60 * 60 * 1000;
      const index = Math.floor((now.getTime() - epochMs) / msInDay);
      wordOfTheDayForBoard = wordList[index % wordList.length].toUpperCase();
      localStorage.setItem(`answer_${boardNum}`, wordOfTheDayForBoard);
      localStorage.setItem("wordForDay", now.toISOString());
      setNewWord(true);
    }

    setAnswer(wordOfTheDayForBoard);
    setLoading(false);
  }, [boardNum]);

  return {answer, newWord, loadingWordOfTheDay: loading, setNewWord};
};
