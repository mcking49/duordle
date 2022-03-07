import { Button, Icon, IconButton } from "@chakra-ui/react";
import React, { useCallback, useMemo } from "react";
import { MdKeyboardReturn } from "react-icons/md";
import { RiDeleteBack2Line } from "react-icons/ri";
import { KeyboardKey } from "../../models";

export interface KeyProps {
  keyboardKey: KeyboardKey;
  onClick: (value: KeyboardKey) => void;
}

export const Key: React.FC<KeyProps> = ({
  keyboardKey,
  onClick,
}) => {
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = useCallback((event) => {
    onClick(keyboardKey);
    event.currentTarget.blur();
  }, [keyboardKey, onClick]);

  const button = useMemo(() => {
    if (keyboardKey === "DELETE") {
      return <IconButton aria-label="Delete character button" onClick={handleClick} icon={<Icon as={RiDeleteBack2Line} />} size="sm" />;
    } else if (keyboardKey === "ENTER") {
      return <IconButton aria-label="Enter character button" onClick={handleClick} icon={<Icon as={MdKeyboardReturn} />} size="sm" />;
    } else {
      return <Button size="sm" onClick={handleClick}>{keyboardKey}</Button>;
    }
  }, [keyboardKey, handleClick]);

  return button;
};
