import React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";
import Settings from "./settings.component";
import userEvent from "@testing-library/user-event";
import { AppContextProvider } from "../../shared/app.context";

const renderSetting = () =>
  render(
    <AppContextProvider>
      <Settings />
    </AppContextProvider>
  );

test("renders settings modal open/close", () => {
  const {  getByTestId } = renderSetting();

  const settingsButton = getByTestId(/settings/i);
  expect(settingsButton).toBeInTheDocument();

  userEvent.click(settingsButton);

  const settingsModal = getByTestId(/settings-modal/i);
  expect(settingsModal).toBeInTheDocument();

  const closeButton = getByTestId(/close-icon/i);
  expect(closeButton).toBeInTheDocument();

  userEvent.click(closeButton);
  expect(closeButton).not.toBeInTheDocument();
  expect(settingsModal).not.toBeInTheDocument();
});

test("renders options within modal with default values", () => {
  const { getByTestId } = renderSetting();
  const settingsButton = getByTestId(/settings/i);
  expect(settingsButton).toBeInTheDocument();

  userEvent.click(settingsButton);

  const themeInput = getByTestId(/theme-toggle/i) as HTMLInputElement;
  expect(themeInput).toBeInTheDocument();
  expect(themeInput.checked).toEqual(false);

  const itemsPerPageInput = getByTestId(/items-per-page/i) as HTMLInputElement;
  expect(itemsPerPageInput).toBeInTheDocument();
  expect(parseInt(itemsPerPageInput.value)).toEqual(15);
});

test.skip("cache setting right after change", () => {
  cleanup();
  Object.defineProperty(global, "localStorage", {
    value: {
      getItem: jest.fn(() => null),
      setItem: jest.fn(() => null),
    },
    writable: true,
  });

  const { getByText, getByTestId, unmount } = renderSetting();
  userEvent.click(getByText("Settings"));

  const themeInput = getByTestId(/theme-toggle/i) as HTMLInputElement;
  expect(themeInput.checked).toEqual(false);
  fireEvent.click(themeInput);
  expect((getByTestId(/theme-toggle/i) as HTMLInputElement).checked).toEqual(
    true
  );

  const itemsPerPageInput = getByTestId(/items-per-page/i) as HTMLInputElement;
  expect(itemsPerPageInput).toBeInTheDocument();
  expect(parseInt(itemsPerPageInput.value)).toEqual(15);
  fireEvent.change(itemsPerPageInput, { target: { value: "20" } });
  expect(parseInt(itemsPerPageInput.value)).toEqual(20);

  unmount();

  expect(global.localStorage.setItem).toHaveBeenCalledTimes(2);
  expect(global.localStorage.setItem).toBeCalledWith("itemsPerPage", 20);
  expect(global.localStorage.setItem).toBeCalledWith("themeMode", "dark");
});
