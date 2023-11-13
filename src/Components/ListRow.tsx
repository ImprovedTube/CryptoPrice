import React from "react"
import {
    Text,
    Flex,
} from "@chakra-ui/react"

import { AddIcon, CheckIcon } from '@chakra-ui/icons'

import { setSelectedCryptosInStorage } from '../background.js';


interface ListRowProps {
    crypto: never;
    index: number;
    row: string[];
    selectedCryptos: string[];
    setSelectedCryptos: React.Dispatch<React.SetStateAction<string[]>>;
}

const ListRow: React.FC<ListRowProps> = ({ crypto, index, row, selectedCryptos, setSelectedCryptos }) => {

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
        key={index}
        bg={"black"}
        borderTop={"1px solid"}
        width={"100%"}
        alignItems={"center"}
        justifyContent={"space-between"}
        shadow={"base"}
        borderBottom={{ base: index === row.length - 1 ? "1px solid" : "none" }}
        borderColor={"gray.600"}

        onClick={() => handleFlexClick(crypto)}
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

    );
}

export default ListRow;