import type { Item, ItemBase } from "../commons/types/Item";
import { 
    DEV_URL,
    SIT_URL,
    PROD_URL,
    items
} from "../commons/constants";

const config =  {
    DEV_URL: DEV_URL,
    SIT_URL: SIT_URL,
    PROD_URL: PROD_URL,
} 

export const getItems = async (): Promise<Item[]> => {
    const resp = await fetch(`${config.DEV_URL}${items}/`);
    if(!resp.ok){
        throw new Error("Failed to fetch items");
    }

    return resp.json();
}

export const createItem = async (item: ItemBase): Promise<Item> => {
    const resp = await fetch(`${config.DEV_URL}${items}/`, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify(item)
    });

    if(!resp.ok){
        throw new Error("Failed to create new item");
    }

    const data = await resp.json();

    return data;
} 