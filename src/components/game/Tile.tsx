import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import { KeyboardKey } from "../../models";

export interface TileProps {
  value: KeyboardKey | "";
}

export const Tile: React.FC<TileProps> = ({ value }) => (
  <Flex
    height="100%"
    width="100%"
    textAlign="center"
    justifyContent="center"
    alignItems="center"
    borderColor="gray.500"
    borderWidth="1px"
    rounded="md"
    _before={{
      // eslint-disable-next-line quotes
      content: '""',
      paddingBottom:
      "100%",
      display: "block",
    }}
  >
    <Text fontSize="3xl">{value}</Text>
  </Flex>
);
