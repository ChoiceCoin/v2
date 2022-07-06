// Copyright Fortior Blockchain 2022
// 17 U.S.C §§ 101-1511

//JSX Component ScrollTextLand 
const ScrollTextLand = ({ word }) => {

  // HTML Building Block
  return (
    <div className="Marquee__Wrapper">
      <div className="Marquee__TextHolder">
        <div className="Marquee__TextGroup">
          <p
            style={{
              width: "100%",
              fontSize: "12px",
              fontWeight: "500",
              wordSpacing: "4px",
              padding: "20px 0px",
              textTransform: "uppercase",
              borderBottom: "1px solid var(--border-default)",
            }}
          >
            {word}
            <span className="Marquee__Dot"></span>
          </p>
        </div>

        <div className="Marquee__TextGroup">
          <p
            style={{
              width: "100%",
              fontSize: "12px",
              fontWeight: "500",
              wordSpacing: "4px",
              padding: "20px 0px",
              textTransform: "uppercase",
              // borderTop: "1px solid var(--border-default)",
              borderBottom: "1px solid var(--border-default)",
            }}
          >
            {word}
            <span className="Marquee__Dot"></span>
          </p>
        </div>
        <div className="Marquee__TextGroup">
          <p
            style={{
              width: "100%",
              fontSize: "12px",
              fontWeight: "500",
              wordSpacing: "4px",
              padding: "20px 0px",
              textTransform: "uppercase",
              // borderTop: "1px solid var(--border-default)",
              borderBottom: "1px solid var(--border-default)",
            }}
          >
            {word}
            <span className="Marquee__Dot"></span>
          </p>
        </div>
        <div className="Marquee__TextGroup">
          <p
            style={{
              width: "100%",
              fontSize: "12px",
              fontWeight: "500",
              wordSpacing: "4px",
              padding: "20px 0px",
              textTransform: "uppercase",
              // borderTop: "1px solid var(--border-default)",
              borderBottom: "1px solid var(--border-default)",
            }}
          >
            {word}
            <span className="Marquee__Dot"></span>
          </p>
        </div>
      </div>
    </div>
  );
};
export default ScrollTextLand;
