import { Button, Heading } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import Page from "../layouts/Page";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const onClickCreate = () => {
    navigate("create-game");
  };

  return (
    <Page>
      <Heading as="h1" size="2xl">Welcome to Duordle</Heading>

      <Button onClick={onClickCreate}>Create a new game</Button>
    </Page>
  );
};

export default HomePage;
