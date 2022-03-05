import { SimpleGrid } from "@chakra-ui/react";
import React, { useState } from "react";
import { Tile } from ".";
import { KeyboardKey } from "../../models";

export const GameBoard: React.FC = () => {
  const [guess1, setGuess1] = useState<(KeyboardKey | "")[]>(["", "", "", "", ""]);
  const [guess2, setGuess2] = useState<(KeyboardKey | "")[]>(["", "", "", "", ""]);
  const [guess3, setGuess3] = useState<(KeyboardKey | "")[]>(["", "", "", "", ""]);
  const [guess4, setGuess4] = useState<(KeyboardKey | "")[]>(["", "", "", "", ""]);
  const [guess5, setGuess5] = useState<(KeyboardKey | "")[]>(["", "", "", "", ""]);
  const [guess6, setGuess6] = useState<(KeyboardKey | "")[]>(["", "", "", "", ""]);
  const [currentGuess, setCurrentGuess] = useState(1);

  const board = [
    ...guess1,
    ...guess2,
    ...guess3,
    ...guess4,
    ...guess5,
    ...guess6,
  ];

  return (
    <SimpleGrid columns={5} gap={1} justifyContent="center">
      {board.map((value, index) => <Tile key={`${index}_${value}`} value={value} />)}
    </SimpleGrid>
  );
};
