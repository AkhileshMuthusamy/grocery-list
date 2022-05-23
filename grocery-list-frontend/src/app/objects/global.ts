export interface GroceryItem {
    id: string;
    name: string;
    purchased: boolean;
}

export interface GroceryList {
    _id: string;
    title: string;
    color: string;
    items: GroceryItem[];
}

export interface APIResponse<T> {
    data: T;
    error: any;
    message: any;
}