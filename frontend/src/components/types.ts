import type { Item } from "../commons/types/Item";

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