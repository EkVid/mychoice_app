import { useState } from "react";
import {
    Button,
    Card,
    Flex,
    Heading,
    Stack,
    Text,
} from "@chakra-ui/react";
import { createItem } from "../api/items";
import type { FormProps, ItemGroup } from "./types";
import { 
    CREATE_ITEM, 
    FAIL_CREATE, 
    SAVE_ERROR,
    PRIMARY_ABBREVIATION
} from "../commons/constants";
import ItemFields from "./Fields";

const ItemForm = ({ onItemCreated }: FormProps) => {
    const [name, setName] = useState("");
    const [group, setGroup] =
        useState<ItemGroup>(PRIMARY_ABBREVIATION);

    const [error, setError] = useState("");
    const [isCreating, setIsCreating] = useState(false);

    const handleSubmit = async () => {
        if (!name.trim()) {
            setError(SAVE_ERROR);
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
                err instanceof Error ? err.message : FAIL_CREATE
            );
        } finally {
            setIsCreating(false);
        }
    };

    return (
        <Card.Root>
            <Card.Header>
                <Heading size="md">{CREATE_ITEM}</Heading>
            </Card.Header>

            <Card.Body>
                <Stack gap={4}>
                    <ItemFields
                        name={name}
                        group={group}
                        onNameChange={setName}
                        onGroupChange={setGroup}
                    />

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
                            {CREATE_ITEM}
                        </Button>
                    </Flex>
                </Stack>
            </Card.Body>
        </Card.Root>
    );
}

export default ItemForm;