import "./App.css";
import MainBlock from "./components/MainBlock";
import TownList from "./components/TownList";
import Flex from "./components/Flex";
import CustomizedSwitches from "./components/SwitcherTheme";
import { changeTheme } from "./store/slices/themeSlice";
import { useDispatch, useSelector } from "react-redux";
import TimeContainer from "./components/DateContainer";

function App() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  const switchTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    dispatch(changeTheme(nextTheme));
  };

  return (
    <div className="App">
      <Flex
        background="mistyrose"
        border="1px solid rgba(192, 185, 185, 0.829)"
      >
        <img
          className="App__img"
          src="https://i.pinimg.com/originals/00/a6/af/00a6aff7388d57eeb4b1954ccd179def.png"
          alt="weather"
        />
        <h1 className="App__header">Weather App</h1>
      </Flex>
      <Flex
        justify="space-between"
        padding="0 15px 0 15px"
        background="mistyrose"
        border="1px solid rgba(192, 185, 185, 0.829)"
      >
        <CustomizedSwitches switchTheme={switchTheme} />
        <TimeContainer />
      </Flex>

      <Flex>
        <TownList></TownList>
        <MainBlock></MainBlock>
      </Flex>
    </div>
  );
}

export default App;
