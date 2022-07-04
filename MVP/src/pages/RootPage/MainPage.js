import { useSelector } from "react-redux";
import Landing from "../HomePage/Landing";
import VotingPage from "../VotePage/VotePage";
// import Faq from "./pages/FaqPage/Faq";
import { useWindowSize } from "@react-hook/window-size";
import { NavLink, Route, Routes } from "react-router-dom";
import TopNavigationBar from "../../components/navbar/TopNavigationBar";
import BottomNavigationBar from "../../components/navbar/BottomNavigationBar";
import ElectionList from "../../components/election/participate/ElectionList";
import ElectionPage from "../../components/election/election";
import Propose from "../../components/propose/propose";



const MainPage = () => {
 
  const [width] = useWindowSize();
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
          <Route exact path="/" element={<Landing />} />
          {/* <Route exact path="/faq" element={<Faq />} /> */}
          <Route exact path="/participate" element={<ElectionPage darkTheme={darkTheme} />} />
          {/* <Route path="/home" element={<Home />} /> */}
          <Route exact path="/voting" element={<VotingPage darkTheme={darkTheme} />} />
          <Route exact path="/voting/participate" element={<ElectionList/>}  />
          <Route exact path='/propose' element={<Propose />} />
        </Routes>
      {width <= 1000 && (
        <BottomNavigationBar NavLink={NavLink} darkTheme={darkTheme} />
      )}
    </main>
  );
};

export default MainPage;
