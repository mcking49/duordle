import { Box } from "@chakra-ui/react";
import React from "react";

const Page: React.FC = ({ children }) => {
  return <Box height="100%" width="100%">{children}</Box>;
};

export default Page;
