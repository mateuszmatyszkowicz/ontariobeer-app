import { initialState } from "./app.context";
import { ITEMS_PER_PAGE_KEY, THEME_STORE_KEY } from "./app.constants";
import { AppState } from "./app.types";

export const stateInitializer = (initialValue = initialState): AppState => {
  const themeMode =
    localStorage.getItem(THEME_STORE_KEY) || initialValue.themeMode;
  const storedItemsPerPage = localStorage.getItem(ITEMS_PER_PAGE_KEY);
  const itemsPerPage =
    (storedItemsPerPage && parseInt(storedItemsPerPage)) ||
    initialValue.itemsPerPage;

  return {
    ...initialValue,
    themeMode: themeMode as AppState["themeMode"],
    itemsPerPage,
  };
};
