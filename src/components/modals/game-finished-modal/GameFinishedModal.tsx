import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useGameState } from "../../../contexts/GameState";

export const GameFinishedModal: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { gameStatus } = useGameState();

  useEffect(() => {
    if (gameStatus === "INPROGRESS") {
      onClose();
    } else if (gameStatus === "FINISHED") {
      onOpen();
    }
  }, [gameStatus]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Game Over!</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          You did alright.
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost">Share</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
