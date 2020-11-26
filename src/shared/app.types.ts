
export type Brewer = {
    productId: number;
    name: string;
    size: string;
    price: number;
    thumbnail: string;
    type: string;
    brewer: string;
  };
  
  export type AppState = {
    themeMode: "light" | "dark";
    sortBy: "type" | "name" | "price";
    itemsPerPage: number;
    brewers?: string[];
    byBrewers?: Record<string, Brewer[]>;
    loading: boolean;
    error?: string;
  };