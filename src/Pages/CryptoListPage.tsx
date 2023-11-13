import {
    Flex,
} from "@chakra-ui/react"

import ListRow from "../Components/ListRow";


interface CryptoListPageProps {
    cryptoList: never[];
    selectedCryptos: string[];
    setSelectedCryptos: React.Dispatch<React.SetStateAction<string[]>>;
}

const CryptoListPage: React.FC<CryptoListPageProps> = ({ cryptoList, selectedCryptos, setSelectedCryptos }) => {

    return (
        <Flex
            flexDir={"column"}
            justifyContent={"flex-start"}
            bg={"black"}
        >
            {cryptoList.map((crypto, index, row) => (
                <ListRow
                    key={index}
                    crypto={crypto}
                    index={index}
                    row={row}
                    selectedCryptos={selectedCryptos}
                    setSelectedCryptos={setSelectedCryptos}
                />
            ))}
        </Flex>
    );
}

export default CryptoListPage;