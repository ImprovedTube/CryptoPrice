import React, { useEffect, useMemo, useState } from "react"
import {
    Flex,
} from "@chakra-ui/react"

import Cryptocurrency, { createCryptocurrencyFromName } from "../Utils/cryptocurrencies";
import PriceService from '../Services/PriceService';
import { fetchPriceChangePercent } from '../Services/PriceChangeService';
import PriceRow from "../Components/PriceRow";

interface PricePageProps {
    selectedCryptos: string[];
}

const PricePage: React.FC<PricePageProps> = ({ selectedCryptos }) => {

    const CryptocurrencyMap = useMemo(() => {
        const map = new Map<string, Cryptocurrency>();
        for (const crypto of selectedCryptos) {
            const key = crypto.toUpperCase();
            if(key) {
                map.set(key, createCryptocurrencyFromName(key));
            }
        }
        return map;
    }
    , [selectedCryptos]);

    const initialCryptoData = Object.fromEntries(
        Array.from(CryptocurrencyMap).map(([crypto, cryptoData]) => [
            crypto,
            { ...cryptoData },
        ])
    );

    const [cryptoData, setCryptoData] = useState(initialCryptoData);

    const [cryptoChangeData, setCryptoChangeData] = useState(new Map<Cryptocurrency, number | null>());


    useEffect(() => {
        const fetchData = async () => {
            const promises = Array.from(CryptocurrencyMap.keys()).map(async (crypto) => {
                const cryptoData = CryptocurrencyMap.get(crypto);
                if(cryptoData) {
                    const priceChange = await fetchPriceChangePercent(cryptoData);
                    return [cryptoData, priceChange] as [Cryptocurrency, number | null];
                } else {
                    return [undefined, null] as [undefined, number | null];
                }
            });

            const results = await Promise.all(promises);
            const filteredResults = results.filter(([crypto]) => crypto !== undefined);

            const cryptoChangeData = new Map<Cryptocurrency, number | null>(filteredResults as [Cryptocurrency, number | null][]);
            setCryptoChangeData(cryptoChangeData);
            
        };
        fetchData();




        const cryptoServices = {} as Record<string, PriceService>;

        function handlePriceUpdate(crypto: string) {
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
                service.registerSendPriceCallback(handlePriceUpdate(cryptoData.name));

                cryptoServices[cryptoData.name] = service;
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
                <PriceRow
                    crypto={crypto}
                    i={i}
                    row={row}
                    cryptoData={cryptoData}
                    cryptoChangeData={cryptoChangeData}
                    CryptocurrencyMap={CryptocurrencyMap}
                    />
            ))}
        </Flex>
    );
}

export default PricePage;