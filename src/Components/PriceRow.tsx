import React, { useEffect } from "react"
import {
    Text,
    Flex,
} from "@chakra-ui/react"
import { WebSocketManager } from "../Services/PriceService";
import Cryptocurrency from "../Utils/cryptocurrencies";


interface PriceRowProps {
    crypto: string;
    i: number;
    row: string[];
    cryptoData: Record<string, any>; // Replace 'any' with the actual type of cryptoData
    cryptoChangeData: Map<Cryptocurrency, number | null>;
    CryptocurrencyMap: Map<string, Cryptocurrency>;
    webSocketManager: WebSocketManager | null;
    setCryptoData: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  }

const PriceRow: React.FC<PriceRowProps> = ({
    crypto,
    i,
    row,
    cryptoData,
    cryptoChangeData,
    CryptocurrencyMap,
    webSocketManager,
    setCryptoData,
  }) => {
    useEffect(() => {
        // Add a WebSocket listener when the component mounts
        if (webSocketManager) {
          webSocketManager.registerSendPriceCallback( (crypto: string, price: string, color: string) => {
            setCryptoData((prevCryptoData: any) => {
              return {
                ...prevCryptoData,
                [crypto]: {
                  ...prevCryptoData[crypto],
                  price,
                  color,
                },
              };
            });
          });
        }
    
        // Clean up WebSocket listener when the component unmounts
        return () => {
          if (webSocketManager) {
            webSocketManager.unregisterSendPriceCallback();
          }
        };
    }, [webSocketManager, cryptoData, crypto]);
  
    return (
        <Flex
          key={crypto}
          bg={"black"}
          borderTop={"1px solid"}
          width={"100%"}
          alignItems={"center"}
          justifyContent={"space-between"}
          shadow={"base"}
          borderBottom={{ base: i === row.length - 1 ? "1px solid" : "none" }}
          borderColor={"gray.600"}
        >
            <Text fontSize="md" fontWeight={"semibold"} color="gray.200" marginLeft={5}>
                {crypto}
            </Text>
            <Text fontSize="sm" color={(!cryptoChangeData.get(CryptocurrencyMap.get(crypto)!) || !crypto || cryptoChangeData.get(CryptocurrencyMap.get(crypto)!) === 0) ? "gray.200" : (cryptoChangeData.get(CryptocurrencyMap.get(crypto)!)! > 0) ? "green" : "red"} marginRight={5}>
                {cryptoChangeData.get(CryptocurrencyMap.get(crypto)!)}%
            </Text>
            <Text fontSize="md" fontWeight={"semibold"} color={cryptoData[crypto]?.color || "gray.200"} marginRight={5}>
                ${cryptoData[crypto]?.price || "0.0"}
            </Text>
        </Flex>
    );
};

export default PriceRow;