import React from "react";
import {
  cleanup,
  render,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import App from "./App";

// eslint-disable-next-line
import beersApiResponse from "./__mocks__/beers-api-response.json";
import { AppContextProvider } from "./app-context";

const BREWER_OPTIONS = [
  "Molson",
  "Lake Of Bays Brewing",
  "Hockley Valley Brewing Company",
];

beforeEach(() => {
  cleanup();
  // @ts-ignore
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(beersApiResponse),
    })
  );
});


function renderApp() {
  return render(
    <AppContextProvider>
      <App />
    </AppContextProvider>
  );
}

test("renders application", async () => {
  const { findByText } = renderApp();

  const headerContent = await findByText(/frontend developer coding test/i);
  expect(headerContent).toBeInTheDocument();
});

test("should call api at first render", async () => {
  renderApp();

  await waitFor(() => expect(fetch).toBeCalledWith("/beers"));
  await waitFor(() => expect(fetch).toBeCalledTimes(1));
});

test("should render loading message", async () => {
  const { findByText } = renderApp();
  const loading = await findByText(/loading/i);

  expect(loading).toBeDefined();
});

test("should reder error message", async () => {
  // @ts-ignore
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.reject({
      json: () => Promise.reject(beersApiResponse),
    })
  );
  const { findByText, queryByText } = renderApp();
  await waitForElementToBeRemoved(() => queryByText("loading"));
  await waitFor(() => expect(fetch).toBeCalledWith("/beers"));
  await findByText("Something went wrong...");
});

test("should render options based on fetch data", async () => {
  const { findByTestId, findByText } = renderApp();

  const visibleLoading = await findByText("loading");
  const visibleColumn = await findByTestId("column-1");
  const visibleOptions = await visibleColumn.getElementsByTagName("option");
  expect(visibleOptions[0].value).toEqual(BREWER_OPTIONS[0]);
  expect(visibleOptions[1].value).toEqual(BREWER_OPTIONS[1]);
  expect(visibleOptions[2].value).toEqual(BREWER_OPTIONS[2]);
  expect(visibleLoading).not.toBeInTheDocument();
});
