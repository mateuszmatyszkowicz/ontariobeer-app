import React, { createContext, useEffect, useReducer } from "react";

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

export const initialState: AppState = {
  themeMode: "light",
  sortBy: "type",
  itemsPerPage: 15,
  brewers: [],
  byBrewers: {},
  loading: false,
  error: undefined,
};

export const stateInitializer = (initialValue = initialState): AppState => {
  const themeMode =
    (localStorage.getItem("themeMode") as AppState["themeMode"]) ||
    initialValue.themeMode;

  return {
    ...initialValue,
    themeMode,
  };
};

export const appReducer = (state: AppState, action: any): AppState => {
  switch (action.type) {
    case "app/SET_ITEMS_PER_PAGE": {
      return {
        ...state,
        itemsPerPage: action.payload.itemsPerPage,
      };
    }
    case "app/SET_THEME":
      return {
        ...state,
        themeMode: action.payload.theme,
      };
    case "app/SET_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "app/SET_ERROR":
      return {
        ...state,
        loading: false,
        error: "Something went wrong...",
      };
    case "app/SET_DATA":
      const byBrewers = action.payload.data
        ?.map(
          (data: any) =>
            ({
              type: data.type,
              brewer: data.brewer,
              productId: data.product_id,
              name: data.name,
              price: data.price,
              thumbnail: data.image_url,
              size: data.size,
            } as Brewer)
        )
        ?.reduce(
          //@ts-ignore
          (prev, curr) => {
            if (curr.brewer && prev[curr.brewer]) {
              return {
                ...prev,
                [curr.brewer]: [...prev[curr.brewer], curr],
              };
            } else {
              return {
                ...prev,
                [curr.brewer]: [curr],
              };
            }
          },
          {}
        );

      return {
        ...state,
        loading: false,
        byBrewers,
        brewers: Object.keys(byBrewers),
      };
    default:
      throw new Error();
  }
};

//@ts-ignore
export const AppContext = createContext<[AppState, React.Dispatch<any>]>({});
export const AppContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(
    appReducer,
    initialState,
    stateInitializer
  );
  const { themeMode, itemsPerPage } = state;
  // Perhaps we could serialize whole appState and save it to localStorage some window event.
  useEffect(() => {
    localStorage.setItem("themeMode", themeMode);
  }, [themeMode]);

  useEffect(() => {
    localStorage.setItem("itemsPerPage", itemsPerPage.toString());
  }, [itemsPerPage]);

  return (
    <AppContext.Provider value={[state, dispatch]}>
      {children}
    </AppContext.Provider>
  );
};

export const setLoading = () => ({ type: "app/SET_LOADING" });
export const setError = () => ({ type: "app/SET_ERROR" });
export const setData = (data: any) => ({
  type: "app/SET_DATA",
  payload: { data },
});
export const setTheme = (theme: "light" | "dark") => ({
  type: "app/SET_THEME",
  payload: { theme },
});
export const setItemsPerPage = (itemsPerPage: number) => ({
  type: "app/SET_ITEMS_PER_PAGE",
  payload: { itemsPerPage },
});
