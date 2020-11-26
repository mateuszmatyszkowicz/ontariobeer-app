import React, { useCallback, useContext, useState } from "react";
import { setItemsPerPage, setTheme } from "../../shared/app.actions";
import { AppContext } from "../../shared/app.context";
import Modal from "../modal/modal.component";

const Settings = () => {
  const [appState, dispatch] = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const onClose = () => setOpen(false);

  const onThemeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setTheme(e.target.checked ? "dark" : "light"));
    },
    // eslint-disable-next-line
    [appState.themeMode]
  );

  const onItemsPeraPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setItemsPerPage(e.target.value));
  };

  return (
    <div>
      {open && (
        <Modal>
          <div
            className="absolute h-auto w-11/12 md:w-1/2 p-5  bg-white dark:bg-gray-700  rounded-md top-2/4 left-2/4"
            style={{ transform: "translate(-50%, -50%)" }}
            data-testid={"settings-modal"}
          >
            <div className="flex flex-col w-full h-auto ">
              <div className="flex w-full h-auto justify-center items-center">
                <div className="flex w-10/12 h-auto py-3 justify-center items-center text-2xl dark:text-white font-bold dark:bg-gray-700">
                  Settings
                </div>
                <div
                  onClick={onClose}
                  className="flex w-1/12 h-auto justify-center cursor-pointer"
                  data-testid={'close-icon'}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-x"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </div>
              </div>
              <div className="flex w-full h-auto py-10 px-2 justify-center items-center bg-gray-200 dark:bg-gray-800 rounded text-center text-gray-500 dark:text-white">
                <div className="flex flex-col flex-start">
                  <div className="p-5">
                    <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                      <input
                        type="checkbox"
                        name="toggle"
                        id="toggle"
                        onChange={onThemeChange}
                        checked={appState.themeMode === "dark"}
                        data-testid={"theme-toggle"}
                        className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                      />
                      <label
                        htmlFor="toggle"
                        className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 dark:bg-gray-900 dark:text-white cursor-pointer"
                      ></label>
                    </div>
                    <label htmlFor="toggle" className="text-xs text-gray-700 dark:text-white">
                      {appState.themeMode === "light" ? "Light" : "Dark"}
                    </label>
                  </div>
                  <div>
                    <input
                      className="rounded-lg overflow-hidden appearance-none bg-gray-400 dark:bg-gray-900 h-3 w-128"
                      type="range"
                      min="5"
                      max="40"
                      step="5"
                      name="itemsPerPage"
                      data-testid="items-per-page"
                      onChange={onItemsPeraPageChange}
                      value={appState.itemsPerPage}
                    />
                    <label
                      htmlFor="itemsPerPage"
                      className="text-sm text-gray-700 dark:text-white"
                    >
                      Items per page ({appState.itemsPerPage})
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
      <div onClick={() => setOpen(true)} data-testid={'settings'}>
        <div className="flex text-gray-600">
          <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Settings;
