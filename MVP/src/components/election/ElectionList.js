// Copyright Fortior Blockchain 2022
// 17 U.S.C §§ 101-1511

// Importing relevant files and dependencies
import $ from "jquery";
import axios from "axios";
import algosdk from "algosdk";
import { useState} from "react";
import "../../styles/electionlist.css";
import { useQuery } from "react-query";
import BarLoader from "react-spinners/BarLoader";
import WalletConnect from "@walletconnect/client"; 
import MyAlgoConnect from "@randlabs/myalgo-connect";
import { useDispatch, useSelector } from "react-redux";
import { formatJsonRpcRequest } from "@json-rpc-tools/utils";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";



//JSX Component ElectionList
const ElectionList = () => {

  // Starting React-dispatch to dispatch action in state in the component
  const dispatch = useDispatch();

  // Getting election state from redux store
  const balance = useSelector((state) => state.status.balance);
  const addressNum = useSelector((state) => state.status.addressNum);
  const getElection = useSelector((state) => state.status.allElection);
  const getElectionNumber = useSelector((state) => state.status.eachElectionNumber)

 // Setting initial state
  const [address1, setAddress1] = useState(0);
  const [address2, setAddress2] = useState(0);

  // Getting address from local storage
  const isThereAddress = localStorage.getItem("address");

  // Getting wallet type from local storage
  const walletType = localStorage.getItem("wallet-type");

  // Setting each election data variable from redux state
  const each_election_data = [getElection[getElectionNumber]] 

  // Choice Asset ID
  const ASSET_ID =  21364625;


  // Getting election data result from database

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


// Starting algod Client
  const algodClient = new algosdk.Algodv2( {
    "X-API-Key": "AE6Ave7wNH8bKB1SiwutOakoTHreBlWZ9TMKElZs"
  },
  "https://testnet-algorand.api.purestake.io/ps2",
  "");
  
 // Getting max vote value 
  const getMaxVoteValue = () => {
    document.getElementById('max').value = balance[addressNum].balance;
    console.log(each_election_data);
  }

  // My algo wallet transaction function
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

  // Algosigner wallet transaction function
  const algoSignerConnect = async (voteData) => {
    try {

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

  // Pera wallet transaction function
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

// Place vote function
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

  // If data is yet to be gotten from the data -- set a loading spinner
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
                fontWeight: 500,
                textTransform: "uppercase",
              }}
            >
              <p style={{ opacity: 0.8, margin: "30px 0px 20px" }}>Loading</p>
              <BarLoader
                color= "#888"
                size={150}
                speedMultiplier="0.5"
              />
            </div>
          </ul>
        </div>
      </div>
    );
  if (error) return "An error has occurred: " + error.message;

  // else the data building block
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