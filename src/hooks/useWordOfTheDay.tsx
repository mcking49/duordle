import { startOfDay } from "date-fns/fp";
import { useEffect, useState } from "react";
import { WORD_LIST } from "../lib/words";

export const useWordOfTheDay = () => {
  const [answer, setAnswer] = useState<string>("");
  const [newWord, setNewWord] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let wordOfTheDay = localStorage.getItem("answer");
    const now = startOfDay(Date.now());
    const wordDayISO = localStorage.getItem("wordForDay");
    const isWordForToday = wordDayISO === now.toISOString();

    if (!wordOfTheDay || !isWordForToday) {
      const epochMs = new Date(2022, 0).valueOf();
      const msInDay = 24 * 60 * 60 * 1000;
      const index = Math.floor((now.getTime() - epochMs) / msInDay);
      wordOfTheDay = WORD_LIST[index % WORD_LIST.length].toUpperCase();
      localStorage.setItem("answer", wordOfTheDay);
      localStorage.setItem("wordForDay", now.toISOString());
      setNewWord(true);
    }

    setAnswer(wordOfTheDay);
    setLoading(false);
  }, []);

  return {answer, newWord, loadingWordOfTheDay: loading, setNewWord};
};
