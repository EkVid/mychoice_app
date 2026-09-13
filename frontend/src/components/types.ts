import type { Item } from "../commons/types/Item";
import { PRIMARY_ABBREVIATION, SECONDARY_ABBREVIATION } from "../commons/constants";

export interface CardProps {
    item: Item;
    onView: (id: number) => void;
}

export interface ListProps {
    items: Item[];
    onView: (id: number) => void;
}

export interface FormProps {
    onItemCreated: (item: Item) => void;
}

export interface DetailsProps {
    item: Item;
    onUpdated: (item: Item) => void;
    onDeleted: (id: number) => void;
    onClose: () => void;
}

export interface FieldsProps {
    name: string;
    group: ItemGroup;
    onNameChange: (name: string) => void;
    onGroupChange: (group: ItemGroup) => void;
};

export type ItemGroup = typeof PRIMARY_ABBREVIATION | typeof SECONDARY_ABBREVIATION;