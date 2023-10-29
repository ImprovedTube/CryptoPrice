import React, { useState } from "react"
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


export const App = () => {
  const [price, setPrice] = useState('------');
  const [color, setColor] = useState('blue.800');

  let webSocket = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@trade');
  let lastPrice = '0.0';

  webSocket.onmessage = (event) => {
    const stockPrice = parseFloat(JSON.parse(event.data).p).toFixed(2);
    setPrice('$' + stockPrice);
    setColor(!lastPrice || lastPrice === stockPrice ? 'black' : parseFloat(lastPrice) > parseFloat(stockPrice) ? 'red' : 'green');

    lastPrice = stockPrice;
  };

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
          <Flex
            bgColor={"blue.50"}
            borderRadius={10}
            width={"95%"}
            justifyContent={"space-between"}
            shadow={"base"}
          >
            <Text fontSize="2xl" color="blue.800" marginLeft={5}>
              BTC
            </Text>
            <Text fontSize="2xl" color={color} marginRight={5}>
              {price}
            </Text>
          </Flex>
          <Flex
            bgColor={"blue.50"}
            borderRadius={10}
            width={"95%"}
            justifyContent={"space-between"}
            shadow={"base"}
          >
            <Text fontSize="2xl" color="blue.800" marginLeft={5}>
              ETH
            </Text>
            <Text fontSize="2xl" color="blue.800" marginRight={5}>
              $-------
            </Text>
          </Flex>
        </Flex>
      </Box>
    </ChakraProvider>
  );
}