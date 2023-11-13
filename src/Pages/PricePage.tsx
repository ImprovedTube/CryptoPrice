import React, { useEffect, useMemo, useRef, useState } from "react"
import {
    Flex,
} from "@chakra-ui/react"

import Cryptocurrency, { createCryptocurrencyFromName } from "../Utils/cryptocurrencies";
import WebSocketManager from '../Services/WebSocketManager';
import { fetchPriceChangePercent } from '../Services/PriceChangeService';
import PriceRow from "../Components/PriceRow";

interface PricePageProps {
    selectedCryptos: string[];
}

const PricePage: React.FC<PricePageProps> = ({ selectedCryptos }) => {
    const [webSocketManager, setWebSocketManager] = useState<WebSocketManager | null>(null);
  
    const CryptocurrencyMap = useMemo(() => {
      const map = new Map<string, Cryptocurrency>();
      for (const crypto of selectedCryptos) {
        const key = crypto.toUpperCase();
        if (key) {
          map.set(key, createCryptocurrencyFromName(key));
        }
      }
      return map;
    }, [selectedCryptos]);
  
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
          if (cryptoData) {
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
  
      const newWebSocketManager = new WebSocketManager(Array.from(CryptocurrencyMap.values()));
      setWebSocketManager(newWebSocketManager);

  
      // Clean up WebSocket connections when the component unmounts
      return () => {
        newWebSocketManager?.ws?.close();
      };
    }, [CryptocurrencyMap]);

    
  
    useEffect(() => {
      // Update WebSocketManager when selectedCryptos change
      if (webSocketManager) {
        webSocketManager.updateCryptocurrencies(Array.from(CryptocurrencyMap.values()));
      }
    }, [selectedCryptos, CryptocurrencyMap, webSocketManager]);
  
    return (
      <Flex
        flexDir={"column"}
        justifyContent={"flex-start"}
        bg={"black"}
      >
        {Array.from(CryptocurrencyMap.keys()).map((crypto, i, row) => (
          <PriceRow
            key={crypto}
            crypto={crypto}
            i={i}
            row={row}
            cryptoData={cryptoData}
            cryptoChangeData={cryptoChangeData}
            CryptocurrencyMap={CryptocurrencyMap}
            webSocketManager={webSocketManager}
            setCryptoData={setCryptoData}
          />
        ))}
      </Flex>
    );
}

export default PricePage;