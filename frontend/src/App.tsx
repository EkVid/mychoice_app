import { useEffect, useState } from "react";
import {
    Box,
    Container,
    Heading,
    Stack,
    Text,
} from "@chakra-ui/react";

import {
    getItemById,
    getItems,
} from "./api/items";
import type { Item } from "./commons/types/Item";

import ItemForm from "./components/Form";
import ItemList from "./components/List";
import ItemDetails from "./components/Details";
import { DESCRIPTION, TITLE } from "./commons/constants";

const App = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [selectedItem, setSelectedItem] =
        useState<Item | null>(null);

    useEffect(() => {
        getItems()
            .then(setItems)
            .catch(console.error);
    }, []);

    const handleView = async (id: number) => {
        try {
            const item = await getItemById(id);
            setSelectedItem(item);
        } catch (error) {
            console.error(error);
        }
    };

    const handleItemCreated = (newItem: Item) => {
        setItems((prevItems) => [
            ...prevItems,
            newItem,
        ]);
    };

    const handleItemUpdated = (updatedItem: Item) => {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === updatedItem.id
                    ? updatedItem
                    : item
            )
        );

        setSelectedItem(updatedItem);
    };

    const handleItemDeleted = (id: number) => {
        setItems((prevItems) =>
            prevItems.filter((item) => item.id !== id)
        );

        setSelectedItem(null);
    };

    return (
        <Box minH="100vh" bg="gray.50">
            <Box
                bg="blue.600"
                color="white"
                py={8}
            >
                <Container maxW="container.lg">
                    <Heading size="xl">{TITLE}</Heading>
                    <Text mt={2} color="blue.100">{DESCRIPTION}</Text>
                </Container>
            </Box>

            <Container maxW="container.lg" py={10}>
                <Stack gap={8}>
                    <ItemForm
                        onItemCreated={handleItemCreated}
                    />

                    {selectedItem && (
                        <ItemDetails
                            item={selectedItem}
                            onUpdated={handleItemUpdated}
                            onDeleted={handleItemDeleted}
                            onClose={() =>setSelectedItem(null)}
                        />
                    )}

                    <ItemList
                        items={items}
                        onView={handleView}
                    />
                </Stack>
            </Container>
        </Box>
    );
}

export default App;