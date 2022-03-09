import { Box, ChakraProvider, extendTheme } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateGamePage from "./pages/CreateGamePage";
import GamePage from "./pages/GamePage";
import HomePage from "./pages/HomePage";

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
    <Box padding={4} height="100%" width="100vw">
      <BrowserRouter>
        <Routes>
          <Route path="create-game" element={<CreateGamePage />} />
          <Route path="game/:gameId" element={<GamePage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </Box>
  </ChakraProvider>
);
