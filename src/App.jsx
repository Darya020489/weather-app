import "./App.css";
import Favicon from "react-favicon";
import TownWeather from "./components/TownWeather";
import MainLayout from "./layouts/MainLayout";
import {setTheme} from "./store/slices/themeSlice";
import { Route, Routes } from "react-router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const theme = localStorage.getItem("theme") ?? "light";
  useEffect(() => {
    dispatch(setTheme(theme));
  }, []);

  return (
    <div className="App">
      <Favicon url="https://cdn3.iconfinder.com/data/icons/luchesa-vol-9/128/Weather-1024.png" />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="townWeather/:name" element={<TownWeather />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
