import { useSelector } from "react-redux";
import Schedule from "./schedule";
import { NavLink, Route, Routes } from "react-router-dom";
import TopNavigationBar from "./statics/TopNavigationBar";
import Payment from "./Payment";

const MainPage = () => {
  const darkTheme = useSelector((state) => state.status.darkTheme);

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
      
        <Route path="/schedule" element={<Schedule />} />
        
        <Route path="/" element={<Payment/>}  />
      </Routes>

      
       
  
    </main>
  );
};

export default MainPage;
