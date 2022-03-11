import { Button, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useGame } from "../hooks/useGame";
import Page from "../layouts/Page";

type GamePageParams = Record<"gameId", string>;

const GamePage: React.FC = () => {
  const params = useParams<GamePageParams>();
  const [gameSnapshot] = useGame(params.gameId!);

  const game = useMemo(() => gameSnapshot?.data(), [gameSnapshot]);

  return (
    <Page>
      <Heading as="h1" size="2xl">Lobby code: {game?.gameLobbyId}</Heading>
      <Text>Share the lobby code with your opponent to start a match</Text>

      <Flex alignItems="center" justifyContent="space-between">
        <VStack spacing={1}>
          <Heading as="h3" size="lg">Player 1</Heading>
          <Text>{game?.player1Name}</Text>
          <Button colorScheme={game?.player1Ready ? "blue" : "green"} disabled={game?.player1Ready}>Ready</Button>
        </VStack>

        <VStack spacing={1}>
          <Heading as="h3" size="lg">Player 2</Heading>
          <Text>{game?.player2Name ? game?.player2Name : "waiting..."}</Text>
          <Button colorScheme={game?.player2Ready ? "blue" : "green"} disabled={game?.player2Ready || !game?.player2Name}>Ready</Button>
        </VStack>
      </Flex>
    </Page>
  );
};

export default GamePage;
