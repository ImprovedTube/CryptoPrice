import { useEffect, useState } from "react";

import {
    Flex,
    Icon,
    Text,
} from "@chakra-ui/react"

import { AddIcon } from '@chakra-ui/icons'


const apiURL = 'https://api.binance.com/api/v3/exchangeInfo';

export const CryptoListPage = () => {
    const [cryptoData, setCryptoData] = useState([]);

    async function fetchCryptocurrencies() {
        try {
            const response = await fetch(apiURL);

            if (response.ok) {
                const data = await response.json();
                const pairsData = data.symbols;
                const filteredData = pairsData.filter((s: { symbol: string | string[]; }) => s.symbol.includes('USDT'));
                const cryptoList = filteredData.map((s: { symbol: any; }) => s.symbol.replace('USDT', ''));
                setCryptoData(cryptoList); // Update state with the fetched data
            } else {
                console.error('Failed to fetch data');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }

    useEffect(() => {
        fetchCryptocurrencies();
    }
    );

    return (
        <Flex
            flexDir={"column"}
            justifyContent={"flex-start"}
            bg={"black"}
        >
            {cryptoData.map((crypto, index, row) => (
                <Flex
                    key={index}
                    bg={"black"}
                    borderTop={"1px solid"}
                    width={"100%"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    shadow={"base"}
                    borderBottom={{ base: index === row.length - 1 ? "1px solid" : "none" }}
                    borderColor={"gray.600"}
                >
                    <Text fontSize="md" fontWeight={"semibold"} color="gray.200" marginLeft={5}>
                        {crypto}
                    </Text>
                    <AddIcon color={"gray.200"} marginRight={5} fontSize="md" fontWeight={"semibold"} />
                </Flex>
            ))}
        </Flex>
    );
}