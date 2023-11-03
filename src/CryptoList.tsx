import { useState } from "react";

import {
    Flex,
} from "@chakra-ui/react"

interface CryptoListProps {
    cryptoList: string[];
}

const CryptoList: React.FC<CryptoListProps> = ({ cryptoList }) => {


    return (
        <Flex>
            {cryptoList.map((crypto) => (
                <Flex
                    key={crypto}
                    w='100%'
                    h='30px'
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    flexDir={"row"}
                >
                    <Flex
                        w='50%'
                        h='30px'
                        justifyContent={"flex-start"}
                        alignItems={"center"}
                        flexDir={"row"}
                    >
                        {crypto}
                    </Flex>
                </Flex>
            ))}
        </Flex>
    );
}

export default CryptoList;