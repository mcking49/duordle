import { Flex, Text } from "@chakra-ui/react";
import React, { useMemo } from "react";
import { BoardRow, Letter } from "../../hooks/useBoardState";

export interface TileProps {
  boardRow: BoardRow;
  letter: Letter;
}

export const Tile: React.FC<TileProps> = ({ boardRow, letter }) => {
  const textColor = useMemo(() => {
    let color = "gray.700";

    if (boardRow.status === "INVALID") {
      color = "red";
      return color;
    }

    return color;
  }, [letter, boardRow]);

  const tileBg = useMemo(() => {
    let bg = "initial";

    if (letter.status === "CORRECT") {
      bg = "green";
    } else if (letter.status === "WRONG_PLACE") {
      bg = "yellow.400";
    }

    return bg;
  }, [letter]);

  return (
    <Flex
      height="100%"
      width="100%"
      textAlign="center"
      justifyContent="center"
      alignItems="center"
      borderColor="gray.500"
      borderWidth="1px"
      rounded="md"
      textColor={textColor}
      backgroundColor={tileBg}
      _before={{
        // eslint-disable-next-line quotes
        content: '""',
        paddingBottom: "100%",
        display: "block",
      }}
    >
      <Text fontSize="3xl">{letter.value}</Text>
    </Flex>
  );
};
