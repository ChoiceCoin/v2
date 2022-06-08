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
            Choice Coin
          </p>
          <p className="suby">
            Choice Coin is a decentralized governance platform. 
            <br />
            <br />
            Decentralized Decisions is an open source software platform for decentralized voting and governance.
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
            <li>3. There are no limits on how much Choice you can use to vote.</li>
            <li>4. Voters must opt-in to Choice to participate.</li>
            <li>5.  Any Choice sent after the voting deadline, Wednesday June 1st at 4:00PM EST, will not count, will not be rewarded, and will not be returned.</li>
            <li>6. All votes are final.</li>
          </ul>
        </div>
        <div className="land_item1">
          <h3 style={{fontWeight: 'bold'}}>Rewards</h3>
          <p className="suby"
          </p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
