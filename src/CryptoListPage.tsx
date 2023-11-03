import { useEffect, useState } from "react";
import CryptoListService from "./CryptoListService";

import {
    Flex,
} from "@chakra-ui/react"
import CryptoList from "./CryptoList";

export const CryptoListPage = () => {

    const cryptoListService = new CryptoListService();

    const [cryptoList, setCryptoList] = useState(cryptoListService.get_crypto_list());

    useEffect(() => {
        const handleCryptoListUpdate = () => {
            setCryptoList(cryptoListService.get_crypto_list());
        };

        cryptoListService.registerSendCryptoListCallback(handleCryptoListUpdate);
    }
    );

    return (
        <Flex>
            <CryptoList cryptoList={cryptoList} />
        </Flex>
    );
}