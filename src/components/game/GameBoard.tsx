import { SimpleGrid } from "@chakra-ui/react";
import React from "react";
import { Tile } from ".";
import { useGameState } from "../../contexts/GameState";

export const GameBoard: React.FC = () => {
  const { board } = useGameState();

  return (
    <SimpleGrid columns={5} gap={1} justifyContent="center">
      {board.map((value, index) => <Tile key={`${index}_${value}`} value={value} />)}
    </SimpleGrid>
  );
};
