// Copyright Fortior Blockchain 2022
// 17 U.S.C §§ 101-1511

// Importing files and relevant dependencies
import Landing from "./Landing";
import VotingAndProposalLinkPage from "./VoteAndProposalLinkPage";
import { useWindowSize } from "@react-hook/window-size";
import { NavLink, Route, Routes } from "react-router-dom";
import TopNavigationBar from "../components/navbar/TopNavigationBar";
import BottomNavigationBar from "../components/navbar/BottomNavigationBar";
import ElectionList from "../components/election/ElectionList";
import ElectionPage from "../components/election/Election";
import Propose from "../components/propose/propose";

// JSX Component MainPage
const MainPage = () => {

  // getting window width dynamically
  const [width] = useWindowSize();

  //html building building + imports
  return (
    <main
      className={`${
       "light_theme big_screen"
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
          opacity: 0.078,
          position: "fixed",
          pointerEvents: "none",
          background: `url("./img/background.svg")`,
        }}
      />

      <TopNavigationBar  NavLink={NavLink} />
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/participate" element={<ElectionPage  />} />
          {/* <Route path="/home" element={<Home />} /> */}
          <Route exact path="/voting" element={<VotingAndProposalLinkPage />} />
          <Route exact path="/voting/participate" element={<ElectionList/>}  />
          <Route exact path='/propose' element={<Propose />} />
        </Routes>
      {width <= 1000 && (
        <BottomNavigationBar NavLink={NavLink} />
      )}
    </main>
  );
};

export default MainPage;
