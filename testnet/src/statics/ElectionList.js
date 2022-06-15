
//Replace the "ElectionList.js" file with this in order to convert to MainNet
//Make sure to replace the blank strings with actual addresses before
import $ from "jquery";
import axios from "axios";
import algosdk from "algosdk";
import { useEffect, useState} from "react";
import "../styles/electionlist.css";
import { useQuery } from "react-query";
import BarLoader from "react-spinners/BarLoader";
import WalletConnect from "@walletconnect/client"; 
import MyAlgoConnect from "@randlabs/myalgo-connect";
import { useDispatch, useSelector } from "react-redux";
import { formatJsonRpcRequest } from "@json-rpc-tools/utils";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";

import { ASSET_ID, ELECTION_ID, URL, ADDRESS_1, ADDRESS_2 } from "../utils/constants";


const ElectionList = () => {
  const dispatch = useDispatch();

  const [address1, setAddress1] = useState(0);
  const [address2, setAddress2] = useState(0);
  // const [NotEligible, setNotEligible] = useState("");
  const isThereAddress = localStorage.getItem("address");
  const getElection = useSelector((state) => state.status.allElection);
  const getElectionNumber = useSelector((state) => state.status.eachElectionNumber)
  const each_election_data = [getElection[getElectionNumber]]
  // const [balance, setBalance] = useState(0);

  


  // useEffect(async() => {
  //   const isThereAddress = localStorage.getItem("address");
  //   const myAccountInfo = await algodClient.accountInformation(isThereAddress).do();
  //   const bal =
  //     myAccountInfo.assets.find((element) => element["asset-id"] === ASSET_ID)
  //       ?.amount / 100;

  //     setBalance(bal);  

  // }, [])

   // eslint-disable-next-line
  const { isLoading, error, data } = useQuery("elections", () =>
    axios.get(`https://v2-testnet.herokuapp.com/results/${each_election_data[0].candidates[0].electionID}`).then((response) => {
      console.log(response.data.data)
      if (response?.data?.data) {
       
        setAddress1(response?.data?.data[each_election_data[0].candidates[0].address]);
        setAddress2(response?.data?.data[each_election_data[0].candidates[1].address]);
      }
    })
  );

  // useEffect(() => {
  //   axios.get(`http://localhost:4000/results/${each_election_data[0].candidates[0].electionID}`).then((response) => {
  //     if (response?.data?.data) {
  //       console.log(response.data.data)
  //       setAddress1(response?.data?.data[`${each_election_data[0].candidates[0].address}`]);
  //       setAddress2(response?.data?.data[`${each_election_data[0].candidates[1].address}`]);
  //     }
  //   })
  // })

  const darkTheme = useSelector((state) => state.status.darkTheme);
  const balance = useSelector((state) => state.status.balance);
  const addressNum = useSelector((state) => state.status.addressNum);
 

  
  // const algod_token = ""
  // const algod_address = "https://api.algoexplorer.io";
  // const headers = "";

  const algodClient = new algosdk.Algodv2( {
    "X-API-Key": "z6H94GE3sI8w100S7MyY92YMK5WIPAmD6YksRDsC"
  },
  "https://testnet-algorand.api.purestake.io/ps2",
  "");
  const walletType = localStorage.getItem("wallet-type");
 

 
 

  // const election_data = [
  //   {
  //     candidates: [
  //       {
  //         address: "HYK7K5DSEQY5DUFF5EV3D4PXUY5AFLB5XQNU5QHJ4S33M4WMC3EIDCBF2Q",
  //         image: "",
  //         name: "Option 1: Choice Coin will continue with the tokenomic model voted on during Vote 0 and distribute the reserve over a 10-year plan.",
  //       },

  //       {
  //         address: "ORBXKBTF54NJVK3BF7IHZOLHBCUPLEXWURYXRN777DDF6LOQSBQ6LB34WI",
  //         image: "",
  //         name: "Option 2:  Choice Coin will burn the entire reserve, which contains 675,000,000.00 $Choice.",
  //       },
  //     ],
  //     card_desc:
  //       "This Issue addresses Choice tokenomics, This Issue has two options.",
  //     choice_per_vote: 1,
  //     created_at: "2021-12-08T10:32:15.878473",
  //     description: "Lorem ipsum",
  //     is_finished: false,
  //     is_started: true,
  //     process_image: "https://i.postimg.cc/pXn0NRzL/logo.gif",
  //     slug: "is-choice-coin-the-best-b0c7db",
  //     title: "Choice Coin Governance",
  //     wallet: {
  //       address: "NX4T2FTIGNPVPSMEXJFMMKD46O4HRCPN25BDHOUW2SWXANZPQBZEDYKDVE",
  //     },
  //   },
  // ];


  const getMaxVoteValue = () => {
    document.getElementById('max').value = balance[addressNum].balance;
    console.log(each_election_data);
  }

  const myAlgoSign = async (voteData) => {
    const myAlgoWallet = new MyAlgoConnect({ shouldSelectOneAccount: false });

    try {
      // const accounts = await myAlgoWallet.connect({
      //   shouldSelectOneAccount: true,
      // });
      const address = !!isThereAddress && isThereAddress 

      const myAccountInfo = await algodClient
        .accountInformation(
          !!isThereAddress && isThereAddress 
        )
        .do();

        console.log(myAccountInfo.assets["asset-id"]);
        
      

      // check if the voter address has Choice
      const containsChoice = myAccountInfo.assets
        ? myAccountInfo.assets.some(
            (element) => element["asset-id"] === ASSET_ID
          )
        : false;
       
      // if the address has no ASAs
      if (myAccountInfo.assets.length === 0) {
        dispatch({
          type: "alert_modal",
          alertContent:
            "You need to opt-in to Choice Coin in your Algorand Wallet.",
        });
        return;
      }

      if (!containsChoice) {
        dispatch({
          type: "alert_modal",
          alertContent:
            "You need to opt-in to Choice Coin in your Algorand Wallet.",
        });
        return;
      }

      // get balance of the voter
      const balance = myAccountInfo.assets
        ? myAccountInfo.assets.find(
            (element) => element["asset-id"] === ASSET_ID
          ).amount / 100
        : 0;

      if (voteData.amount > balance) {
        dispatch({
          type: "alert_modal",
          alertContent:
            "You do not have sufficient balance to make this transaction.",
        });
        return;
      }

      dispatch({
        type: "confirm_wallet",
        alertContent : "Confirming Vote Transaction & Option"
      })

      const suggestedParams = await algodClient.getTransactionParams().do();
      const amountToSend = voteData.amount * 100;
  
      const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
        from: address,
        to: voteData.address,
        amount: amountToSend,
        assetIndex: ASSET_ID,
        suggestedParams,
      });

      const signedTxn = await myAlgoWallet.signTransaction(txn.toByte());
      await algodClient.sendRawTransaction(signedTxn.blob).do();
      dispatch({
        type: "close_wallet"
      })

      // alert success
      dispatch({
        type: "alert_modal",
        alertContent: "Your vote has been recorded.",
      });
      // setTimeout(() => window.location.reload(), 1500);
    } catch (error) {
      if (error.message === "Can not open popup window - blocked") {
        dispatch({
          type: "close_wallet"
        })

        dispatch({
          type: "alert_modal",
          alertContent:
            "Pop Up windows blocked by your browser. Enable pop ups to continue.",
        });
      } else {
        console.log(error)
        dispatch({
          type: "close_wallet"
        })

        dispatch({
          type: "alert_modal",
          alertContent: "An error occured the during transaction process",
        });
      }
    }
  };

  const algoSignerConnect = async (voteData) => {
    try {
      // if (typeof window.AlgoSigner === "undefined") {
      //   window.open(
      //     "https://chrome.google.com/webstore/detail/algosigner/kmmolakhbgdlpkjkcjkebenjheonagdm",
      //     "_blank"
      //   );
      // } else {
      //   await window.AlgoSigner.connect({
      //     ledger: "MainNet",
      //   });
      //   const accounts = await window.AlgoSigner.accounts({
      //     ledger: "MainNet",
      //   });

        const address = !!isThereAddress && isThereAddress 

        const myAccountInfo = await algodClient
          .accountInformation(
            !!isThereAddress && isThereAddress
          )
          .do();

        

        // check if the voter address has Choice 
        const containsChoice = myAccountInfo.assets
          ? myAccountInfo.assets.some(
              (element) => element["asset-id"] === ASSET_ID
            )
          : false;

        // if the address has no ASAs
        if (myAccountInfo.assets.length === 0) {
          dispatch({
            type: "alert_modal",
            alertContent:
              "You need to opt-in to Choice Coin in your Algorand Wallet.",
          });
          return;
        }

        if (!containsChoice) {
          dispatch({
            type: "alert_modal",
            alertContent:
              "You need to opt-in to Choice Coin in your Algorand Wallet.",
          });
          return;
        }
        // get balance of the voter 
        const balance = myAccountInfo.assets
          ? myAccountInfo.assets.find(
              (element) => element["asset-id"] === ASSET_ID
            ).amount / 100
          : 0;

        if (voteData.amount > balance) {
          dispatch({
            type: "alert_modal",
            alertContent:
              "You do not have sufficient balance to make this transaction.",
          });
          return;
        }
        dispatch({
          type: "confirm_wallet",
          alertContent : "Confirming Vote Transaction & Option"
        })

        const suggestedParams = await algodClient.getTransactionParams().do();
        const amountToSend = voteData.amount * 100;
    

        const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
          from: address,
          to: voteData.address,
          amount: amountToSend,
          assetIndex: ASSET_ID,
          suggestedParams,
        });

        const signedTxn = await window.AlgoSigner.signTxn([
          { txn: window.AlgoSigner.encoding.msgpackToBase64(txn.toByte()) },
        ]);
        await algodClient
          .sendRawTransaction(
            window.AlgoSigner.encoding.base64ToMsgpack(signedTxn[0].blob)
          )
          .do();

          dispatch({
            type: "close_wallet"
          })


        // alert success
        dispatch({
          type: "alert_modal",
          alertContent: "Your vote has been recorded.",
        });
        // setTimeout(() => window.location.reload(), 1500);
      
    } catch (error) {
      if (error.message === "Can not open popup window - blocked") {
        dispatch({
          type: "close_wallet"
        })

        dispatch({
          type: "alert_modal",
          alertContent:
            "Pop Up windows blocked by your browser. Enable pop ups to continue.",
        });
      } else {
        dispatch({
          type: "close_wallet"
        })
        console.log(error)
        dispatch({
          type: "alert_modal",
          alertContent: "An error occured the during transaction process",
        });
      }
    }
  };

  const algoMobileConnect = async (voteData) => {
    const connector = new WalletConnect({
      bridge: "https://bridge.walletconnect.org",
      qrcodeModal: QRCodeModal,
    });

    try {
      const address = !!isThereAddress ? isThereAddress : "";

      const myAccountInfo = await algodClient.accountInformation(address).do();


      const containsChoice = myAccountInfo.assets
        ? myAccountInfo.assets.some(
            (element) => element["asset-id"] === ASSET_ID
          )
        : false;

      if (myAccountInfo.assets.length === 0) {
        alert("You need to opt-in to Choice Coin in your Algorand Wallet.");
        return;
      }

      if (!containsChoice) {
        alert("You need to opt-in to Choice Coin in your Algorand Wallet.");
        return;
      }

      const balance = myAccountInfo.assets
      ? myAccountInfo.assets.find(
          (element) => element["asset-id"] === ASSET_ID
        ).amount / 100
      : 0;

      if (voteData.amount > balance) {
        alert("You do not have sufficient balance to make this transaction.");
        return;
      }

       dispatch({
        type: "confirm_wallet",
        alertContent : "Go to Pera Wallet & Confirm your Vote"
      })

      const suggestedParams = await algodClient.getTransactionParams().do();
      const amountToSend = voteData.amount * 100;
     
      const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
        from: address,
        to: voteData.address,
        amount: amountToSend,
        assetIndex: ASSET_ID,
        suggestedParams,
      });

      const txnsToSign = [
        {
          txn: Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString(
            "base64"
          ),
          message: "Transaction using Mobile Wallet",
        },
      ];

      const requestParams = [txnsToSign];

      const request = formatJsonRpcRequest("algo_signTxn", requestParams);
      const result = await connector.sendCustomRequest(request);

      const decodedResult = result.map((element) => {
        return element ? new Uint8Array(Buffer.from(element, "base64")) : null;
      });

     
 

      await algodClient.sendRawTransaction(decodedResult).do();
      dispatch({
        type: "close_wallet"
      })
      dispatch({
        type: "alert_modal",
        alertContent: "Your vote has been recorded.",
      });
      // setTimeout(() => window.location.reload(), 1500);

      
   
     
    } catch (error) {
      if (error.message === "Can not open popup window - blocked") {
        dispatch({
          type: "close_wallet"
        })

        dispatch({
          type: "alert_modal",
          alertContent:
            "Pop Up windows blocked by your browser. Enable pop ups to continue.",
        });
      } else {
        dispatch({
          type: "close_wallet"
        })

        dispatch({
          type: "alert_modal",
          alertContent: "An error occured during the transaction process",
        });
      }
    }
  };

  const placeVote = (address, amount, election) => {
    if(!isThereAddress) {
      dispatch({
        type: "alert_modal",
        alertContent: "Kindly connect wallet to vote!!",
      });
      return;
    }

    if (!address) {
      dispatch({
        type: "alert_modal",
        alertContent: "Select an option to vote!!",
      });
      return;
    } 
     
    
    if (walletType === "my-algo") {
      myAlgoSign({ address, amount, election });
    } else if (walletType === "algosigner") {
      algoSignerConnect({ address, amount, election });
    } else if (walletType === "walletconnect") {
      algoMobileConnect({ address, amount, election });
    }
   
  };

  if (isLoading)
    return (
      <div className="ptt_elt">
        <div className="ptt_elt_inn">
          <div className="ptt_hd">
            <p>participate By Voting</p>
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
          <p>participate by voting</p>
        </div>

        <ul className="card_list">
          {each_election_data?.map((slug, index) => {
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
                        <img src="https://i.postimg.cc/pXn0NRzL/logo.gif" alt="" />
                    </div>
                    <div className="card_elt_tit">{slug.name}</div>
                  </div>
                </div>

                <div className="card_elt_desc">{slug?.issue}</div>

                {/* <div className="voting_ends">
                  Voting ends: June 15th 2022, 4:00PM EST
                </div> */}

                <div className="results">
                  <div className="resultsTit">Results</div>

                  <div className="results_cont">
                    <div className="optionButt">
                      <div className="optionButtDets">
                        <p>Option 1</p>
                        <p>{address1.toLocaleString()} <img src="https://i.postimg.cc/mDtpdjqh/logo.png" style={{width : '12px', marginTop : '-1px'}} alt="choice logo"/></p>
                      </div>
                      <div className="optRange">
                        <div
                          className={`optRangeSlide ${(address1 > address2) ? "optRangeSlide1" :"optRangeSlide2"}`}
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
                        <p>{address2.toLocaleString()} <img src="https://i.postimg.cc/mDtpdjqh/logo.png" style={{width : '12px', marginTop : '-1px'}} alt="choice logo"/></p>
                      </div>
                      <div className="optRange">
                        <div
                          className={`optRangeSlide ${(address2 > address1) ? "optRangeSlide1" :"optRangeSlide2"}`}
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
                  <div className="card_cand_hd">
                    <div className="amountToCommit">
                      <p>Amount to commit:</p>
                      <input
                        id="max"
                        type="number"
                        min="1"
                        placeholder='1'
                        className="amtToCommitInp"
                      />
                      {
                        isThereAddress ? 
                      (<p className="max"
                         onClick={getMaxVoteValue}>
                          max
                        </p>
                            ) : null
                      }
                      
                    </div>
                  </div>

                  <div className="vote_collap">
                    <div className="card_cand_hd">Options</div>
                    {/* <ul className="vote_now_list">
                      {slug?.candidates?.map((item, index) => {
                        return (
                          <li key={index}>
                            <input
                              type="radio"
                              name="options"
                              value={item.address}
                            />

                            <p>{item.name}</p>
                          </li>
                        );
                      })}
                    </ul> */}

                 <ul className="vote_now_list">

                          <li>
                            <input
                              type="radio"
                              name="options"
                              value={each_election_data[0].candidates[0].address}
                            />

                            <p>{each_election_data[0].option1}</p>
                          </li>

                     <li>
                        <input
                          type="radio"
                          name="options"
                          value={each_election_data[0].candidates[1].address}
                        />

                        <p>{each_election_data[0].option2}</p>
                      </li>
                    </ul>
                    {/* <ul className="vote_now_list">

              
                      </ul> */}


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
                            : 1;

                          placeVote(
                            $("input[name=options]:checked", voteVal).val(),
                            amt,
                            slug
                          );
                        }}
                      >
                        Submit Vote <i className="uil uil-mailbox"></i>
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