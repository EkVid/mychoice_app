import {
    Badge,
    Button,
    Card,
    Flex,
    Heading,
    Stack,
    Text,
} from "@chakra-ui/react";
import type { CardProps } from "./types";
import { 
    ITEM, 
    PRIMARY, 
    SECONDARY, 
    PRIMARY_ABBREVIATION, 
    VIEW_DETAILS 
} from "../commons/constants";


const ItemCard = ({ item, onView }: CardProps) => {
    return (
        <Card.Root>
            <Card.Body>
                <Stack gap={4}>
                    <Flex justify="space-between" align="center">
                        <Heading size="md">{item.name}</Heading>
                        <Badge colorPalette={item.group === PRIMARY_ABBREVIATION ? "blue" : "purple"}>
                            {item.group === PRIMARY_ABBREVIATION ? PRIMARY : SECONDARY}
                        </Badge>
                    </Flex>

                    <Text fontSize="sm" color="gray.500">
                        {ITEM} #{item.id}
                    </Text>

                    <Button
                        variant="outline"
                        colorPalette="blue"
                        onClick={() => onView(item.id)}
                    >
                        {VIEW_DETAILS}
                    </Button>
                </Stack>
            </Card.Body>
        </Card.Root>
    );
}

export default ItemCard;