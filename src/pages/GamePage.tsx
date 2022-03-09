import { Box } from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";
import {useDocument} from "react-firebase-hooks/firestore";
import { getGameDocRef } from "../lib/firebase/game";

type GamePageParams = Record<"gameId", string>;

const GamePage: React.FC = () => {
  const params = useParams<GamePageParams>();
  const [game] = useDocument(getGameDocRef(params.gameId!));
  console.log(game?.data());
  return <Box>Game page: {params.gameId}</Box>;
};

export default GamePage;
