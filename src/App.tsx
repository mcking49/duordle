import {
  Box,
  ChakraProvider,
  extendTheme,
  Flex,
} from "@chakra-ui/react";
import { GameBoard } from "./components/game";
import { Keyboard } from "./components/keyboard";

const theme = extendTheme({
  styles: {
    global: {
      "html, body, #root": {
        height: "100%",
      },
    },
  },
});

export const App = () => (
  <ChakraProvider theme={theme}>
    <Flex textAlign="center" fontSize="xl" height="100%" width="100vw" p={3} flexDirection="column">
      <Box flexGrow={1}>
        <GameBoard />
      </Box>
      <Keyboard />
    </Flex>
  </ChakraProvider>
);
