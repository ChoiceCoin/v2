// Copyright Fortior Blockchain 2022
// 17 U.S.C §§ 101-1511

// import relevant dependencies
import { combineReducers } from "redux";

// initial state
const status = (
  state = {
    alertModal: { openModal: false, modalContent: "" },
    electModal: { openElectModal: false, modalData: null },
    voteModal: { openModalVote: false, voteData: null },
    confirmWallet: { openWallet: false, walletContent: ""},
    addressNum: 0,
    address: null,
    balance : [],
    eachElectionNumber: 0,
    allElection : [],
  },
  action
) => {
  //action before dispatching!
  switch (action.type) {
    
    case "getBalance" : 
      return {...state, balance : action.balance}

    case "setAlgoAddress" : 
      localStorage.setItem("address", `${action?.addr}`);
      return { ...state, addressNum: action.addressIndex };

     case "getEachElectionNumber" :
       return  {
         ...state, eachElectionNumber: action.electionIndex
       };

      case "getAllElection" : 
       return {...state, allElection : action.allElection}

    case "alert_modal":
      return {
        ...state,
        alertModal: { openModal: true, modalContent: action.alertContent },
      };

    case "close_modal":
      return { ...state, alertModal: { openModal: false, modalContent: "" } };

    case "confirm_wallet":
      return {...state, confirmWallet : { openWallet : true, walletContent: action.alertContent }} ; 

    case "close_wallet" :
      return {...state, confirmWallet : {openWallet : false, walletContent : ""} };
    default:
      return state;
  }
};

export default combineReducers({ status });
