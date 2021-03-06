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
    <div className="py-5">
      <div className="h-full overflow-y-auto">
        <div className="container  mx-auto grid">
          <div className="flex justify-center align-center">
            <h1 className="text-xl">Frontend developer coding test</h1>
            <div className="ml-5">
              <Settings />
              </div>
          </div>
          <div className={"h-5"}></div>
          {appState.loading && <div>loading</div>}
          {appState.error && <div>{appState.error}</div>}
          {!!appState?.brewers?.length && (
            <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-3">
              <Column id={"1"} />
              <Column id={"2"} />
              <Column id={"3"} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
