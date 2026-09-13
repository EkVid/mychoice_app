import { useEffect, useState } from "react";
import { getItems } from "../api/items";
import { Item } from "../types/Item";

function ItemList() {
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        getItems()
            .then(setItems)
            .catch(console.error);
    }, []);

    return (
        <div>
            <h1>Items</h1>

            {items.map((item) => (
                <div key={item.id}>
                    <p>{item.name}</p>
                    <p>{item.group}</p>
                </div>
            ))}
        </div>
    );
}

export default ItemList;