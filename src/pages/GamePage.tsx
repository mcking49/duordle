import { Button, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useGame } from "../hooks/useGame";
import Page from "../layouts/Page";
import { setPlayerReady } from "../lib/firebase/game";
import { PlayerReady } from "../models";

type GamePageParams = Record<"gameId", string>;


const GamePage: React.FC = () => {
  const params = useParams<GamePageParams>();
  const gameId = params.gameId!;
  const [gameSnapshot] = useGame(gameId);
  const isPlayer1 = useMemo(() => localStorage.getItem(gameId) === "true", [params]);

  const game = useMemo(() => gameSnapshot?.data(), [gameSnapshot]);

  const onClickReady = async (player: PlayerReady) => {
    setPlayerReady(gameId, player);
  };

  return (
    <Page>
      <Heading as="h1" size="2xl">Lobby code: {game?.gameLobbyId}</Heading>
      <Text>Share the lobby code with your opponent to start a match</Text>

      <Flex alignItems="center" justifyContent="space-between">
        <VStack spacing={1}>
          <Heading as="h3" size="lg">Player 1</Heading>
          <Text>{game?.player1Name}</Text>
          {isPlayer1 ? (
            <Button colorScheme={game?.player1Ready ? "blue" : "green"} disabled={game?.player1Ready} onClick={() => onClickReady("player1Ready")}>
              {game?.player1Ready ? "READY!!!" : "Click to ready up"}
            </Button>
          ) : (
            <Text>{game?.player1Ready ? "READY!!!" : "Waiting..."}</Text>
          )}
        </VStack>

        <VStack spacing={1}>
          <Heading as="h3" size="lg">Player 2</Heading>
          <Text>{game?.player2Name ? game?.player2Name : "waiting..."}</Text>
          {isPlayer1 ? (
            <Text>{game?.player2Ready ? "READY!!!" : "Waiting..."}</Text>
          ) : (
            <Button colorScheme={game?.player2Ready ? "blue" : "green"} disabled={game?.player2Ready} onClick={() => onClickReady("player2Ready")}>
              {game?.player2Ready ? "READY!!!" : "Click to ready up"}
            </Button>
          )}
        </VStack>
      </Flex>
    </Page>
  );
};

export default GamePage;
