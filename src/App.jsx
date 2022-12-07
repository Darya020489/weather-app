import "./App.css";
import TownWeather from "./components/TownWeather";
import MainLayout from "./layouts/MainLayout";

import { Route, Routes } from "react-router";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="townWeather/:name" element={<TownWeather />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
