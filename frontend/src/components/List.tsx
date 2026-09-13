import {
    Card,
    Heading,
    SimpleGrid,
    Text,
} from "@chakra-ui/react";
import type { ListProps } from "./types";
import ItemCard from "./Card";


const ItemList = ({ items, onView }: ListProps) => {
    return (
        <div>
            <Heading size="lg" mb={4}>Items</Heading>

            {items.length === 0 ? (
                <Card.Root>
                    <Card.Body>
                        <Text color="gray.500">No items found</Text>
                    </Card.Body>
                </Card.Root>
            ) : (
                <SimpleGrid
                    columns={{ base: 1, md: 2, lg: 3 }}
                    gap={4}
                >
                    {items.map((item) => (
                        <ItemCard
                            key={item.id}
                            item={item}
                            onView={onView}
                        />
                    ))}
                </SimpleGrid>
            )}
        </div>
    );
}

export default ItemList;