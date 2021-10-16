export interface Catalog{
    id?: number | any;
    name: string;
    article: string;
    price: number;
    producer?: string;
    category: string;
    weight: number;
    count: number;
}