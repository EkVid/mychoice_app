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


const ItemCard = ({ item, onView }: CardProps) => {
    return (
        <Card.Root>
            <Card.Body>
                <Stack gap={4}>
                    <Flex justify="space-between" align="center">
                        <Heading size="md">{item.name}</Heading>
                        <Badge colorPalette={item.group === "P" ? "blue" : "purple"}>
                            {item.group === "P" ? "Primary" : "Secondary"}
                        </Badge>
                    </Flex>

                    <Text fontSize="sm" color="gray.500">
                        Item #{item.id}
                    </Text>

                    <Button
                        variant="outline"
                        colorPalette="blue"
                        onClick={() => onView(item.id)}
                    >
                        View Details
                    </Button>
                </Stack>
            </Card.Body>
        </Card.Root>
    );
}

export default ItemCard;