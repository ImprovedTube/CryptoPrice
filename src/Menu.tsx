import {
    Flex,
    Button,
} from "@chakra-ui/react"
import { useState } from "react";

interface MenuProps {
    setCurrentPage: (page: string) => void,
}

const Menu: React.FC<MenuProps> = ({ setCurrentPage }) => {

    const [activePage, setActivePage] = useState('Price');

    const handleButtonClick = (pageName: string) => {
        setActivePage(pageName);
        setCurrentPage(pageName);
    };

    return (
        <Flex
            display={"fixed"}
            width={"100%"}
            justifyContent={"flex-start"}
            alignItems={"center"}
            h='30px'
            flexDir={"row"}
        >
            <Button
                bgColor={"gray.700"}
                borderRadius={0}
                borderColor={"gray.600"}
                border={"2px"}
                borderBottom={"1px"}
                h='30px'
                w='80px'
                textColor={"gray.200"}
                fontSize={'12px'}
                fontFamily={'Inter'}

                onClick={() => handleButtonClick('Price')}

                _hover={
                    {
                        bgColor: "gray.600",
                        borderColor: "gray.500",
                        border: "2px",
                        borderBottom: "1px",
                    }
                }
                _active={
                    {
                        bgColor: "gray.500",
                        borderColor: "gray.400",
                        border: "2px",
                        borderBottom: "1px",
                    }
                }
            >
                Price
            </Button>
            <Button
                bgColor={"gray.700"}
                borderRadius={0}
                borderColor={"gray.600"}
                border={"2px"}
                borderBottom={"1px"}
                h='30px'
                w='80px'
                textColor={"gray.200"}
                fontSize={'12px'}
                fontFamily={'Inter'}

                onClick={() => handleButtonClick('CryptoList')}

                _hover={
                    {
                        bgColor: "gray.600",
                        borderColor: "gray.500",
                        border: "2px",
                        borderBottom: "1px",
                    }
                }
                _active={
                    {
                        bgColor: "gray.500",
                        borderColor: "gray.400",
                        border: "2px",
                        borderBottom: "1px",
                    }
                }
            >
                Menu
            </Button>
        </Flex>
    );
}

export default Menu;