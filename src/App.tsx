import React, { useEffect, useState } from "react"
import {
  ChakraProvider,
  theme,
  Flex,
} from "@chakra-ui/react"

import PricePage from "./Pages/PricePage";
import CryptoListPage from "./Pages/CryptoListPage";
import Menu from "./Components/Menu";

import { getCryptosFromStorage } from "./background";


const apiURL = 'https://api.binance.com/api/v3/exchangeInfo';

export const App = () => {
    const [currentPage, setCurrentPage] = useState("Price");

    const [cryptoList, setCryptoList] = useState([]);

    const [selectedCryptos, setSelectedCryptos] = useState<string[]>([]);

    async function fetchSelectedCryptos() {
        try {
            const cryptos = await getCryptosFromStorage();

            if(cryptos.length === 0) {
                setSelectedCryptos(["BTC", "ETH", "LTC"]);
            }
            else {
                setSelectedCryptos(cryptos);
            }
        } catch (error) {
            console.error("Error retrieving cryptos:", error);
        }
    }

    useEffect(() => {
        async function fetchInitialData() {
            await fetchSelectedCryptos();
        }
      
        fetchInitialData();
    }, []);

    async function fetchCryptocurrencies() {
        try {
            const response = await fetch(apiURL);

            if (response.ok) {
                const data = await response.json();
                const pairsData = data.symbols;
                const filteredData = pairsData.filter((s: { symbol: string | string[]; }) => s.symbol.includes('USDT'));
                const cryptoList = filteredData.map((s: { symbol: any; }) => s.symbol.replace('USDT', ''));
                setCryptoList(cryptoList); // Update state with the fetched data
            } else {
                console.error('Failed to fetch data');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }


    useEffect(() => {
        async function fetchInitialData() {
            fetchCryptocurrencies();
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
                    <CryptoListPage cryptoList={cryptoList} selectedCryptos={selectedCryptos} setSelectedCryptos={setSelectedCryptos} />
                    : null
                }
            </Flex>
        </ChakraProvider >
    );
}