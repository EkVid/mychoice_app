export interface ItemBase {
    name: string;
    group: "P" | "S";
}

export interface Item extends ItemBase {
    id: number;
    created_at: string;
    updated_at: string;
}