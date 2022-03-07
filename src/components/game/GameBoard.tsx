import { SimpleGrid, SimpleGridProps } from "@chakra-ui/react";
import React from "react";
import { Tile } from ".";
import { useBoardState } from "../../hooks/useBoardState";

export interface GameBoardProps extends SimpleGridProps {
  boardNum: number;
}

export const GameBoard: React.FC<GameBoardProps> = ({ boardNum, ...props }) => {
  const { boardState } = useBoardState(boardNum);

  return (
    <SimpleGrid columns={5} gap={1} justifyContent="center" { ...props }>
      {boardState.map((boardRow) => (
        boardRow.row.map((letter, index) => (
          <Tile key={`${index}_${letter.value}`} letter={letter} boardRow={boardRow} />
        ))
      ))}
    </SimpleGrid>
  );
};
