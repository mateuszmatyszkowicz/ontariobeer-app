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

  return open ? (
    <Modal onClose={onClose}>
      <div
        data-testid={"settings-modal"}
        style={{ width: 300, height: 300, backgroundColor: "red" }}
      >
        <div>
          <input
            type="checkbox"
            name="toggle"
            data-testid={"theme-toggle"}
            checked={appState.themeMode === "dark"}
            onChange={onThemeChange}
          />
          <label htmlFor="toggle">Dark</label>
        </div>
        <div>
          <label htmlFor="items-per-page">Items per page:</label>
          <input
            name="items-per-page"
            data-testid={"items-per-page"}
            type="number"
            defaultValue={appState.itemsPerPage}
            maxLength={2}
            min={15}
            max={30}
            step={5}
            onChange={onItemsPeraPageChange}
          />
        </div>
      </div>
      <button onClick={onClose}>Close</button>
    </Modal>
  ) : (
    <div onClick={() => setOpen(true)}>Settings</div>
  );
};

export default Settings;
