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
  Button,
  border,
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
      <Flex
        textAlign="center"
        fontSize="xl"
        w='330px'
        h='120px'
        margin={0}
        bg={"black"}
        justifyContent={"space-between"}
        flexDir={"column"}
      >
        <Flex
          width={"100%"}
          justifyContent={"flex-start"}
          alignItems={"center"}
          h='30px'
          flexDir={"row"}
        >
          <Button
            bgColor={"gray.700"}
            borderColor={"gray.600"}
            border={"2px"}
            h='30px'
            w='80px'
            textColor={"gray.200"}
            fontSize={'12px'}
            fontFamily={'Inter'}
            _hover={
              {
                bgColor: "gray.600",
                borderColor: "gray.500",
                border: "2px",
              }
            }
            _active={
              {
                bgColor: "gray.500",
                borderColor: "gray.400",
                border: "2px",
              }
            }
          >
            Price
          </Button>
          <Button
            bgColor={"gray.700"}
            borderColor={"gray.600"}
            border={"2px"}
            h='30px'
            w='80px'
            textColor={"gray.200"}
            fontSize={'12px'}
            fontFamily={'Inter'}
            _hover={
              {
                bgColor: "gray.600",
                borderColor: "gray.500",
              }
            }
            _active={
              {
                bgColor: "gray.500",
                borderColor: "gray.400",
              }
            }
          >
            Menu
          </Button>
        </Flex>
        <Flex
          flexDir={"column"}
          justifyContent={"flex-start"}
          bg={"black"}
        >
          {Array.from(CryptocurrencyMap.keys()).map((crypto, i, row) => (
            <Flex
              bg={"black"}
              borderColor={"white.900"}
              borderTop={"1px solid"}
              width={"100%"}
              justifyContent={"space-between"}
              shadow={"base"}
              borderBottom={{ base: i === row.length - 1 ? "1px solid" : "none" }}
            >
              <Text fontSize="md" fontWeight={"semibold"} color="gray.200" marginLeft={5}>
                {crypto}
              </Text>
              <Text fontSize="md" fontWeight={"semibold"} color={cryptoData[crypto].color} marginRight={5}>
                ${cryptoData[crypto].price}
              </Text>
            </Flex>
          ))}
        </Flex>



        {/*<Box
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
                {crypto}
              </Text>
              <Text fontSize="2xl" color={cryptoData[crypto].color} marginRight={5}>
                ${cryptoData[crypto].price}
              </Text>
            </Flex>
          ))}

          </Flex>*/}
      </Flex>
    </ChakraProvider >
  );
}