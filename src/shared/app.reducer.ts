import { AppState, Brewer } from "./app.types";

export const appReducer = (state: AppState, action: any): AppState => {
  switch (action.type) {
    case "app/SET_ITEMS_PER_PAGE": {
      return {
        ...state,
        itemsPerPage:
          action.payload.itemsPerPage && parseInt(action.payload.itemsPerPage),
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
