import type { Item } from "../types/Item";

const config =  {
    DEV_URL: "http://127.0.0.1:8000/",
    SIT_URL: ".....",
    PROD_URL: "....",
} 

export const getItems = async (): Promise<Item[]> => {
    const resp = await fetch(`${config.DEV_URL}items/`);
    if(!resp.ok){
        throw new Error("Failed to fetch items");
    }

    return resp.json();
}