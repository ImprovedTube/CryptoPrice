import React, { useEffect, useMemo, useState } from "react"
import {
  ChakraProvider,
  theme,
  Flex,
} from "@chakra-ui/react"

import PricePage from "./PricePage";
import CryptoListPage from "./CryptoListPage";
import Menu from "./Menu";

import { getCryptosFromStorage } from "./background";

export const App = () => {
  const [currentPage, setCurrentPage] = useState("Price");

  const [selectedCryptos, setSelectedCryptos] = useState<string[]>([]);

  async function fetchSelectedCryptos() {
    try {
      const cryptos = await getCryptosFromStorage();
      // Handle the datas here
    //   console.log("Cryptos retrieved:", datas);
        setSelectedCryptos(cryptos);
    } catch (error) {
      console.error("Error retrieving cryptos:", error);
    }
  }

  useEffect(() => {
    async function fetchInitialData() {
        await fetchSelectedCryptos();
        // fetchCryptocurrencies();
      }
  
      fetchInitialData();
}, []);

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
        overflow-x={"auto"}
      >
        <Menu setCurrentPage={setCurrentPage} />
        {currentPage === "Price" ? <PricePage selectedCryptos={selectedCryptos} /> : null}
        {currentPage === "CryptoList" 
          ? 
          <CryptoListPage selectedCryptos={selectedCryptos} setSelectedCryptos={setSelectedCryptos} />
          : null
        }
      </Flex>
    </ChakraProvider >
  );
}