import { Brewer } from "../../shared/app.types";
import { ListItem } from "../list/list.component";

export const getBeersPaginated = (
  data: Brewer[],
  page: number,
  itemsPerPage: number
): { beers: ListItem[]; totalCount: number } => {
  const beers =
    data?.slice(0, itemsPerPage * page)?.map((brewers) => ({
      id: brewers.productId.toString(),
      name: brewers.name,
      type: brewers.type,
      thumbnail: brewers.thumbnail,
      ppl: pricePerLiter(brewers.size, brewers.price),
    })) || [];

  return {
    beers,
    totalCount: data.length,
  };
};

const pricePerLiter = (size: string, price: number) => {
  const [packCount, , , , , canSize] = size.split(" ");
  const pricePerLiter =
    (price * 1000) / (parseInt(packCount) * parseInt(canSize));

  return `${pricePerLiter.toFixed(2)}`;
};
