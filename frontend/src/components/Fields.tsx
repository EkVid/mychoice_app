import {
    Box,
    Input,
    NativeSelect,
    Text,
} from "@chakra-ui/react";

import {
    NAME,
    GROUP,
    PRIMARY,
    SECONDARY,
    PRIMARY_ABBREVIATION,
    SECONDARY_ABBREVIATION,
} from "../commons/constants";

import { FieldsProps } from "./types";

const ItemFields = ({
    name,
    group,
    onNameChange,
    onGroupChange,
}: FieldsProps) => {
    return (
        <>
            <Box>
                <Text mb={2} fontWeight="medium">
                    {NAME}
                </Text>

                <Input
                    placeholder="Enter item name"
                    value={name}
                    onChange={(e) => onNameChange(e.target.value)}
                />
            </Box>

            <Box>
                <Text mb={2} fontWeight="medium">
                    {GROUP}
                </Text>

                <NativeSelect.Root>
                    <NativeSelect.Field
                        value={group}
                        onChange={(e) =>
                            onGroupChange(e.target.value as typeof PRIMARY_ABBREVIATION | typeof SECONDARY_ABBREVIATION)
                        }
                    >
                        <option value="P">{PRIMARY}</option>
                        <option value="S">{SECONDARY}</option>
                    </NativeSelect.Field>
                </NativeSelect.Root>
            </Box>
        </>
    );
};

export default ItemFields;