import { useEffect, useState } from "react";
import CryptoListService from "./CryptoListService";

import {
    Flex,
    Text,
} from "@chakra-ui/react"
import CryptoList from "./CryptoList";

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
                const cryptoList = filteredData.map((s: { symbol: any; }) => s.symbol);
                setCryptoData(cryptoList); // Update state with the fetched data
            } else {
                console.error('Failed to fetch data');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }

    // const cryptoListService = new CryptoListService();

    // const [cryptoList, setCryptoList] = useState(cryptoListService.get_crypto_list());

    useEffect(() => {
        fetchCryptocurrencies();
        // const handleCryptoListUpdate = () => {
        // setCryptoList(cryptoListService.get_crypto_list());
        // };

        // cryptoListService.registerSendCryptoListCallback(handleCryptoListUpdate);
    }
    );

    return (
        <Flex>
            {cryptoData.map((crypto, index) => (
                <Text key={index} color={"white"}>{crypto}</Text>
            ))}
        </Flex>
    );
}