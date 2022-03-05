import { VStack } from "@chakra-ui/react";
import React from "react";
import { KeyboardRow } from ".";
import { KeyboardKey } from "../../models";

export const Keyboard: React.FC = () => {
  const onClickKey = (value: KeyboardKey) => {
    console.log(value);
  };

  return (
    <VStack spacing={1}>
      <KeyboardRow row={1} onClickKey={onClickKey} />
      <KeyboardRow row={2} onClickKey={onClickKey} />
      <KeyboardRow row={3} onClickKey={onClickKey} />
    </VStack>
  );
};
