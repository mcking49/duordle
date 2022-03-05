import {
  Box,
  ChakraProvider,
  Flex,
  theme,
} from "@chakra-ui/react";
import { GameBoard } from "./components/game";
import { Keyboard } from "./components/keyboard";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Flex textAlign="center" fontSize="xl" height="100vh" width="100vw" p={3} flexDirection="column">
      <Box flexGrow={1}>
        <GameBoard />
      </Box>
      <Keyboard />
    </Flex>
  </ChakraProvider>
);
