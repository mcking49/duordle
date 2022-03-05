import { SimpleGrid } from "@chakra-ui/react";
import React, { useMemo } from "react";
import { Key } from ".";
import { KeyboardKey, KEYBOARD_KEY_ROW_1, KEYBOARD_KEY_ROW_2, KEYBOARD_KEY_ROW_3 } from "../../models";

export interface KeyboardRowProps {
  row: 1 | 2 | 3;
  onClickKey: (value: KeyboardKey) => void;
}

export const KeyboardRow: React.FC<KeyboardRowProps> = ({
  row,
  onClickKey,
}) => {
  const keyList = useMemo(() => {
    if (row === 1) {
      return KEYBOARD_KEY_ROW_1;
    } else if (row === 2) {
      return KEYBOARD_KEY_ROW_2;
    } else {
      return KEYBOARD_KEY_ROW_3;
    }
  }, [row]);

  return (
    <SimpleGrid gap={1} columns={keyList.length}>
      {keyList.map(key => <Key key={key} keyboardKey={key} onClick={onClickKey} />)}
    </SimpleGrid>
  );
};
