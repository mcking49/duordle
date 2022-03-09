import { Button, FormControl, FormLabel, Heading, Input, useDisclosure } from "@chakra-ui/react";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import Page from "../layouts/Page";
import { createGame } from "../lib/firebase/game";
import { useNavigate } from "react-router-dom";
import SpinnerModal from "../components/modals/SpinnerModal";

const CreateGamePage: React.FC = () => {
  const [player1Name, setPlayer1Name] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPlayer1Name(e.currentTarget.value);
  };

  const onClickCreate = useCallback(async () => {
    if (!player1Name) {
      return;
    }

    onOpen();
    setIsLoading(true);
    const game = await createGame(player1Name);
    setIsLoading(false);
    onClose();

    navigate(`../game/${game.data()?.id}`);
  }, [player1Name, navigate, onOpen, onClose]);

  useEffect(() => {
    const listener = (key: KeyboardEvent) => {
      if (key.code === "Enter") {
        onClickCreate();
      }
    };

    window.addEventListener("keyup", listener);

    return () => {
      window.removeEventListener("keyup", listener);
    };
  }, [onClickCreate]);

  return (
    <>
      <Page>
        <Heading as="h1" size="2xl">Create a new game</Heading>

        <FormControl isRequired>
          <FormLabel htmlFor="player1Name">Enter your player name</FormLabel>
          <Input id="player1Name" value={player1Name} onChange={onInputChange} placeholder="Name" disabled={isLoading} />
        </FormControl>

        <Button isDisabled={!player1Name || isLoading} onClick={onClickCreate} colorScheme="blue">Create game</Button>
      </Page>

      <SpinnerModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default CreateGamePage;
