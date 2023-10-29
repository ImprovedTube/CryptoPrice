import React, { useEffect, useMemo, useState } from "react"
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  Flex,
  Center,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { Logo } from "./Logo"

import Cryptocurrency, { Cryptocurrencies, CryptocurrencyMap } from "./cryptocurrencies";
import PriceService from './service';

export const App = () => {

  const initialCryptoData = Object.fromEntries(
    Array.from(CryptocurrencyMap).map(([crypto, cryptoData]) => [
      crypto,
      { ...cryptoData },
    ])
  );

  const [cryptoData, setCryptoData] = useState(initialCryptoData);

  useEffect(() => {
    const cryptoServices = {} as Record<Cryptocurrencies, PriceService>;

    function handlePriceUpdate(crypto: Cryptocurrencies) {
      return (price: string, color: string) => {
        setCryptoData((prevCryptoData) => ({
          ...prevCryptoData,
          [crypto]: { ...prevCryptoData[crypto], price, color },
        }));
      };
    }

    for (const crypto of CryptocurrencyMap.keys()) {
      const cryptoData = CryptocurrencyMap.get(crypto);

      if (cryptoData) {
        const service = new PriceService(cryptoData);

        // Use the handlePriceUpdate function with the correct 'crypto'
        service.registerSendPriceCallback(handlePriceUpdate(crypto));

        cryptoServices[crypto] = service;
      }
    }

    // Clean up WebSocket connections when the component unmounts
    return () => {
      for (const service of Object.values(cryptoServices)) {
        service.ws?.close();
      }
    };
  }, []);




  return (
    <ChakraProvider theme={theme}>
      <Box
        textAlign="center"
        fontSize="xl"
        w='250px'
        h='350px'
        margin={0}
      >
        <Box
          h='50px'
          bgColor={"blue.100"}
          shadow={"base"}
        >
          <Center>

            <Text
              fontSize="2xl"
              color="blue.900"
            >
              Crypto Price
            </Text>
          </Center>
        </Box>
        <Flex
          flexDir={"column"}
          width={"100%"}
          alignItems={"center"}
          h="300px"
          justifyContent={"space-evenly"}
        >

          {Array.from(CryptocurrencyMap.keys()).map((crypto) => (
            <Flex
              bgColor={"blue.50"}
              borderRadius={10}
              width={"95%"}
              justifyContent={"space-between"}
              shadow={"base"}
            >
              <Text fontSize="2xl" color="blue.800" marginLeft={5}>
                {/* {cryptoData[crypto].name} */}
                {crypto}
              </Text>
              <Text fontSize="2xl" color={cryptoData[crypto].color} marginRight={5}>
                ${cryptoData[crypto].price}
              </Text>
            </Flex>
          ))}

        </Flex>
      </Box>
    </ChakraProvider>
  );
}