import { SimpleGrid } from "@chakra-ui/react";
import React from "react";
import { Tile } from ".";
import { useGameState } from "../../contexts/GameState";

export const GameBoard: React.FC = () => {
  const { boardState } = useGameState();

  return (
    <SimpleGrid columns={5} gap={1} justifyContent="center">
      {boardState.map((boardRow) => (
        boardRow.row.map((letter, index) => (
          <Tile key={`${index}_${letter.value}`} letter={letter} boardRow={boardRow} />
        ))
      ))}
    </SimpleGrid>
  );
};
