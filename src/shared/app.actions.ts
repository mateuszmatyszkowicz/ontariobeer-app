
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
export const setItemsPerPage = (itemsPerPage: string) => ({
  type: "app/SET_ITEMS_PER_PAGE",
  payload: { itemsPerPage },
});