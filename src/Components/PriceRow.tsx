import React from "react"
import {
    Text,
    Flex,
} from "@chakra-ui/react"


interface PriceRowProps {
    crypto: string;
    i: number;
    row: string[];
    cryptoData: any;
    cryptoChangeData: any;
    CryptocurrencyMap: any;
}

const PriceRow: React.FC<PriceRowProps> = ({ crypto, i, row, cryptoData, cryptoChangeData, CryptocurrencyMap }) => {


    return (
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
                    <Text fontSize="sm" color={(!cryptoChangeData.get(CryptocurrencyMap.get(crypto)!) || !crypto || cryptoChangeData.get(CryptocurrencyMap.get(crypto)!)! === 0) ? "gray.200" : (cryptoChangeData.get(CryptocurrencyMap.get(crypto)!)! > 0) ? "green" : "red"} marginRight={5}>
                        {cryptoChangeData.get(CryptocurrencyMap.get(crypto)!) ?? 0}%
                    </Text>
                    <Text fontSize="md" fontWeight={"semibold"} color={cryptoData[crypto]?.color ?? "gray.200"} marginRight={5}>
                        ${cryptoData[crypto]?.price ?? "00.00"}
                    </Text>
                </Flex>

    );
}

export default PriceRow;