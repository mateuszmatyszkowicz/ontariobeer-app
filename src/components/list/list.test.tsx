import React from "react";
import { render } from "@testing-library/react";
import List, { ListItem } from "./list.component";

const loadMore = jest.fn;

test("renders empty list", () => {
  const { getByTestId } = render(
    <List data={[]} totalCount={0} loadMore={loadMore} />
  );

  const list = getByTestId(/list/i);
  expect(list).toBeInTheDocument();
  expect(list).toBeEmptyDOMElement();
});

test("renders list with data", () => {
  const data: ListItem[] = [
    { id: "x", name: "name", ppl: "1.0", thumbnail: "thumbnail", type: "type" },
  ];
  const { getAllByTestId } = render(
    <List data={data} totalCount={data.length} loadMore={loadMore} />
  );

  const listOfItems = getAllByTestId(/list-item/i);
  expect(listOfItems).toHaveLength(data.length);
});

test("renders load more button if there is more to load", async () => {
  const data: ListItem[] = Array.from({ length: 11 }, (v, k) => ({
    id: k.toString(),
    name: "name",
    ppl: "1.0",
    thumbnail: "thumbnail",
    type: "type",
  }));
  const { findByText } = render(
    <List data={data} totalCount={data.length + 10} loadMore={loadMore} />
  );

  const loadMoreBtn = await findByText(/load more/i);
  expect(loadMoreBtn).toBeInTheDocument();
});
