import React, { useCallback, useContext, useEffect, useState } from "react";
import { AppContext } from "./app-context";
import List, { ListItem } from "./list.component";

type ColumnProps = {
  id: string;
};

const Column = ({ id }: ColumnProps) => {
  const [appState] = useContext(AppContext);
  const { byBrewers, brewers, itemsPerPage } = appState;
  const options = brewers;
  const storageId = `column-${id}`;
  const [selectValue, setSelectValue] = useState("");
  const [beers, setBeers] = useState<ListItem[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const storedValue = localStorage.getItem(storageId);
    if (storedValue) setSelectValue(storedValue);
  }, [storageId]);

  useEffect(() => {
    return () => {
      if (selectValue) {
        localStorage.setItem(storageId, selectValue);
      }
    };
  }, [storageId, selectValue]);

  useEffect(() => {
    // 15- as configurable variable
    const beers: ListItem[] =
      byBrewers?.[selectValue]?.slice(0, itemsPerPage)?.map((brewers) => ({
        id: brewers.productId.toString(),
        name: brewers.name,
        type: brewers.type,
        thumbnail: brewers.thumbnail,
        ppl: brewers.price.toString(), // calculate price per liter
      })) || [];
    setBeers(beers);
    setTotalCount(byBrewers?.[selectValue]?.length || 0);
  }, [selectValue, byBrewers, itemsPerPage]);

  useEffect(() => {
    const beers: ListItem[] =
      byBrewers?.[selectValue]
        ?.slice(0, itemsPerPage * page)
        ?.map((brewers) => ({
          id: brewers.productId.toString(),
          name: brewers.name,
          type: brewers.type,
          thumbnail: brewers.thumbnail,
          ppl: brewers.price.toString(), // calculate price per liter
        })) || [];
    setBeers(beers);
    setTotalCount(byBrewers?.[selectValue]?.length || 0);
  }, [page, selectValue, itemsPerPage, byBrewers]);

  const onLoadMore = useCallback(() => {
    setPage(page + 1);
  }, [page]);

  return (
    <div data-testid={`column-${id}`}>
      <select
        value={selectValue}
        data-testid={"select"}
        onChange={(event) => {
          setSelectValue(event.target.value);
        }}
      >
        {options?.map((option) => (
          <option value={option} key={option} data-testid={"select-option"}>
            {option}
          </option>
        ))}
        <option
          value={""}
          hidden={true}
          disabled={true}
          children={"Select your brewery"}
        />
      </select>
      <List data={beers} totalCount={totalCount} loadMore={onLoadMore} />
    </div>
  );
};

export default Column;
