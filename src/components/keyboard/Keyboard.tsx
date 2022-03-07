import { VStack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { KeyboardRow } from ".";
import { useGameState } from "../../contexts/GameState";
import { KeyboardKey } from "../../models";

export const Keyboard: React.FC = () => {
  const { onClickKey } = useGameState();

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      let keyPressed = "";

      if (e.code === "Backspace") {
        keyPressed = "DELETE";
      } else if (e.code === "Enter") {
        keyPressed = "ENTER";
      } else {
        const key = e.key.toUpperCase();
        if (key.length === 1 && key >= "A" && key <= "Z") {
          keyPressed = key;
        }
      }

      return onClickKey(keyPressed as KeyboardKey);
    };

    window.addEventListener("keyup", listener);

    return () => {
      window.removeEventListener("keyup", listener);
    };
  }, [onClickKey]);

  return (
    <VStack spacing={1} flexShrink={0} flexGrow={0}>
      <KeyboardRow row={1} onClickKey={onClickKey} />
      <KeyboardRow row={2} onClickKey={onClickKey} />
      <KeyboardRow row={3} onClickKey={onClickKey} />
    </VStack>
  );
};
