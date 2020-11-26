import React, { useContext, useEffect } from "react";
import { AppContext } from "./shared/app.context";
import Column from "./components/cloumn/column.component";
import Settings from "./components/settings/settings.component";
import { setData, setError, setLoading } from "./shared/app.actions";

function App() {
  const [appState, dispatch] = useContext(AppContext);

  useEffect(() => {
    const fetchBeers = async () => {
      try {
        dispatch(setLoading());
        const data = await fetch("/beers");
        const jsonData = await data.json();

        dispatch(setData(jsonData));
      } catch (e) {
        dispatch(setError());
      }
    };

    fetchBeers();
    //eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <Settings />
      <h1>Frontend developer coding test</h1>
      {appState.loading && <div>loading</div>}
      {appState.error && <div>{appState.error}</div>}
      {!!appState?.brewers?.length && (
        <div>
          <Column id={"1"} />
          <Column id={"2"} />
          <Column id={"3"} />
        </div>
      )}
    </div>
  );
}

export default App;
