export interface Cloth {
    id: string;
    description: string;
    price: number;
    discount_price?: number;
    discount?: number;
    purchase_url: string;
    image_url: string;
    brand: string;
    section: string;
    type: string;
    color?: string;
    material?: string;
    size?: string;
    print?: string;
    in_discount?: boolean;
    favorite?: boolean;
}
