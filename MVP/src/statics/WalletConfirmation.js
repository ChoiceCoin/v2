// Copyright Fortior Blockchain 2022
// 17 U.S.C §§ 101-1511

// Importing Relevant dependencies
import { useSelector, useDispatch } from "react-redux";
import BarLoader from "react-spinners/BarLoader";

//JSX Component WalletConfirmation Modal
const WalletConfirmation = () => {

  // Starting React-dispatch to dispatch action in state in the component
    const dispatch = useDispatch()

  // getting alert modal content value from redux store data
    const { openWallet, walletContent } = useSelector(
      (state) => state.status.confirmWallet
    );
  
    // HTML Building Block
    return(
        <div
        style={{
            // width: "100%",
          position : "fixed",
          zIndex : "1000",
          bottom: "25px",
          right: "20px",
          display: `${!!openWallet ? "flex" : "none"}`,
          border : "1px solid grey",
          borderRadius : "5px",
          padding : "3px",
        //   alignItems: "center",
          flexDirection: "column",
          background : "whitesmoke" ,
        //   color: "var(--wht)",
         
        //   fontSize: "14px",
          fontWeight: 500,
          textTransform: "uppercase",
        }}
        className="confirmation"
      >
        
        <div
            style={{
              width: "20px",
              marginTop : "-20px",
              height: "20px",
              display: "flex",
              fontSize: "16px",
              cursor: "pointer",
              fontWeight: "500",
              textAlign: "center",
              borderRadius: "100%",
              alignItems: "center",
              justifyContent: "center",
              textTransform: "uppercase",
              border: "1px solid var(--l1)",
              background: "var(--main-col)",
            }}
            onClick={() => {
              dispatch({ type: "close_wallet" });
            }}
          >
            <i className="uil uil-times"></i>
          </div>

        <p style={{
          padding : "5px", 
          fontSize : "12px",
          fontWeight : "bold",
          color : "red",
          // color: darkTheme ? "#fff" : "black",
            }} 
          className="wallet_content" >
            {walletContent}
        </p>
        <BarLoader
        // style={{marginLeft : "20px"}}
          color={"#888"}
          size={150}
          width={250}
          speedMultiplier="0.4"
        />
      
      </div>
    )
}

export default WalletConfirmation;