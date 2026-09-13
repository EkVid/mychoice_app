import { useEffect, useState } from "react";
import {
    Box,
    Container,
    Heading,
    Stack,
    Text,
} from "@chakra-ui/react";

import { getItems } from "./api/items";
import type { Item } from "./commons/types/Item";
import ItemForm from "./components/Form";
import ItemList from "./components/List";

const App = () => {
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        getItems()
            .then(setItems)
            .catch(console.error);
    }, []);

    return (
        <Box minH="100vh" bg="gray.50">
            <Box bg="blue.600" color="white" py={8}>
                <Container maxW="container.lg">
                    <Heading size="xl">
                        Item Manager
                    </Heading>

                    <Text mt={2} color="blue.100">
                        Manage your Primary and Secondary items
                    </Text>
                </Container>
            </Box>

            <Container maxW="container.lg" py={10}>
                <Stack gap={8}>
                    <ItemForm
                        onItemCreated={(newItem) => {
                            setItems((prevItems) => [
                                ...prevItems,
                                newItem,
                            ]);
                        }}
                    />
                    <ItemList items={items} />
                </Stack>
            </Container>
        </Box>
    );
}

export default App;