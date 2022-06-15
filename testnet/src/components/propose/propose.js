import React from "react";
import { useDispatch } from "react-redux";
import algosdk from "algosdk";
import './propose.scss';

const Propose = () => {
  const dispatch = useDispatch();
  const isThereAddress = localStorage.getItem("address");
  const algod_token = {
    "X-API-Key": "z6H94GE3sI8w100S7MyY92YMK5WIPAmD6YksRDsC"
  }
  const algod_address = "https://testnet-algorand.api.purestake.io/ps2";
  const headers = "";

  const algodClient = new algosdk.Algodv2(algod_token, algod_address, headers);
  const walletType = localStorage.getItem("wallet-type");
  const rewardsAddress = 'ZW4E323O6W3JTTVCDDHIF6EY75HSU56H7AGD3UZI54XCQOMNRCWRTYP5PQ'

    //disable past dates
    // const disablePastDate = () => {
    //     const today = new Date();
    //     const dd = String(today.getDate() + 1).padStart(2, "0");
    //     const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    //     const yyyy = today.getFullYear();
    //     return yyyy + "-" + mm + "-" + dd;
    // };

    const createProposal = () => {

      if(!isThereAddress) {
        dispatch({
          type: "alert_modal",
          alertContent: "Kindly Connect Wallet To Make Payment.",
        });
        return;
    } else if(!(document.getElementById('governance_name').value)) {
      dispatch({
        type: "alert_modal",
        alertContent: "You didn't enter governance name.",
      });
      return;
    }
      
     else if(!(document.getElementById('rewards').value)) {
        dispatch({
          type: "alert_modal",
          alertContent: "Enter Choice Rewards for Governance.",
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
          alertContent: "Enter what option 1 should be ?",
        });
        return;
      } else if (!(document.getElementById('option2').value)) {
        dispatch({
          type: "alert_modal",
          alertContent: "Enter what option 2 should be ?",
        });
        return;
      }

    }


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
            <p className="inp_tit">Governance name</p>
            <input id="governance_name"
              type="text"
            />
            <p className="ensure_txt">
              A short header for your proposal
            </p>
          </div>
          <div className="v_inp_cov inpCont_cand">
            <p className="inp_tit">Rewards</p>
            <input
              type="text" id="rewards"
            />
            <p className="ensure_txt">
              How much in $Choice Token are you giving to voters
            </p>
          </div>
          <div className="v_inp_cov inpCont_cand">
            <p className="inp_tit">Voting issue</p>
            <input
              type="text"
              id="issue"
            />
            <p className="ensure_txt">
              A short description of what the issue is about
            </p>
          </div>
          <div className="v_inp_cov inpCont_cand">
            <p className="inp_tit">Option 1</p>
            <input
              type="text"
              id="option1"
            />
            <p className="ensure_txt">
              What option 1 should be
            </p>
          </div>
      
          <div className="v_inp_cov inpCont_cand">
            <p className="inp_tit">Option 2</p>
            <input
              type="text"
              id="option2"
            />
            <p className="ensure_txt">
              What option 2 should be
            </p>
          </div>

          

          {/* <div className="v_inp_cov inpCont_cand">
            <p className="inp_tit">Governance Date</p>
            <input
              type="date"
              min={disablePastDate()}
            />
            <p className="ensure_txt">
              Pick a date for election
            </p>
          </div> */}
          
          

          <br />

          <div className="crt_butt">
            <button onClick={createProposal}>Create Proposal</button>
            <p className="safety">
              <span>Safety disclaimer :</span> We never store your data.
              Everything is encrypted.
            </p>
          </div>

          {/* ************** */}
        </div>

        {/* **************** */}
      </div>
    </div>
       </div>
    );
}

export default Propose;