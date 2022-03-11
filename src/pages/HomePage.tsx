import { Box, Button, Heading } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import Page from "../layouts/Page";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const onClickCreate = () => {
    navigate("create-game");
  };

  const onClickJoin = () => {
    navigate("join");
  };

  return (
    <Page>
      <Heading as="h1" size="2xl">Welcome to Duordle</Heading>

      <Button onClick={onClickCreate}>Create a new game</Button>

      <Box>
        <Heading as="h2" size="lg" mt={8}>Or click here to join a game</Heading>
        <Button onClick={onClickJoin}>Join</Button>
      </Box>
    </Page>
  );
};

export default HomePage;
