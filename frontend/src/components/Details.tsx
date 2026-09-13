import { useEffect, useState } from "react";
import {
    Badge,
    Button,
    Card,
    Flex,
    Heading,
    Stack,
    Text,
} from "@chakra-ui/react";
import {
    deleteItemById,
    patchItemById,
} from "../api/items";

import type { DetailsProps, ItemGroup } from "./types";
import { 
    PRIMARY_ABBREVIATION, 
    SECONDARY_ABBREVIATION,
    SAVE_ERROR,
    FAIL_PATCH,
    FAIL_DELETE,
    ITEM_EDIT,
    ITEM_DETAILS,
    CLOSE,
    PRIMARY,
    SECONDARY,
    SAVE_CHANGES,
    CANCEL,
    EDIT,
    DELETE,
    ID,
    CREATED,
    UPDATED
} from "../commons/constants";
import ItemFields from "./Fields";

const ItemDetails = ({
    item,
    onUpdated,
    onDeleted,
    onClose,
}: DetailsProps) => {
    const [isEditing, setIsEditing] = useState(false);

    const [name, setName] = useState(item.name);
    const [group, setGroup] = useState<ItemGroup>(item.group);

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
            setError(SAVE_ERROR);
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
                err instanceof Error ? err.message : FAIL_PATCH
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
                err instanceof Error ? err.message : FAIL_DELETE
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
                        {isEditing ? ITEM_EDIT : ITEM_DETAILS}
                    </Heading>

                    <Button
                        variant="ghost"
                        bg="white"
                        color="black"
                        onClick={onClose}
                    >
                        {CLOSE}
                    </Button>
                </Flex>
            </Card.Header>

            <Card.Body>
                <Stack gap={5}>
                    {isEditing ? (
                        <>
                            <ItemFields
                                name={name}
                                group={group}
                                onNameChange={setName}
                                onGroupChange={setGroup}
                            />

                            {error && (
                                <Text color="red.500">
                                    {error}
                                </Text>
                            )}

                            <Flex gap={3}>
                                <Button
                                    colorPalette="blue"
                                    onClick={handleSave}
                                    loading={isSaving}
                                >
                                    {SAVE_CHANGES}
                                </Button>

                                <Button
                                    variant="outline"
                                    onClick={() => setIsEditing(false)}
                                >
                                    {CANCEL}
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
                                    colorPalette={item.group === PRIMARY_ABBREVIATION ? "blue" : "purple"}
                                >
                                    {item.group === PRIMARY_ABBREVIATION ? PRIMARY : SECONDARY}
                                </Badge>
                            </Flex>

                            <Stack gap={2}>
                                <Text>
                                    <strong>{ID}:</strong>{" "}
                                    {item.id}
                                </Text>

                                <Text>
                                    <strong>{CREATED}:</strong>{" "}
                                    {new Date(item.created_at).toLocaleString()}
                                </Text>

                                <Text>
                                    <strong>{UPDATED}:</strong>{" "}
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
                                    {EDIT}
                                </Button>

                                <Button
                                    colorPalette="red"
                                    variant="outline"
                                    onClick={handleDelete}
                                    loading={isDeleting}
                                >
                                    {DELETE}
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