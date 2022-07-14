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

  // Choice Coin Service Address
  const serviceAddress = '';


  //candidates
  const candidates = [{
    first : "firstcandidate"
  }, {
    second : "secondcandidate"
  }]


  // Crafting Transactioon
  const craftTransactions =async() => {
    const suggestedParams = await algodClient.getTransactionParams().do();

    //service fee
    const txn =  algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      from: isThereAddress,
      to: serviceAddress,
      amount: minimumChoice * 100,
      assetIndex: ASSET_ID,
      suggestedParams,
    });
    let continueExecution = true;
    try {
      const myAlgoWallet = new MyAlgoConnect({ shouldSelectOneAccount: false });
      const connector = new WalletConnect({
        bridge: "https://bridge.walletconnect.org",
        qrcodeModal: QRCodeModal,
      });
     if (walletType === "my-algo") {
      const signedTxn = await myAlgoWallet.signTransaction(txn.toByte());
      await algodClient.sendRawTransaction(signedTxn.blob).do();
      } 
      else if (walletType === "walletconnect") {
       // eslint-disable-next-line
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
          // eslint-disable-next-line
        const decodedResult = result.map((element) => {
          return element ? new Uint8Array(Buffer.from(element, "base64")) : null;
        });
        console.log(decodedResult);
        await algodClient.sendRawTransaction(decodedResult).do();
      }
    } catch (error) {
      continueExecution = false;
      dispatch({
        type: "alert_modal",
        alertContent: "An error occured during the transaction process",
      });
    }
    return continueExecution;
  }

    // This function creates a Candidate Credential which creates a new address for each option without mmemonics and update on approval.
    const createCandidates = () => {
    const candidateCred=[]
    // eslint-disable-next-line
      for (let candidate of candidates) {
        const { addr: address } = algosdk.generateAccount();
       candidateCred.push({
          private_key: "update address after approval",
          address,
        });
      }
     return candidateCred
    }

    // Create a proposal
    const createProposal = () => {
      if(!isThereAddress) {
        dispatch({
          type: "alert_modal",
          alertContent: "Kindly connect wallet to propose an issue.",
        });
        return;
    } else
     if(!(document.getElementById('governance_name').value) || !(document.getElementById('issue').value) || !(document.getElementById('option1').value) || !(document.getElementById('option2').value) || !minimumChoice) {
      dispatch({
        type: "alert_modal",
        alertContent: "Error, minimum requirements are not met.",
      });
      return;
    }
      const candidatesForElection = createCandidates()
      craftTransactions(candidatesForElection).then((continueExecution) => {
          if (continueExecution) {
            const headers = {
              "x-authorization-id": "",
            };
            axios
              .post(
                ``,
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
                  alertContent: `${response.data.message}, Thank you! Your proposal will be reviewed.`,
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
          <p className="converter-header"> Create Proposal </p>
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
                onClick={() => setMinimumChoice(1000000)}
              />
            By checking this box you agree to send a non-refundable amount of 1,000,000 Choice as a service fee for processing this proposal and running this vote. Additionally, you agree to <a href="https://github.com/ChoiceCoin/v2/blob/main/ProposalPolicy/ChoiceCoinv2Policy.pdf" style={{fontSize: "11px", cursor: "pointer", marginLeft:"-5px", color:"blue"}}>Choice Coin's Terms and Conditions.</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
       </div>
    );
}

export default Propose;
