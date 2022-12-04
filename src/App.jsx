import "./App.css";
import MainBlock from "./components/MainBlock";
import TownList from "./components/TownList";
import Flex from "./components/Flex";
import CustomizedSwitches from "./components/SwitcherTheme";
import { changeTheme } from "./store/slices/themeSlice";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  const switchTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    dispatch(changeTheme(nextTheme));
  };

  return (
    <div className="App">
      <h1 className="App__header">Weather App</h1>
      <CustomizedSwitches switchTheme={switchTheme} />

      <Flex>
        {/* <div className="App__body"> */}
        <TownList></TownList>
        <MainBlock></MainBlock>
        {/* </div> */}
      </Flex>
    </div>
  );
}

export default App;
