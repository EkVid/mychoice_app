export interface Item {
    id: number;
    name: string;
    group: "Primary" | "Secondary";
    created_at: string;
    updated_at: string;
}