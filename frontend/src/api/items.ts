import type { Item, ItemBase } from "../commons/types/Item";
import { 
    ITEMS,
    FAIL_FETCH,
    FAIL_CREATE,
    FAIL_DELETE,
    FAIL_PATCH
} from "../commons/constants";
import { config } from "./config";

const DOMAIN = config.DEV_URL

export const getItems = async (): Promise<Item[]> => {
    const resp = await fetch(`${DOMAIN}${ITEMS}/`);
    if(!resp.ok){
        throw new Error(FAIL_FETCH);
    }

    return resp.json();
}

export const createItem = async (item: ItemBase): Promise<Item> => {
    const resp = await fetch(`${DOMAIN}${ITEMS}/`, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify(item)
    });

    if(!resp.ok){
        throw new Error(FAIL_CREATE);
    }

    const data = await resp.json();

    return data;
} 

export const getItemById = async (id: number) => {
    const resp = await fetch(`${DOMAIN}${ITEMS}/${id}/`);
    if(!resp.ok){
        throw new Error(FAIL_FETCH);
    }

    return resp.json();
}

export const patchItemById = async (id: number, updated_item: Item): Promise<Item> => {
    const resp = await fetch(`${DOMAIN}${ITEMS}/${id}/`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updated_item)
    });

    if(!resp.ok){
        throw new Error(FAIL_PATCH);
    }

    const data = await resp.json();

    return data;
}

export const deleteItemById = async (id: number) => {
    const resp = await fetch(`${DOMAIN}${ITEMS}/${id}/`, {
        method: "DELETE",
    });

    if(!resp.ok){
        throw new Error(FAIL_DELETE);
    }
}