//Replace the "ElectionList.js" file with this in order to convert to MainNet
//Make sure to replace the blank strings with actual addresses before
import $ from "jquery";
// import axios from "axios";
// import algosdk from "algosdk";
import { useState } from "react";
import "../styles/electionlist.css";
// import { excludedAddresses } from "./exclude";
import { useQuery } from "react-query";
import BarLoader from "react-spinners/BarLoader";
// import WalletConnect from "@walletconnect/client";
// import MyAlgoConnect from "@randlabs/myalgo-connect";
import { useDispatch, useSelector } from "react-redux";
// import { formatJsonRpcRequest } from "@json-rpc-tools/utils";
// import QRCodeModal from "algorand-walletconnect-qrcode-modal";
// import { ASSET_ID, ELECTION_ID, URL, ADDRESS_1, ADDRESS_2 } from "./constants";

const ElectionList = () => {
  const dispatch = useDispatch();

  const [address1, setAddress1] = useState(0);
  const [address2, setAddress2] = useState(0);
  // const [NotEligible, setNotEligible] = useState("")

  // useEffect(() => {
  //   excludedAddresses.map(exclude => {
  //     if(exclude.add === isThereAddress)  {
  //        setNotEligible(exclude.add)
  //     }
  //   })
  // }, [])

  const { isLoading, error} = useQuery("elections", () => {
    setAddress1(11784370.18);
    setAddress2(47858291.12);
  }
     
  );

  const darkTheme = useSelector((state) => state.status.darkTheme);
  // const algod_token = ""
  // const algod_address = "https://api.algoexplorer.io";
  // const headers = "";

  // const algodClient = new algosdk.Algodv2(algod_token, algod_address, headers);
  // const walletType = localStorage.getItem("wallet-type");
  // const isThereAddress = localStorage.getItem("address");
 
  const election_data = [
    {
      candidates: [
        {
          address: "TQBNYD4TLXSISIWCZNSU2OF4WLKJR5GSMQSL37DTKCXHE4MLEKDV7LXAGY",
          image: "",
          name: "Option 1:  Burn 15M Choice; 9M for OSS rewards; 5M for voting rewards; 4M for staking rewards; 3M for marketing; 1.5M community rewards.",
        },

        {
          address: "KAVOYFTGUKFST33UMGD7XIT6CMSA5GOXF5M6OMF2DGGGB6DQ6N3AHDORIY",
          image: "",
          name: "Option 2: Burn 25M Choice; 5M for voting rewards; 4.5M for OSS rewards; 1.5M for marketing; 1M for staking rewards; 500k community rewards.",
        },
      ],
      card_desc:
        "This Issue addresses Choice tokenomics, The second DAO distribution concerns the distribution of 37.5M Choice controlled by the Choice Coin DAO. This Issue has two options.",
      choice_per_vote: 1,
      created_at: "2021-12-08T10:32:15.878473",
      description: "Lorem ipsum",
      is_finished: false,
      is_started: true,
      process_image: "https://i.postimg.cc/pXn0NRzL/logo.gif",
      slug: "is-choice-coin-the-best-b0c7db",
      title: "Choice Coin Governance",
      wallet: {
        address: "NX4T2FTIGNPVPSMEXJFMMKD46O4HRCPN25BDHOUW2SWXANZPQBZEDYKDVE",
      },
    },
  ];

  // const myAlgoConnect = async (voteData) => {
  //   const myAlgoWallet = new MyAlgoConnect();

  //   try {
  //     const accounts = await myAlgoWallet.connect({
  //       shouldSelectOneAccount: true,
  //     });
  //     const address = !!isThereAddress ? isThereAddress : accounts[0].address;

  //     const myAccountInfo = await algodClient
  //       .accountInformation(
  //         !!isThereAddress ? isThereAddress : accounts[0].address
  //       )
  //       .do();

  //     // get balance of the voter
  //     const balance = myAccountInfo.assets
  //       ? myAccountInfo.assets.find(
  //           (element) => element["asset-id"] === ASSET_ID
  //         ).amount / 100
  //       : 0;

  //     // check if the voter address has Choice
  //     const containsChoice = myAccountInfo.assets
  //       ? myAccountInfo.assets.some(
  //           (element) => element["asset-id"] === ASSET_ID
  //         )
  //       : false;

  //     // if the address has no ASAs
  //     if (myAccountInfo.assets.length === 0) {
  //       dispatch({
  //         type: "alert_modal",
  //         alertContent:
  //           "You need to opt-in to Choice Coin in your Algorand Wallet.",
  //       });
  //       return;
  //     }

  //     if (!containsChoice) {
  //       dispatch({
  //         type: "alert_modal",
  //         alertContent:
  //           "You need to opt-in to Choice Coin in your Algorand Wallet.",
  //       });
  //       return;
  //     }

  //     if (voteData.amount > balance) {
  //       dispatch({
  //         type: "alert_modal",
  //         alertContent:
  //           "You do not have sufficient balance to make this transaction.",
  //       });
  //       return;
  //     }

  //     const suggestedParams = await algodClient.getTransactionParams().do();
  //     const amountToSend = voteData.amount * 100;
  
  //     const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
  //       from: address,
  //       to: voteData.address,
  //       amount: amountToSend,
  //       assetIndex: ASSET_ID,
  //       suggestedParams,
  //     });

  //     const signedTxn = await myAlgoWallet.signTransaction(txn.toByte());
  //     await algodClient.sendRawTransaction(signedTxn.blob).do();

  //     // alert success
  //     dispatch({
  //       type: "alert_modal",
  //       alertContent: "Your vote has been recorded.",
  //     });
  //     setTimeout(() => window.location.reload(), 1500);
  //   } catch (error) {
  //     if (error.message === "Can not open popup window - blocked") {
  //       dispatch({
  //         type: "alert_modal",
  //         alertContent:
  //           "Pop Up windows blocked by your browser. Enable pop ups to continue.",
  //       });
  //     } else {
  //       console.log(error)
  //       dispatch({
  //         type: "alert_modal",
  //         alertContent: "An error occured the during transaction process",
  //       });
  //     }
  //   }
  // };

  // const algoSignerConnect = async (voteData) => {
  //   try {
  //     if (typeof window.AlgoSigner === "undefined") {
  //       window.open(
  //         "https://chrome.google.com/webstore/detail/algosigner/kmmolakhbgdlpkjkcjkebenjheonagdm",
  //         "_blank"
  //       );
  //     } else {
  //       await window.AlgoSigner.connect({
  //         ledger: "MainNet",
  //       });
  //       const accounts = await window.AlgoSigner.accounts({
  //         ledger: "MainNet",
  //       });

  //       const address = !!isThereAddress ? isThereAddress : accounts[0].address;

  //       const myAccountInfo = await algodClient
  //         .accountInformation(
  //           !!isThereAddress ? isThereAddress : accounts[0].address
  //         )
  //         .do();

  //       // get balance of the voter
  //       const balance = myAccountInfo.assets
  //         ? myAccountInfo.assets.find(
  //             (element) => element["asset-id"] === ASSET_ID
  //           ).amount / 100
  //         : 0;

  //       // check if the voter address has Choice
  //       const containsChoice = myAccountInfo.assets
  //         ? myAccountInfo.assets.some(
  //             (element) => element["asset-id"] === ASSET_ID
  //           )
  //         : false;

  //       // if the address has no ASAs
  //       if (myAccountInfo.assets.length === 0) {
  //         dispatch({
  //           type: "alert_modal",
  //           alertContent:
  //             "You need to opt-in to Choice Coin in your Algorand Wallet.",
  //         });
  //         return;
  //       }

  //       if (!containsChoice) {
  //         dispatch({
  //           type: "alert_modal",
  //           alertContent:
  //             "You need to opt-in to Choice Coin in your Algorand Wallet.",
  //         });
  //         return;
  //       }

  //       if (voteData.amount > balance) {
  //         dispatch({
  //           type: "alert_modal",
  //           alertContent:
  //             "You do not have sufficient balance to make this transaction.",
  //         });
  //         return;
  //       }

  //       const suggestedParams = await algodClient.getTransactionParams().do();
  //       const amountToSend = voteData.amount * 100;
    

  //       const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
  //         from: address,
  //         to: voteData.address,
  //         amount: amountToSend,
  //         assetIndex: ASSET_ID,
  //         suggestedParams,
  //       });

  //       const signedTxn = await window.AlgoSigner.signTxn([
  //         { txn: window.AlgoSigner.encoding.msgpackToBase64(txn.toByte()) },
  //       ]);
  //       await algodClient
  //         .sendRawTransaction(
  //           window.AlgoSigner.encoding.base64ToMsgpack(signedTxn[0].blob)
  //         )
  //         .do();

  //       // alert success
  //       dispatch({
  //         type: "alert_modal",
  //         alertContent: "Your vote has been recorded.",
  //       });
  //       setTimeout(() => window.location.reload(), 1500);
  //     }
  //   } catch (error) {
  //     if (error.message === "Can not open popup window - blocked") {
  //       dispatch({
  //         type: "alert_modal",
  //         alertContent:
  //           "Pop Up windows blocked by your browser. Enable pop ups to continue.",
  //       });
  //     } else {
  //       dispatch({
  //         type: "alert_modal",
  //         alertContent: "An error occured the during transaction process",
  //       });
  //     }
  //   }
  // };

  // const algoMobileConnect = async (voteData) => {
  //   const connector = new WalletConnect({
  //     bridge: "https://bridge.walletconnect.org",
  //     qrcodeModal: QRCodeModal,
  //   });

  //   try {
  //     const address = !!isThereAddress ? isThereAddress : "";

  //     const myAccountInfo = await algodClient.accountInformation(address).do();

  //     const balance = myAccountInfo.assets
  //       ? myAccountInfo.assets.find(
  //           (element) => element["asset-id"] === ASSET_ID
  //         ).amount / 100
  //       : 0;

  //     const containsChoice = myAccountInfo.assets
  //       ? myAccountInfo.assets.some(
  //           (element) => element["asset-id"] === ASSET_ID
  //         )
  //       : false;

  //     if (myAccountInfo.assets.length === 0) {
  //       alert("You need to opt-in to Choice Coin in your Algorand Wallet.");
  //       return;
  //     }

  //     if (!containsChoice) {
  //       alert("You need to opt-in to Choice Coin in your Algorand Wallet.");
  //       return;
  //     }

  //     if (voteData.amount > balance) {
  //       alert("You do not have sufficient balance to make this transaction.");
  //       return;
  //     }

  //     const suggestedParams = await algodClient.getTransactionParams().do();
  //     const amountToSend = voteData.amount * 100;
     
  //     const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
  //       from: address,
  //       to: voteData.address,
  //       amount: amountToSend,
  //       assetIndex: ASSET_ID,
  //       suggestedParams,
        
  //     });

  //     const txnsToSign = [
  //       {
  //         txn: Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString(
  //           "base64"
  //         ),
  //         message: "Transaction using Mobile Wallet",
  //       },
  //     ];

  //     const requestParams = [txnsToSign];

  //     const request = formatJsonRpcRequest("algo_signTxn", requestParams);
  //     const result = await connector.sendCustomRequest(request);

  //     const decodedResult = result.map((element) => {
  //       return element ? new Uint8Array(Buffer.from(element, "base64")) : null;
  //     });

  //     console.log(decodedResult);
  //     await algodClient.sendRawTransaction(decodedResult).do();
  //     // alert success
  //     dispatch({
  //       type: "alert_modal",
  //       alertContent: "Your vote has been recorded.",
  //     });
  //     setTimeout(() => window.location.reload(), 1500);
  //   } catch (error) {
  //     if (error.message === "Can not open popup window - blocked") {
  //       dispatch({
  //         type: "alert_modal",
  //         alertContent:
  //           "Pop Up windows blocked by your browser. Enable pop ups to continue.",
  //       });
  //     } else {
  //       dispatch({
  //         type: "alert_modal",
  //         alertContent: "An error occured during the transaction process",
  //       });
  //     }
  //   }
  // };


  const placeVote = (address, amount, election) => {

    dispatch({
      type: "alert_modal",
      alertContent: " Vote 4 has ended. All rewards for Vote 4 will be distributed on Friday June 3rd at 4:00PM EST, Thanks for voting!",
    });

 

   
  };

  // const placeVote = (address, amount, election) => {
  //   if(!isThereAddress) {
  //     dispatch({
  //       type: "alert_modal",
  //       alertContent: "Kindly connect wallet to vote!!",
  //     });
  //     return;
  //   }

  //   if (!address) {
  //     dispatch({
  //       type: "alert_modal",
  //       alertContent: "Select an option to vote!!",
  //     });
  //     return;
  //   } 
 

  //   if(NotEligible === isThereAddress) {
  //     dispatch({
  //       type: "alert_modal",
  //       alertContent: "Not eligible to vote!!",
  //     });
  //     return;
  //   }
    
    
    
  //   if (walletType === "my-algo") {
  //     myAlgoConnect({ address, amount, election });
  //   } else if (walletType === "algosigner") {
  //     algoSignerConnect({ address, amount, election });
  //   } else if (walletType === "walletconnect") {
  //     algoMobileConnect({ address, amount, election });
  //   }
   
  // };

  if (isLoading)
    return (
      <div className="ptt_elt">
        <div className="ptt_elt_inn">
          <div className="ptt_hd">
            <p>Vote 4: Choice Coin Governance</p>
          </div>

          <ul className="card_list">
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                color: "var(--wht)",
                textAlign: "center",
                fontSize: "14px",
                fontWeight: darkTheme ? 400 : 500,
                textTransform: "uppercase",
              }}
            >
              <p style={{ opacity: 0.8, margin: "30px 0px 20px" }}>Loading</p>
              <BarLoader
                color={darkTheme ? "#eee" : "#888"}
                size={150}
                speedMultiplier="0.5"
              />
            </div>
          </ul>
        </div>
      </div>
    );
  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="ptt_elt">
      <div className="ptt_elt_inn">
        <div className="ptt_hd">
          <p>Vote 4: Choice Coin Governance</p>
        </div>

        <ul className="card_list">
          {election_data?.map((slug, index) => {
            return (
              <div className="card_cont" key={index}>
                <div className="card_r1">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <div className="card_elt_img">
                      {slug.process_image ? (
                        <img src={slug.process_image} alt="" />
                      ) : (
                        <i
                          className="uil uil-asterisk"
                          style={{ paddingLeft: "2px", paddingBottom: "2px" }}
                        />
                      )}
                    </div>
                    <div className="card_elt_tit">{slug.title}</div>
                  </div>
                </div>

                <div className="card_elt_desc">{slug?.card_desc}</div>

                <div className="voting_ends">
                 All rewards for Vote 4 will be distributed on Friday June 3rd at 4:00PM EST, Thanks for voting!
                </div>

                <div className="results">
                  <div className="resultsTit">Results</div>

                  <div className="results_cont">
                    <div className="optionButt">
                      <div className="optionButtDets">
                        <p>Option 1</p>
                        <p>{address1.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}  <img src="https://i.postimg.cc/mDtpdjqh/logo.png" style={{width : '12px', marginTop : '-1px'}} alt="choice logo"/></p>
                      </div>
                      <div className="optRange">
                        <div
                          className="optRangeSlide optRangeSlide2"
                          style={{
                            width: `calc(100% * ${
                              address1 / (address1 + address2)
                            })`,
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className="optionButt">
                      <div className="optionButtDets">
                        <p>Option 2</p>
                        <p>{address2.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}  <img src="https://i.postimg.cc/mDtpdjqh/logo.png" style={{width : '12px', marginTop : '-1px'}} alt="choice logo"/></p>
                      </div>
                      <div className="optRange">
                        <div
                          className="optRangeSlide optRangeSlide1"
                          style={{
                            width: `calc(100% * ${
                              address2 / (address1 + address2)
                            })`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                 <div className="card_cand">
                  {/* <div className="card_cand_hd">
                    <div className="amountToCommit">
                      <p>Amount to commit:</p>
                      <input
                        type="number"
                        min="0"
                        placeholder="1"
                        className="amtToCommitInp"
                      />
                    </div>
                  </div>  */}

                  <div className="vote_collap">
                    <div className="card_cand_hd">Options</div>
                    <ul className="vote_now_list">
                      {slug?.candidates?.map((item, index) => {
                        return (
                          <li key={index}>
                            {/* <input
                              type="radio"
                              name="options"
                              value={item.address}
                            /> */}

                            <p>{item.name}</p>
                          </li>
                        );
                      })}
                    </ul>

                    <div className="rec_vote_cont">
                      <button
                        className="record_vote button"
                        onClick={(e) => {
                          var voteVal = $(e.target)
                            .closest(".card_cand")
                            .find(".vote_now_list");

                          var amountToSend = $(e.target)
                            .closest(".card_cand")
                            .find(".amtToCommitInp")
                            .val();

                          var amt = !!amountToSend
                            ? amountToSend
                            : slug.choice_per_vote;

                          placeVote(
                            $("input[name=options]:checked", voteVal).val(),
                            amt,
                            slug
                          );
                        }}
                      >
                        Option 2 Wins <i className="uil uil-mailbox"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ElectionList;
