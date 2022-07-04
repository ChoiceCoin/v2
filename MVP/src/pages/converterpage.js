import "./styles/landing.css";
import ScrollTextLand from "./components/ScrollTextLand";

const Landing = () => {
  return (
    <div className="landing" id="landing">
      <ScrollTextLand
        word={
          "Choice Coin Converter"
        }
      />
      <div className="land_cov">
        <div className="land_item1">
          <p className="hdy">
            Choice Coin Converter
          </p>
          <p className="suby">
            Choice Coin Converter provides an interchain mechanism for cross chain conversion.
          </p>
        </div>
        <div className="land_item1">
            <h3 style={{fontWeight: 'bold'}}>Coming Soon!</h3>
          <ul
            className="suby"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <li>Choice Coin Converter will launch by Q4 2022.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Landing;