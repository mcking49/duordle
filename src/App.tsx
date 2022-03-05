import {
  Box,
  ChakraProvider,
  theme,
} from "@chakra-ui/react";
import { Keyboard } from "./components/keyboard";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl" height="100vh" width="100vw" p={3}>
      <Keyboard />
    </Box>
  </ChakraProvider>
);
