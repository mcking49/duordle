import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useBoardState } from "../../../hooks/useBoardState";
import { useWordOfTheDay } from "../../../hooks/useWordOfTheDay";

export const GameFinishedModal: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { gameStatus: gameStatus0, gameWon: gameWon0 } = useBoardState(0);
  const { gameStatus: gameStatus1, gameWon: gameWon1 } = useBoardState(1);
  const { answer } = useWordOfTheDay();

  const gameWon = gameWon0 && gameWon1;

  useEffect(() => {
    if (gameStatus0 === "INPROGRESS" && gameStatus1 === "INPROGRESS") {
      onClose();
    } else if (gameStatus0 === "FINISHED" && gameStatus1 === "FINISHED") {
      onOpen();
    }
  }, [gameStatus0, gameStatus1]);

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
