import {
    Flex,
    Button,
} from "@chakra-ui/react"

export const Menu = () => {

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