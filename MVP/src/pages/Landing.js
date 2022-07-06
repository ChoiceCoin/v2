// Copyright Fortior Blockchain 2022
// 17 U.S.C §§ 101-1511

// Importing files and relevant dependencies
import "../styles/landing.css";
import ScrollTextLand from "../statics/ScrollTextLand";
import { useWindowWidth } from "@react-hook/window-size";

//JSX Component Landing 
const Landing = () => {
  // getting window width dynamically
  const width = useWindowWidth();

  // building block
  return (
    <div className="landing" id="landing"
      style={{
       marginLeft: width > 1000 ? "140px" : "0px" 
      }}
    >
      <ScrollTextLand
        word={
          "Choice Coin V2 TestNet -- This is still under development, Choice Coin V2 TestNet! This is still under development!"
        }
      />

      <div className="land_cov">
        <div className="land_item1">
          <p className="hdy">
            Choice Coin DAO: Bringing Decentralized Governance to Blockchain
          </p>
          <p className="suby">
        Choice Coin is an Asset that powers the Choice Coin DAO, a Decentralized Autonomous Organization built on the Blockchain. The Choice Coin DAO aims to make decentralized voting a reality through allocations to open-source software development and community awareness.
            <br />
            <br />
            Decentralized Decisions is an open source software platform for decentralized voting and governance. The goal for Choice Coin is to help solve the decentralized governance problem by building the world’s best voting technology. Choice Coin is built, developed, and maintained by the Choice Coin DAO, a decentralized autonomous organization on the blockchain.
          </p>
        </div>
      </div>
    </div>
  )
};

export default Landing;
