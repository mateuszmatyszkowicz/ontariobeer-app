import React, { createContext, useEffect, useReducer } from "react";
import { ITEMS_PER_PAGE_KEY, THEME_STORE_KEY } from "./app.constants";
import { appReducer } from "./app.reducer";
import { AppState } from "./app.types";
import { stateInitializer } from "./app.utils";

export const initialState: AppState = {
  themeMode: "light",
  sortBy: "type",
  itemsPerPage: 15,
  brewers: [],
  byBrewers: {},
  loading: false,
  error: undefined,
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
    if (themeMode === "dark")
      document?.querySelector("html")?.classList.add("dark");
    if (themeMode !== "dark")
      document?.querySelector("html")?.classList.remove("dark");

    localStorage.setItem(THEME_STORE_KEY, themeMode);
  }, [themeMode]);

  useEffect(() => {
    localStorage.setItem(ITEMS_PER_PAGE_KEY, itemsPerPage.toString());
  }, [itemsPerPage]);

  return (
    <AppContext.Provider value={[state, dispatch]}>
      {children}
    </AppContext.Provider>
  );
};
