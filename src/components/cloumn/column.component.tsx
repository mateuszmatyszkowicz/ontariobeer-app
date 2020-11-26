import React, { useCallback, useContext, useEffect, useState } from "react";
import { createColumnStoreKey } from "../../shared/app.constants";
import { AppContext } from "../../shared/app.context";
import List, { ListItem } from "../list/list.component";
import { getBeersPaginated } from "./column.logic";

type ColumnProps = {
  id: string;
};

const Column = ({ id }: ColumnProps) => {
  const [appState] = useContext(AppContext);
  const { byBrewers, brewers, itemsPerPage } = appState;
  const options = brewers;
  const storageId = createColumnStoreKey(id);
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
    if (byBrewers?.[selectValue]) {
      const { beers, totalCount } = getBeersPaginated(
        byBrewers[selectValue],
        page,
        itemsPerPage
      );

      setBeers(beers);
      setTotalCount(totalCount);
    }
  }, [page, selectValue, byBrewers, itemsPerPage]);

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
