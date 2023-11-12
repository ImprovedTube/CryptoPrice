import { useEffect, useState } from "react";

import {
    Flex,
    Text,
} from "@chakra-ui/react"

import { AddIcon, CheckIcon } from '@chakra-ui/icons'

import { getCryptosFromStorage, setSelectedCryptosInStorage } from "./background";


const apiURL = 'https://api.binance.com/api/v3/exchangeInfo';

interface CryptoListPageProps {
    selectedCryptos: string[];
    setSelectedCryptos: React.Dispatch<React.SetStateAction<string[]>>;
}

const CryptoListPage: React.FC<CryptoListPageProps> = ({ selectedCryptos, setSelectedCryptos }) => {
    const [cryptoData, setCryptoData] = useState([]);
    // const [selectedCryptos, setSelectedCryptos] = useState([]);

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
        async function fetchInitialData() {
            await fetchSelectedCryptos();
            fetchCryptocurrencies();
          }
      
          fetchInitialData();
    }, []);

    const handleFlexClick = (crypto: never) => {

        // Toggle the selected status of the clicked crypto
        setSelectedCryptos((prevSelectedCryptos) => {
          if (prevSelectedCryptos.includes(crypto)) {
            return prevSelectedCryptos.filter((selectedCrypto: any) => selectedCrypto !== crypto);
          } else {
            return [...prevSelectedCryptos, crypto];
          }
        });

        // Save the selected cryptos in storage
        setSelectedCryptos((updatedCryptos) => {
            setSelectedCryptosInStorage(updatedCryptos);
            return updatedCryptos; // Return the updated value for React to use
        });
    };

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

                    onClick={() => handleFlexClick(crypto)} // Replace "yourCryptoValue" with the actual crypto value
                    _hover={{ cursor: "pointer", bg: "gray.800" }}
                >
                    <Text fontSize="md" fontWeight={"semibold"} color="gray.200" marginLeft={5}>
                        {crypto}
                    </Text>
                    {selectedCryptos.includes(crypto) ? (
                        <CheckIcon color={"gray.200"} marginRight={5} fontSize="md" fontWeight={"semibold"} />
                    ) : (
                        <AddIcon color={"gray.200"} marginRight={5} fontSize="md" fontWeight={"semibold"} />
                    )}
                </Flex>
            ))}
        </Flex>
    );
}

export default CryptoListPage;