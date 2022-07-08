// Copyright Fortior Blockchain 2022
// 17 U.S.C §§ 101-1511

// Importing files and relevant dependencies
import "../styles/landing.css";
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
      <div className="land_cov">
        <div className="land_item1">
          <p className="hdy">
            Choice Coin Governance
          </p>
          <p className="suby">
            Choice Coin is a governance platform and open source software project. The goal for Choice Coin is to help solve the decentralized governance problem, which refers to the complex process by which decentralized organizations are managed and evolve. The solution Choice Coin is building involves inventing new technologies for voting, compliance, and interchain interoperability. Each of these three technologies is part of the growing governance platform which exists to serve decentralized projects and blockchain networks.
          </p>
        </div>
      </div>
    </div>
  )
};

export default Landing;
