export interface GroceryItem {
    id: string;
    name: string;
    purchased: boolean;
}

export interface GroceryList {
    _id: string;
    title: string;
    color: string;
    items?: GroceryItem[];
    last_updated: string;
}

export interface APIResponse<T> {
    data: T;
    error: any;
    message: any;
}

export interface PUTReqGroceryList {
    _id: string;
    title: string;
    color: string;
}

export interface POSTReqGroceryItem {
    _id: string;
    name: string
}