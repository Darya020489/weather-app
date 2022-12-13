import "./App.css";
import Favicon from 'react-favicon';
import TownWeather from "./components/TownWeather";
import MainLayout from "./layouts/MainLayout";

import { Route, Routes } from "react-router";

function App() {
  return (
    <div className="App">
      <Favicon url='https://cdn3.iconfinder.com/data/icons/luchesa-vol-9/128/Weather-1024.png' />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="townWeather/:name" element={<TownWeather />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
