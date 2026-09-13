import { useEffect, useState } from "react";
import {
    Badge,
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
import {
    deleteItemById,
    patchItemById,
} from "../api/items";

import type { DetailsProps } from "./types";

const ItemDetails = ({
    item,
    onUpdated,
    onDeleted,
    onClose,
}: DetailsProps) => {
    const [isEditing, setIsEditing] = useState(false);

    const [name, setName] = useState(item.name);
    const [group, setGroup] = useState<"P" | "S">(item.group);

    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        setName(item.name);
        setGroup(item.group);
        setIsEditing(false);
        setError("");
    }, [item]);

    const handleSave = async () => {
        if (!name.trim()) {
            setError("Name is required.");
            return;
        }

        try {
            setIsSaving(true);
            setError("");

            const updatedItem = await patchItemById(item.id, {
                name: name.trim(),
                group,
            });

            onUpdated(updatedItem);
            setIsEditing(false);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Failed to update item."
            );
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async () => {
        try {
            setIsDeleting(true);
            setError("");

            await deleteItemById(item.id);

            onDeleted(item.id);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Failed to delete item."
            );
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <Card.Root>
            <Card.Header>
                <Flex justify="space-between" align="center">
                    <Heading size="md">
                        {isEditing ? "Edit Item" : "Item Details"}
                    </Heading>

                    <Button
                        variant="ghost"
                        bg="white"
                        color="black"
                        onClick={onClose}
                    >
                        Close
                    </Button>
                </Flex>
            </Card.Header>

            <Card.Body>
                <Stack gap={5}>
                    {isEditing ? (
                        <>
                            <Box>
                                <Text
                                    mb={2}
                                    fontWeight="medium"
                                >
                                    Name
                                </Text>

                                <Input
                                    value={name}
                                    onChange={(e) =>
                                        setName(
                                            e.target.value
                                        )
                                    }
                                />
                            </Box>

                            <Box>
                                <Text
                                    mb={2}
                                    fontWeight="medium"
                                >
                                    Group
                                </Text>

                                <NativeSelect.Root>
                                    <NativeSelect.Field
                                        value={group}
                                        onChange={(e) =>
                                            setGroup(e.target.value as | "P" | "S")
                                        }
                                    >
                                        <option value="P">Primary</option>

                                        <option value="S">Secondary</option>
                                    </NativeSelect.Field>
                                </NativeSelect.Root>
                            </Box>

                            {error && (
                                <Text color="red.500">{error}</Text>
                            )}

                            <Flex gap={3}>
                                <Button
                                    colorPalette="blue"
                                    onClick={handleSave}
                                    loading={isSaving}
                                >
                                    Save Changes
                                </Button>

                                <Button
                                    variant="outline"
                                    onClick={() =>setIsEditing(false)}
                                >
                                    Cancel
                                </Button>
                            </Flex>
                        </>
                    ) : (
                        <>
                            <Flex
                                justify="space-between"
                                align="center"
                            >
                                <Heading size="lg">{item.name}</Heading>

                                <Badge
                                    colorPalette={item.group === "P" ? "blue" : "purple"}
                                >
                                    {item.group === "P" ? "Primary" : "Secondary"}
                                </Badge>
                            </Flex>

                            <Stack gap={2}>
                                <Text>
                                    <strong>ID:</strong>{" "}
                                    {item.id}
                                </Text>

                                <Text>
                                    <strong>Created:</strong>{" "}
                                    {new Date(item.created_at).toLocaleString()}
                                </Text>

                                <Text>
                                    <strong>Updated:</strong>{" "}
                                    {new Date(item.updated_at).toLocaleString()}
                                </Text>
                            </Stack>

                            {error && (
                                <Text color="red.500">{error}</Text>
                            )}

                            <Flex gap={3}>
                                <Button
                                    colorPalette="blue"
                                    onClick={() =>setIsEditing(true)}
                                >
                                    Edit
                                </Button>

                                <Button
                                    colorPalette="red"
                                    variant="outline"
                                    onClick={handleDelete}
                                    loading={isDeleting}
                                >
                                    Delete
                                </Button>
                            </Flex>
                        </>
                    )}
                </Stack>
            </Card.Body>
        </Card.Root>
    );
}

export default ItemDetails;