// Copyright Fortior Blockchain 2022
// 17 U.S.C §§ 101-1511

// Import relevant files and dependencies 
import algosdk from "algosdk";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import MyAlgoConnect from "@randlabs/myalgo-connect";
import { useWindowSize } from "@react-hook/window-size";
import { CopyToClipboard } from "react-copy-to-clipboard";
import copyAndPaste from '../../assets/copy-to-dashboard.png';
import logo from '../../assets/choice-logo.png';
import voting from '../../assets/voting-logo.png';
import compliance from '../../assets/compliance-logo.png';
import interchain from '../../assets/interchain-logo.png';
import {Link} from 'react-router-dom';
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
import Settings from "./Settings";
import DeskMenuBar from "./MenuBar";

const TopNavigationBar = ({ NavLink }) => {
  // Starting React-dispatch to dispatch action in state in the component
  const dispatch = useDispatch();
  // Getting election state data from redux store
  const addressNum = useSelector((state) => state.status.addressNum);
  // Checking if wallet is connected from local storage
  const isWalletConnected = localStorage.getItem("wallet-type") === null ? false : true;
  // Setting initial state
  const [copyToClipBoard , setCopyToClipBoard] = useState(null)
  const [menuBar, setMenuBar] = useState(false);
  const [toggleSettings, setToggleSettingsHidden] = useState(true);
  const [balance, setBalance] = useState([]);

  // Copy wallet address function
    const handyCopyToClipBoard = () => {
      setCopyToClipBoard(true)
      setTimeout(() => {
        setCopyToClipBoard(false)
      }, 500);
    }

 // Choice Asset ID
 const ASSET_ID =  297995609;
 // Getting window || desktop width
 const [width] = useWindowSize();
// Settings toggle
 const onSettingsToggle = () => {
    setToggleSettingsHidden(!toggleSettings)
  };
  // Menu Bar toggle
  const onMenuBarsToggle = () => {
    setMenuBar(!menuBar)
  }
  // setting algodClient instances
  const algodClient = new algosdk.Algodv2(
    {
      "X-API-Key": "",
    },
    "https://mainnet-algorand.api.purestake.io/ps2", 
    ""
  );
  // getting wallet addresses from local storage
  const addresses = localStorage.getItem("addresses")?.split(",");

// Setting initial address.
  let addrArr = [];
  
// Only when component mount once.
  useEffect(() => {
    // getting balance
    addresses?.forEach(async (item) => {
      const myAccountInfo = await algodClient.accountInformation(item).do();
      const bal =
        myAccountInfo.assets.find((element) => element["asset-id"] === ASSET_ID)
          ?.amount / 100;
    addrArr.push({ balance: !!bal ? bal : 0, address: item });
        dispatch({
          type: "getBalance",
          balance : addrArr
        })
        console.log(addrArr, "addrArr")
      if (addrArr?.length === addresses?.length) {
        dispatch({
          type: "setAlgoAddress",
          addressIndex: 0,
          addr: addrArr[0]?.address,
        });
        setBalance(addrArr);
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  
  // My algo wallet connection
  /////////////////////////
  const myAlgoConnect = async () => {
    dispatch({
      type: "confirm_wallet",
      alertContent : "Connecting MyAlgo wallet"
    })
    const myAlgoWallet = new MyAlgoConnect({ shouldSelectOneAccount: false });
    try {
      const accounts = await myAlgoWallet.connect({
        shouldSelectOneAccount: true,
      });
      const addresses = accounts.map((item) => item?.address);
      const address = accounts[0].address;
      // close modal.
      localStorage.setItem("wallet-type", "my-algo");
      localStorage.setItem("address", address);
      localStorage.setItem("addresses", addresses);
      window.location.reload();
    } catch (error) {
      dispatch({
        type: "close_wallet"
      })
      dispatch({
        type: "alert_modal",
          alertContent:
            "Error occurred while connecting wallet, Try again later.",
      })
      console.log(error);
    }
  };

  // Pera Wallet Connection
  /////////////////////////
  const connectWallet = () => {
    const connector = new WalletConnect({
      bridge: "https://bridge.walletconnect.org",
      qrcodeModal: QRCodeModal,
    });
    if (!connector.connected) {
      connector.createSession();
    }
    connector.on("connect", (error, payload) => {
      if (error) {
        dispatch({
          type: "confirm_wallet",
          alertContent : "Error Connecting Pera wallet"
        })
        setTimeout(() => {
          dispatch({
            type: "close_wallet"
          })
        }, 2000)
        throw error;
      }
        dispatch({
          type: "close_wallet"
        })
      const { accounts } = payload.params[0];
      const addresses = accounts.map((item) => item);
      const address = accounts[0];
      localStorage.setItem("wallet-type", "walletconnect");
      localStorage.setItem("address", address);
      localStorage.setItem("addresses", addresses);
      window.location.reload();
    });
    connector.on("session_update", (error, payload) => {
      if (error) {
        dispatch({
          type: "confirm_wallet",
          alertContent : "Error Connecting Pera wallet"
        })
        setTimeout(() => {
          dispatch({
            type: "close_wallet"
          })
        }, 2000)
        throw error;
      }
      const { accounts } = payload.params[0];
      const addresses = accounts.map((item) => item);
      const address = accounts[0];
      localStorage.setItem("wallet-type", "walletconnect");
      localStorage.setItem("address", address);
      localStorage.setItem("addresses", addresses);
      window.location.reload();
    });
    connector.on("disconnect", (error, payload) => {
      if (error) {
        dispatch({
          type: "confirm_wallet",
          alertContent : "Error Connecting Pera wallet"
        })
        setTimeout(() => {
          dispatch({
            type: "close_wallet"
          })
        }, 2000)
        console.log(error);
      }
    });
  };

  // Algosigner Connection
  /////////////////////////
  const algoSignerConnect = async () => {
    try {
      dispatch({
        type: "confirm_wallet",
        alertContent : "Connecting Algosigner wallet"
      })
      if (typeof window.AlgoSigner === "undefined") {
        dispatch({
          type: "confirm_wallet",
          alertContent : "ALgosigner is not set up yet."
        })
      setTimeout(() => {
        dispatch({
          type: "close_wallet"
        })
      }, 4000)
        window.open(
          "https://chrome.google.com/webstore/detail/algosigner/kmmolakhbgdlpkjkcjkebenjheonagdm",
          "_blank"
        );
      } else {
        await window.AlgoSigner.connect({
          ledger: "TestNet",
        });
        const accounts = await window.AlgoSigner.accounts({
          ledger: "TestNet",
        });
        const addresses = accounts.map((item) => item?.address);
        const address = accounts[0].address;
        // close modal.
        localStorage.setItem("wallet-type", "algosigner");
        localStorage.setItem("address", address);
        localStorage.setItem("addresses", addresses);
        window.location.reload();
      }
    } catch (error) {
      dispatch({
        type: "close_wallet"
      })
      dispatch({
        type: "alert_modal",
        alertContent: "AlgoSigner not set up yet!",
      });
    }
  };

  // Building block.
  return (
    <header className="small_header">
      <div className="small_header_inn"
        style={{
          padding: `${width <= 999 ? "0px 5vw" : "5px 1vw "}`
        }}
      >
      {
        width >= 1000 ?
        (
         <div style={{
           display: "flex",
           width: "90vw",
           justifyContent: "space-between"
         }}>
            <div 
            className="desk_nav"
            style={{
              display: "flex",
              alignItems: `center`,
              // justifyContent: `center`,
              textTransform: "uppercase",
              flexDirection: "column",
              marginLeft : "-14px",
              marginTop: "-10px",
              width : "250px",
              height : "100vh",
              background : "var(--on-settings-card)",
              boxShadow : "0px 4px 30px rgba(0, 0, 0, 0.1)"
            }}>
            <Link to='/' style={{
              outline : "none"
            }}>
              
                <img src={logo} alt="logo"
                    style={{
                      width: "50px",
                      margin : "30px",
                      }}
                      to={`/`}
                      key={""}
                        />      
            </Link>   
              <ul 
                style={{
                  padding : "15px"
                }}
              > 
                <li style={{
                  cursor: "pointer"
                }}> 
                <NavLink
                      style={() => {
                        return {
                          color : "#3981C6" ,
                          outline : "none",
                          opacity: "1",
                      }
                    }}
                    to={`/voting`}
                    key={"voting"}
                    
                  >
                  <img src={voting} alt="voting logo" 
                      style={{
                        width : "15px",
                        marginRight: "9px"
                      }}
                    />
                  Voting        
                </NavLink>
                  </li>
                <NavLink 
                to={'/compliance'}
                key={"compliance"}>
                <li 
                    style={{
                    color : "#3981C6",
                    outline: "none",
                    opacity: "1" }}
                > 
                
                  <img src={compliance} alt="compliance logo" 
                  style={{
                    width : "15px",
                    marginRight: "5px"
                  }} />
                  Compliance     
                    </li>
                </NavLink>
             
                <NavLink
                 to={'/converter'}
                 key={"converter"}
                >
                <li style={{
                    color : "#3981C6",
                    outline: "none",
                    opacity: "1"
                }}>
                <img src={interchain} alt="converter logo" 
                  style={{
                    width : "15px",
                    marginRight: "9px"
                  }}
                  />
                  Converter
                 </li>
                </NavLink>
              </ul>
             
          </div>
           <div style={{
             display: "flex",
             flexDirection: "row",
            //  margin: "5px"
           }}> 
             <div className="mobile__nav" onClick={onMenuBarsToggle} 
               style={{
                zIndex: menuBar ? "2" : "1",
                color: menuBar ? "whitesmoke" : "var(--navicons-color)"
               }}
             >
                <div class={`menu-bars ${menuBar ? "change" : ""}`} id="menu-bars"
                   style={{ 
                    backgroundColor: menuBar ? "rgb(57, 129, 198)" : "var(--navicons-bg)",
                    color: menuBar ? "whitesmoke" : "var(--navicons-color)"
                  }}
                >
                  <div className="bar1" 
                   style={{
                    // backgroundColor: menuBar ? "whitesmoke" : null ,
                    backgroundColor: menuBar ? "whitesmoke" : "var(--navicons-color)"
                   }}
                  ></div>
                  <div className="bar2" 
                      style={{
                        // backgroundColor: menuBar ? "whitesmoke" : null ,
                        backgroundColor: menuBar ? "whitesmoke" : "var(--navicons-color)"
                       }}
                   ></div>
                  <div className="bar3"
                        style={{
                          // backgroundColor: menuBar ? "whitesmoke" : null ,
                          backgroundColor: menuBar ? "whitesmoke" : "var(--navicons-color)"
                         }}
                  ></div>
                </div>
             </div>
            <div className="settings" onClick={onSettingsToggle}
              
              style={{
                zIndex: toggleSettings ? "1" : "2",
                color: toggleSettings ? "var(--navicons-color)" : "whitesmoke",
                backgroundColor: toggleSettings ? "var(--navicons-bg)": "rgb(57, 129, 198)"
              }}
            >
            <i  style={{
              fontSize: "23px",
              padding: "0 7px",
            }} className="uil uil-setting"></i>
            </div>
          </div>
          {toggleSettings ? null: <Settings/> }
          {menuBar ? <DeskMenuBar /> : null}
         </div>
         ) : 
       (
        <div style={{
          display : `${width >=1000? "none" : "flex"}`,
          marginTop : "18px",
          marginBottom : "10px",
          justifyContent : `${width <=  1000 && "center" }`,
        }}
          > 
           <img src={logo} alt="logo" style={{width: "30px"}} />   
         </div>
       )
         }
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {!!isWalletConnected ? (
            <>
              <div className="addrDisplay">
                <div className="addrDispMain">
                  <div className="addrDisplayInn">
                    <div className="addrBalance">
                    {balance[addressNum]?.balance.toLocaleString()} <img src="https://i.postimg.cc/mDtpdjqh/logo.png" style={{width : '13px', marginTop : '0px', marginLeft : '2px'}} alt="choice logo"/>
                    </div>
                    <CopyToClipboard text={balance[addressNum]?.address}>
                      <div className="addressTxt">
                        <p>{balance[addressNum]?.address}</p>
                        {copyToClipBoard ? (<img style={{width:'11px'}}
                          src={copyAndPaste} alt="check"/>) : (<i onClick={() => handyCopyToClipBoard()} className="uil uil-copy"></i>)}
                      </div>
                    </CopyToClipboard>
                  </div>
                </div>
                <div className="dropDownConnect_items">
                  {balance?.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="dropDownConnect_item"
                        onClick={() => {
                          dispatch({
                            type: "setAlgoAddress",
                            addressIndex: index,
                            addr: item.address,
                          });
                        }}
                      >
                        <p className="dropDownConnect_item_txt">
                          {item.address}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            <div className="dropDownConnect">
              <div className="dropDownConnect_button">
                <button className="connect_wallet_button">
                  <p>
                    Connect Wallet
                    <i
                      className="uil uil-angle-down"
                      style={{ fontSize: "18px" }}
                    />
                  </p>
                </button>
              </div>
              <div className="dropDownConnect_items">
                <div className="dropDownConnect_item" onClick={myAlgoConnect}>
                  <div className="dropDownConnect_img">
                    <img
                      src="https://i.postimg.cc/76r9kXSr/My-Algo-Logo-4c21daa4.png"
                      alt=""
                    />
                  </div>
                  <p className="dropDownConnect_item_txt">My Algo Wallet</p>
                </div>
                <div
                  className="dropDownConnect_item"
                  onClick={algoSignerConnect}
                >
                  <div className="dropDownConnect_img">
                    <img
                      src="https://i.postimg.cc/L4JB4JwT/Algo-Signer-2ec35000.png"
                      alt=""
                    />
                  </div>
                  <p className="dropDownConnect_item_txt">
                    {typeof window.AlgoSigner === undefined
                      ? "Install AlgoSigner"
                      : "AlgoSigner"}
                  </p>
                </div>
                <div className="dropDownConnect_item" onClick={connectWallet}>
                  <div className="dropDownConnect_img">
                    <img
                      src="https://i.postimg.cc/QdXmHSYZ/pera.png"
                      alt=""
                    />
                  </div>
                  <p className="dropDownConnect_item_txt">
                    Pera Wallet
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopNavigationBar;
