import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useGameState } from "../../../contexts/GameState";
import { useWordOfTheDay } from "../../../hooks/useWordOfTheDay";

export const GameFinishedModal: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { gameStatus, gameWon } = useGameState();
  const { answer } = useWordOfTheDay();

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
          {gameWon ? (
            <Text>Contratulations, you won!</Text>
          ) : (
            <>
              <Text>Sorry, you lost. The correct word was</Text>
              <Text color="green.600" fontWeight="bold" fontSize="2xl">{answer}</Text>
            </>
          )}
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost">Share</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
