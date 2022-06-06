import "../../styles/landing.css";
import ScrollTextLand from "../../statics/ScrollTextLand";

const Landing = () => {
  return (
    <div className="landing" id="landing">
      <ScrollTextLand
        word={
          "Join our Discord Server to learn more and participate in our Open Source Rewards Programs!"
        }
      />

      <div className="land_cov">
        <div className="land_item1">
          <p className="hdy">
            Choice Coin DAO: Bringing Decentralized Governance to the Algorand
            Blockchain
          </p>
          <p className="suby">
            Choice Coin is an Algorand Standard Asset (ASA) that powers the
            Choice Coin DAO, a Decentralized Autonomous Organization built on
            the Algorand Blockchain. The Choice Coin DAO aims to make
            decentralized voting a reality through allocations to open-source
            software development and community awareness.
            <br />
            <br />
      Decentralized Decisions is an open source software platform for decentralized voting and governance. With over 75 contributors on GitHub, it is also the largest open source software project on the Algorand blockchain. The goal for Choice Coin is to help solve the decentralized governance problem by building the world’s best voting technology. Choice Coin is built, developed, and maintained by the Choice Coin DAO, a decentralized autonomous organization on the Algorand blockchain. Choice Coin Governance :Vote 4 is the seventh vote for Choice Coin DAO.
          </p>
        </div>
        <div className="land_item1">
       
            <h3 style={{fontWeight: 'bold'}}>Rules</h3>
       

          <ul
            className="suby"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <li>1. One Choice is equal to one vote.</li>
            <li>2. You can vote as many times as you desire.</li>
            <li>
              {" "}
              3. There are no limits on how much Choice you can use to vote.
            </li>
            <li> 
              4. Voters must opt-in to Choice to participate.
            </li>
            <li>
              6.  Any Choice sent after the voting deadline, Wednesday June 1st at 4:00PM EST, will not count, will not be rewarded, and will not be returned.
            </li>
            <li> 7. All votes are final.</li>
          </ul>
        </div>
        <div className="land_item1">
          <h3 style={{fontWeight: 'bold'}}>Rewards</h3>
          <p className="suby">
          All rewards for Choice Coin Governance: Vote 4 will be distributed on Friday June 3rd at 4:00PM EST. The rewards pool for Vote 4 will be 4 million Choice
          </p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
