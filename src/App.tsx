import {
  ChakraProvider,
  extendTheme,
  Flex,
  HStack,
} from "@chakra-ui/react";
import { GameBoard } from "./components/game";
import { Keyboard } from "./components/keyboard";
import { GameFinishedModal } from "./components/modals/game-finished-modal";
import GameStateProvider from "./contexts/GameState";

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
    <GameStateProvider>
      <Flex textAlign="center" fontSize="xl" height="100%" width="100vw" p={3} flexDirection="column">
        <HStack flexGrow={1} width="100%">
          <GameBoard width="50%" boardNum={0} />
          <GameBoard width="50%" boardNum={1} />
        </HStack>
        <Keyboard />
      </Flex>

      <GameFinishedModal />
    </GameStateProvider>
  </ChakraProvider>
);
