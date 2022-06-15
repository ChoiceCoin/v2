import "../../styles/landing.css";
import ScrollTextLand from "../../statics/ScrollTextLand";
import { useWindowWidth } from "@react-hook/window-size";

const Landing = () => {
  const width = useWindowWidth();
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
        <div className="land_item1">
            <h3 style={{fontWeight: 'bold'}}>Rules</h3>
          <ul
            className="suby"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <p>1. One Choice is equal to one vote.</p>
            <p>2. You can vote as many times as you desire.</p>
            <p>3. There are no limits on how much Choice you can use to vote.</p>
            <p>4. Voters must opt-in to Choice to participate.</p>
            {/* <p>5.  Any Choice sent after the voting deadline, Wednesday June 1st at 4:00PM EST, will not count, will not be rewarded, and will not be returned.</p> */}
            <p>6. All votes are final.</p>
          </ul>
        </div>
        <div className="land_item1">
          <h3 style={{fontWeight: 'bold'}}>Rewards</h3>
          <p className="suby">
          </p>
        </div>
      </div>
    </div>
  )
};

export default Landing;
