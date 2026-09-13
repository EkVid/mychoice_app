import { useState } from "react";
import {
    Box,
    Button,
    Card,
    Flex,
    Heading,
    Input,
    NativeSelect,
    Stack,
    Text,
} from "@chakra-ui/react";
import { createItem } from "../api/items";
import type { FormProps } from "./types";

const ItemForm = ({ onItemCreated }: FormProps) => {
    const [name, setName] = useState("");
    const [group, setGroup] =
        useState<"P" | "S">("P");

    const [error, setError] = useState("");
    const [isCreating, setIsCreating] = useState(false);

    const handleSubmit = async () => {
        if (!name.trim()) {
            setError("Name is required.");
            return;
        }

        try {
            setIsCreating(true);
            setError("");

            const newItem = await createItem({
                name: name.trim(),
                group,
            });

            onItemCreated(newItem);

            setName("");
            setGroup("P");
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Failed to create item."
            );
        } finally {
            setIsCreating(false);
        }
    };

    return (
        <Card.Root>
            <Card.Header>
                <Heading size="md">Create Item</Heading>
            </Card.Header>

            <Card.Body>
                <Stack gap={4}>
                    <Box>
                        <Text mb={2} fontWeight="medium">
                            Name
                        </Text>

                        <Input
                            placeholder="Enter item name"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                        />
                    </Box>

                    <Box>
                        <Text mb={2} fontWeight="medium">
                            Group
                        </Text>

                        <NativeSelect.Root>
                            <NativeSelect.Field
                                value={group}
                                onChange={(e) =>
                                    setGroup(e.target.value as "P" | "S")
                                }
                            >
                                <option value="P">Primary</option>
                                <option value="S">Secondary</option>
                            </NativeSelect.Field>
                        </NativeSelect.Root>
                    </Box>

                    {error && (
                        <Text color="red.500" fontSize="sm">
                            {error}
                        </Text>
                    )}

                    <Flex justify="flex-end">
                        <Button
                            colorPalette="blue"
                            onClick={handleSubmit}
                            loading={isCreating}
                        >
                            Create Item
                        </Button>
                    </Flex>
                </Stack>
            </Card.Body>
        </Card.Root>
    );
}

export default ItemForm;