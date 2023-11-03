import React, { useEffect, useMemo, useState } from "react"
import {
    Text,
    Flex,
} from "@chakra-ui/react"

import Cryptocurrency, { Cryptocurrencies, CryptocurrencyMap } from "./cryptocurrencies";
import PriceService from './PriceService';
import { fetchPriceChangePercent } from './PriceChangeService';

export const PricePage = () => {

    const initialCryptoData = Object.fromEntries(
        Array.from(CryptocurrencyMap).map(([crypto, cryptoData]) => [
            crypto,
            { ...cryptoData },
        ])
    );

    const [cryptoData, setCryptoData] = useState(initialCryptoData);


    const [cryptoChangeData, setCryptoChangeData] = useState(new Map<Cryptocurrencies, number | null>());

    useEffect(() => {
        const fetchData = async () => {
            const promises = Array.from(CryptocurrencyMap.keys()).map(async (crypto) => {
                const priceChange = await fetchPriceChangePercent(crypto);
                return [crypto, priceChange] as [Cryptocurrencies, number | null];
            });

            const cryptoChangeData = new Map(await Promise.all(promises));
            setCryptoChangeData(cryptoChangeData);
        };
        fetchData();




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
        <Flex
            flexDir={"column"}
            justifyContent={"flex-start"}
            bg={"black"}
        >
            {Array.from(CryptocurrencyMap.keys()).map((crypto, i, row) => (
                <Flex
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
                    <Text fontSize="sm" color={(!cryptoChangeData.get(crypto) || !crypto || cryptoChangeData.get(crypto) === 0) ? "gray.200" : (cryptoChangeData.get(crypto)! > 0) ? "green" : "red"} marginRight={5}>
                        {cryptoChangeData.get(crypto)}%
                    </Text>
                    <Text fontSize="md" fontWeight={"semibold"} color={cryptoData[crypto].color} marginRight={5}>
                        ${cryptoData[crypto].price}
                    </Text>
                </Flex>
            ))}
        </Flex>
    );
}