export interface Filters {
    type: string | null;
    color: string | null;
    brand: string | null;
    size: string | null;
    section: string | null;
    maxPrice: number | null;
    minPrice: number | null;
    orderMajorMenor: boolean;
    orderMenorMajor: boolean;
    onlyOffers: boolean;
    [key: string]: any;  // Permet altres claus dinàmiques si cal
}

// Valors inicials predeterminats
export const defaultFilters: Filters = {
    type: null,
    color: null,
    brand: null,
    size: null,
    section: null,
    maxPrice: null,
    minPrice: null,
    orderMajorMenor: false,
    orderMenorMajor: false,
    onlyOffers: false,
};
