import { useSelector, useDispatch } from "react-redux";
import Landing from "./pages/HomePage/Landing";

import Faq from "./pages/FaqPage/Faq";
import { useWindowSize } from "@react-hook/window-size";
import { NavLink, Route, Routes } from "react-router-dom";
import TopNavigationBar from "./components/navbar/TopNavigationBar";
import BottomNavigationBar from "./statics/BottomNavigationBar";
import ElectionList from "./statics/ElectionList";
import { useEffect } from "react";

const MainPage = () => {
  const dispatch = useDispatch();
  const [width] = useWindowSize();
  const darkTheme = useSelector((state) => state.status.darkTheme);
  const storedTheme = localStorage.getItem('mode') || (window.matchMedia("(prefers-color-scheme: dark)")
  .matches ? "dark" : "light")

  useEffect(() => {
    if(storedTheme) {
      console.log(storedTheme)
      localStorage.setItem("mode", storedTheme);
      dispatch({ type: `${storedTheme}_mode` });
     if(storedTheme === "dark" && width > 800) {
      document.getElementById('checkbox').checked = true
     }
    }
  }, [storedTheme, dispatch, width])

  return (
    <main
      className={`${
        darkTheme ? "dark_theme big_screen" : "light_theme big_screen"
      }`}
      id="main_main"
    >
      <div
        style={{
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          content: "",
          width: "100%",
          height: "100%",
          opacity: darkTheme ? 0.088 : 0.078,
          position: "fixed",
          pointerEvents: "none",
          background: `url("./img/background${darkTheme ? "2" : ""}.svg")`,
        }}
      />

      <TopNavigationBar darkTheme={darkTheme} NavLink={NavLink} />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/faq" element={<Faq />} />
        {/* <Route path="/home" element={<Home />} /> */}
        <Route path="/participate" element={<ElectionList/>}  />
      </Routes>

      {width <= 850 && (
        <BottomNavigationBar NavLink={NavLink} darkTheme={darkTheme} />
      )}
    </main>
  );
};

export default MainPage;
