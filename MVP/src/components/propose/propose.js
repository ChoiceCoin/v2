// Copyright Fortior Blockchain 2022
// 17 U.S.C §§ 101-1511

// importing relevant files and dependencies
import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import MyAlgoConnect from "@randlabs/myalgo-connect";
import algosdk from "algosdk";
import { formatJsonRpcRequest } from "@json-rpc-tools/utils";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
import WalletConnect from "@walletconnect/client"; 


//JSX Component Propose
const Propose = () => {

 // Set initial state
 const [minimumChoice, setMinimumChoice] = useState();
 // Starting React-dispatch to dispatch action in state in the component
  const dispatch = useDispatch();

// Getting address from local storage
  const isThereAddress = localStorage.getItem("address");

  // Starting AlgoClient Instance
  const algod_token = {
    "X-API-Key": ""
  }
  const algod_address = "https://mainnet-algorand.api.purestake.io/ps2";
  const headers = "";
  const ASSET_ID = 297995609;
  const algodClient = new algosdk.Algodv2(algod_token, algod_address, headers);

  const walletType = localStorage.getItem("wallet-type");

  // Choice Coin Rewards Adrress
  const rewardsAddress = '';

  // Choice Coin Service Address
  const serviceAddress = '';


  //candidates
  const candidates = [{
    first : "firstcandidate"
  }, {
    second : "secondcandidate"
  }]

// Crafting Transactioon
  const craftTransactions =async(candidates) => {
    const txns = [];
  
    const suggestedParams = await algodClient.getTransactionParams().do();

    // top up payment
    for (let candidate of candidates) {
      const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        from: isThereAddress,
        to: candidate.address,
        amount: 100000,
        suggestedParams,
      });
      txns.push(txn);
    }
    // rewards 
    const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      from: isThereAddress,
      to: rewardsAddress,
      amount: (document.getElementById('rewards').value) * 100,
      assetIndex: ASSET_ID,
      suggestedParams,
    });

    txns.push(txn)

    //service fee
    const txn1 =  algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      from: isThereAddress,
      to: serviceAddress,
      amount: minimumChoice * 100,
      assetIndex: ASSET_ID,
      suggestedParams,
    });

    txns.push(txn1);

    algosdk.assignGroupID(txns);
    let continueExecution = true;

    try {
      const myAlgoWallet = new MyAlgoConnect({ shouldSelectOneAccount: false });
      const connector = new WalletConnect({
        bridge: "https://bridge.walletconnect.org",
        qrcodeModal: QRCodeModal,
      });

      if (walletType === "algosigner") {
        

        const signedTxns = await window.AlgoSigner.signTxn(
          txns.map((txn) => ({
            txn: window.AlgoSigner.encoding.msgpackToBase64(txn.toByte()),
          }))
        );
        await algodClient
          .sendRawTransaction(
            signedTxns.map((txn) =>
              window.AlgoSigner.encoding.base64ToMsgpack(txn.blob)
            )
          )
          .do();
      } else if (walletType === "my-algo") {
        const signedTxns = await myAlgoWallet.signTransaction(
          txns.map((txn) => txn.toByte())
        );

        // send the transactions to the net.
        await algodClient
          .sendRawTransaction(signedTxns.map((txn) => txn.blob))
          .do();
      } else if (walletType === "walletconnect") {
        let Txns = []

      // eslint-disable-next-line
      txns.map((transaction) => {

        Txns.push({
          txn: Buffer.from(algosdk.encodeUnsignedTransaction(transaction)).toString(
            "base64"
          ),
          message: "Transaction using Mobile Wallet",
        })
      })


      const requestParams = [Txns];

      const request = formatJsonRpcRequest("algo_signTxn", requestParams);
      const result = await connector.sendCustomRequest(request);
   // eslint-disable-next-line
      const decodedResult = result.map((element) => {
        return element ? new Uint8Array(Buffer.from(element, "base64")) : null;
      });

      }
    } catch (error) {
      console.log(error);
      continueExecution = false;
    }

    return continueExecution;

  }

    const createCandidates = () => {
    const candidateCred=[]
    // eslint-disable-next-line
      for (let candidate of candidates) {
        const { sk: private_key, addr: address } = algosdk.generateAccount();
       candidateCred.push({
          private_key: algosdk.secretKeyToMnemonic(private_key),
          address,
        });
      }

     return candidateCred

    }

    // Proposal checks
    const createProposal = () => {

      if(!isThereAddress) {
        dispatch({
          type: "alert_modal",
          alertContent: "Kindly Connect Wallet to propose an election.",
        });
        return;
    } else if(!(document.getElementById('governance_name').value)) {
      dispatch({
        type: "alert_modal",
        alertContent: "No governance name is found.",
      });
      return;
    }
      
     else if(!(document.getElementById('rewards').value)) {
        dispatch({
          type: "alert_modal",
          alertContent: "Voting rewards for governance voters not found.",
        });
        return;
      } else if (!(document.getElementById('issue').value)) {
        dispatch({
          type: "alert_modal",
          alertContent: "Voting issue for governance not found.",
        });
        return;
      } else if (!(document.getElementById('option1').value)) {
        dispatch({
          type: "alert_modal",
          alertContent: "Option 1 not found.",
        });
        return;
      } else if (!(document.getElementById('option2').value)) {
        dispatch({
          type: "alert_modal",
          alertContent: "Option 2 not found.",
        });
        return;
      } else if(!minimumChoice) {
        dispatch({
          type: "alert_modal",
          alertContent: "You must accept Terms and Conditions before proposing a vote",
        });
        return;
      }
      const candidatesForElection = createCandidates()

      craftTransactions(candidatesForElection).then((continueExecution) => {
          if (continueExecution) {
            const headers = {
              "x-authorization-id": "",
            };
            // add choice per vote input
            axios
              .post(
                `https://v2-testnet.herokuapp.com/elections/create`,
                {
                  candidates: candidatesForElection,
                  name: document.getElementById("governance_name").value,
                  issue: document.getElementById("issue").value,
                  option1: document.getElementById("option1").value,
                  option2: document.getElementById("option2").value,
                  rewards: document.getElementById("rewards").value
                },
                { headers }
              )
              .then((response) => {
                dispatch({
                  type: "alert_modal",
                  alertContent: `${response.data.message}, Which will be reviewed and pending till approval for voting`,
                });
              });
          }
        });
      

    }

// Building block
    return (
       <div className="propose">
           <div className="create_elt">
      <div className="create_elt_inn">
        <div className="crt_hd">
          <p className="converter-header"> Create Proposal & Schedule Election</p>
        </div>


        <div className="vote_sect">
          <div className="vote_sect_img">

          </div>

          <div className="v_inp_cov inpCont_cand">
            <p className="inp_tit">Issue</p>
            <input id="governance_name"
              type="text"
            />
            <p className="ensure_txt">
            The title for the issue.
            </p>
          </div>
          <div className="v_inp_cov inpCont_cand">
            <p className="inp_tit">Rewards</p>
            <input
              type="text" id="rewards"
            />
            <p className="ensure_txt">
            Rewards distributed to voters on the Issue.
            </p>
          </div>
          <div className="v_inp_cov inpCont_cand">
            <p className="inp_tit">Description</p>
            <input
              type="text"
              id="issue"
            />
            <p className="ensure_txt">
            A short overview about the vote.
            </p>
          </div>
          <div className="v_inp_cov inpCont_cand">
            <p className="inp_tit">Option 1</p>
            <input
              type="text"
              id="option1"
            />
            <p className="ensure_txt">
              First choice.
            </p>
          </div>
      
          <div className="v_inp_cov inpCont_cand">
            <p className="inp_tit">Option 2</p>
            <input
              type="text"
              id="option2"
            />
            <p className="ensure_txt">
             Second choice.
            </p>
          </div>

            <br />

          <div className="crt_butt">
            <button onClick={createProposal}>Create Proposal</button>
            <p className="safety">
            <input
                style={{cursor : "pointer", marginRight: "5px"}}
                className="checkbox"
                type="checkbox"
                value={minimumChoice}
                onClick={() => setMinimumChoice(500000)}
              />
            By checking this box you agree to send a non-refundable amount of 500,000 Choice as a service fee for processing this proposal and running this vote. Additionally, you agree to <a href="https://github.com/ChoiceCoin/v2/blob/main/ProposalPolicy/ChoiceCoinv2Policy.pdf" style={{fontSize: "11px", cursor: "pointer", marginLeft:"-5px", color:"blue"}}>Choice Coin's Terms and Conditions.</a>.
            </p>
          </div>

        </div>

      </div>
    </div>
       </div>
    );
}

export default Propose;
