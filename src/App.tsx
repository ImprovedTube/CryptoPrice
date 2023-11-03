import React, { useEffect, useMemo, useState } from "react"
import {
  ChakraProvider,
  theme,
  Flex,
} from "@chakra-ui/react"

import { PricePage } from "./PricePage";
import { CryptoListPage } from "./CryptoListPage";
import Menu from "./Menu";

export const App = () => {
  const [currentPage, setCurrentPage] = useState("Price");

  return (
    <ChakraProvider theme={theme}>
      <Flex
        textAlign="center"
        fontSize="xl"
        w='330px'
        h='120px'
        margin={0}
        bg={"black"}
        justifyContent={"flex-start"}
        flexDir={"column"}
      >
        <Menu setCurrentPage={setCurrentPage} />
        {currentPage === "Price" ? <PricePage /> : null}
        {currentPage === "CryptoList" ? <CryptoListPage /> : null}
      </Flex>
    </ChakraProvider >
  );
}