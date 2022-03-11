import { Button, FormControl, FormLabel, Heading, Input, useDisclosure } from "@chakra-ui/react";
import React, { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import SpinnerModal from "../components/modals/SpinnerModal";
import Page from "../layouts/Page";
import { joinGame } from "../lib/firebase/game";

const JoinGamePage: React.FC = () => {
  const [player2Name, setPlayer2Name] = useState("");
  const [gameLobbyId, setGameLobbyId] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onChangeGameLobbyId = (e: ChangeEvent<HTMLInputElement>) => {
    setGameLobbyId(e.currentTarget.value.toUpperCase());
  };

  const onChangePlayer2Name = (e: ChangeEvent<HTMLInputElement>) => {
    setPlayer2Name(e.currentTarget.value);
  };

  const onClickJoin = async () => {
    onOpen();
    setIsLoading(true);
    const gameSnapshot = await joinGame(gameLobbyId, player2Name);
    setIsLoading(false);
    onClose();
    navigate(`../game/${gameSnapshot.id}`);
  };

  return (
    <>
      <Page>
        <Heading as="h1" size="2xl">Join Game</Heading>

        <FormControl isRequired>
          <FormLabel htmlFor="gameLobbyId">Enter Game Code</FormLabel>
          <Input
            id="gameLobbyId"
            value={gameLobbyId}
            onChange={onChangeGameLobbyId}
            placeholder="CODE"
            disabled={isLoading}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor="player2Name">Enter Game Code</FormLabel>
          <Input
            id="player2Name"
            value={player2Name}
            onChange={onChangePlayer2Name}
            placeholder="Name"
            disabled={isLoading}
          />
        </FormControl>

        <Button
          isDisabled={!player2Name || isLoading || !gameLobbyId}
          onClick={onClickJoin}
          colorScheme="green"
        >
          Join game
        </Button>
      </Page>

      <SpinnerModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default JoinGamePage;
