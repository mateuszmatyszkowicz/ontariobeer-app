import React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";
import Column from "./column.component";
import { AppContext, initialState } from "../../shared/app.context";
import { AppState, Brewer } from "../../shared/app.types";

const COLUMN_TEST_ID = "test";
const OPTIONS_TEST = ["a", "b", "c"];
const BREWERS = {
  a: [
    {
      productId: 123,
      name: "name",
      type: "type",
      size: "1  x  Can 1000 ml",
      price: 30,
      thumbnail: "thumbnail",
      brewer: "brewer",
    },
  ],
};

const BREWERS_BIG_LIST = {
  a: [
    ...Array.from(
      { length: 99 },
      (v: any, k: number) =>
        ({
          productId: k,
          name: "name",
          type: "type",
          size: "1  x  Can 1000 ml",
          price: 30,
          thumbnail: "thumbnail",
          brewer: "brewer",
        } as Brewer)
    ),
  ],
};

beforeEach(() => {
  cleanup();
  Object.defineProperty(global, "localStorage", {
    value: {
      getItem: jest.fn(() => null),
      setItem: jest.fn(() => null),
    },
    writable: true,
  });
});

const d = jest.fn;

const renderColumn = (
  stateValue: Partial<AppState> = { brewers: OPTIONS_TEST, byBrewers: BREWERS }
) => {
  return render(
    <AppContext.Provider value={[{ ...initialState, ...stateValue }, d]}>
      <Column id={COLUMN_TEST_ID} />
    </AppContext.Provider>
  );
};

test("renders column", () => {
  const { getByTestId } = renderColumn();

  const column = getByTestId(/column-test/i);
  expect(column).toBeInTheDocument();
});

test("renders column to be empty at begining", () => {
  const { getByTestId } = renderColumn();

  const column = getByTestId("list");
  expect(column).toBeEmptyDOMElement();
});

test("renders select input inside column", () => {
  const { getByDisplayValue } = renderColumn();

  expect(getByDisplayValue(/select your brewer/i)).toBeInTheDocument();
});

test("should renders options accordingly to props", () => {
  const { getAllByTestId } = renderColumn();

  const options = getAllByTestId("select-option") as HTMLOptionElement[];
  expect(options).toHaveLength(3);
  expect(options[0].selected).toBeFalsy();
  expect(options[1].selected).toBeFalsy();
  expect(options[2].selected).toBeFalsy();
});

test("should renders selected option", () => {
  const { getAllByTestId, getByTestId } = renderColumn();

  fireEvent.change(getByTestId("select"), {
    target: { value: OPTIONS_TEST[1] },
  });
  const options = getAllByTestId("select-option") as HTMLOptionElement[];
  expect(options[0].selected).toBeFalsy();
  expect(options[1].selected).toBeTruthy();
  expect(options[2].selected).toBeFalsy();
});

test("should get lates selected value from localStorage if any", () => {
  renderColumn();
  expect(global.localStorage.getItem).toHaveBeenCalledTimes(1);
  expect(global.localStorage.getItem).toBeCalledWith(
    `column-${COLUMN_TEST_ID}`
  );
});

test("should save selected value to localStorage if any", () => {
  const { unmount, getByTestId } = renderColumn();
  fireEvent.change(getByTestId("select"), {
    target: { value: OPTIONS_TEST[1] },
  });

  expect(global.localStorage.setItem).toHaveBeenCalledTimes(0);

  unmount();

  expect(global.localStorage.setItem).toHaveBeenCalledTimes(1);
  expect(global.localStorage.setItem).toBeCalledWith(
    `column-${COLUMN_TEST_ID}`,
    OPTIONS_TEST[1]
  );
});

test("should render appropirate list based on selected option", async () => {
  const { findByText, getByTestId , findByAltText} = renderColumn();
  fireEvent.change(getByTestId("select"), {
    target: { value: OPTIONS_TEST[0] },
  });
  expect(await findByText(/name/i)).toBeInTheDocument();
  expect(await findByAltText("name")).toBeInTheDocument();
  expect(await findByText(/type/i)).toBeInTheDocument();
  expect(await findByText(/30.00/i)).toBeInTheDocument();
});

test("should render first 25 if are available", async () => {
  const listElementsCount = 25;
  const { findAllByTestId, getByTestId } = renderColumn({
    brewers: OPTIONS_TEST,
    byBrewers: BREWERS_BIG_LIST,
    itemsPerPage: listElementsCount,
  });
  fireEvent.change(getByTestId("select"), {
    target: { value: OPTIONS_TEST[0] },
  });

  const beerList = await findAllByTestId(/list-item-/i);

  expect(beerList).toHaveLength(listElementsCount);
});
