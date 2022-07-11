// Copyright Fortior Blockchain 2022
// 17 U.S.C §§ 101-1511

// JSX Component BottomNavigationBar
const BottomNavigationBar = ({ NavLink}) => {

  // Logout 
    const LogOut = () => {
      localStorage.removeItem("address");
      localStorage.removeItem("addresses");
      localStorage.removeItem("wallet-type");
      localStorage.removeItem("walletconnect");
      window.location.reload();
    };
  
    
  // Building block
    return (
      <footer className="ft_sm">
        <ul className="ft_sm_inn">
          <li className="ft_sm_li">
            <NavLink
              style={({ isActive }) => {
                return {
                  display: "flex",
                  fontSize: isActive ? "14px" : "13px",
                  fontWeight: isActive && "600",
                  opacity: isActive ? "1" : "0.6",
                  alignItems: "center",
                  flexDirection: "column",
                };
              }}
              to={`/`}
              key={"home"}
            >
              <i className="uil uil-estate"></i>
              <p> Home</p>
            </NavLink>
          </li>
  
          <li className="ft_sm_li">
            <NavLink
              style={({ isActive }) => {
                return {
                  display: "flex",
                  fontSize: isActive ? "14px" : "13px",
                  fontWeight: isActive && "600",
                  opacity: isActive ? "1" : "0.6",
                  alignItems: "center",
                  flexDirection: "column",
                };
              }}
              to={`/propose`}
              key={"propose"}
            >
              {/* <i className="uil uil-question-circle"></i> */}
              <i className="uil uil-search-plus"></i>
              <p>Propose</p>
            </NavLink>
          </li>
  
          <li className="ft_sm_li">
            <NavLink
              style={({ isActive }) => {
                return {
                  width: "35px",
                  height: "35px",
                  display: "flex",
                  borderRadius: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: isActive && "600",
                  background: "var(--main-col)",
                  color:  "#fff",
                  border: isActive
                    ? "1px solid #666"
                    : "none",
                  fontSize: isActive ? "14px" : "13px",
                };
              }}
              to={`/participate`}
              key={"participate"}
            >
              <i className="uil uil-check"></i>
      
            </NavLink>
          </li>
  
          <li className="ft_sm_li">
            <div
              style={{
                display: "flex",
                fontSize: "13px",
                opacity: "0.65",
                cursor: "pointer",
                alignItems: "center",
                flexDirection: "column",
              }}
              onClick={LogOut}
            >
              <i className="uil uil-link-broken" style={{ fontSize: "21px" }}></i>
              <p>Disconnect</p>
            </div>
          </li>
        </ul>
      </footer>
    );
  };
  
  export default BottomNavigationBar;
  
