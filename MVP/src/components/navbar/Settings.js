// Copyright Fortior Blockchain 2022
// 17 U.S.C §§ 101-1511

//Importing Relevant files and dependencies
import React from "react";
import disconnect from '../../assets/disconnect-logo.png';
//JSX Component Settings
const Settings = () => {
// Logout 
  const LogOut = () => {
    localStorage.removeItem("address");
    localStorage.removeItem("addresses");
    localStorage.removeItem("wallet-type");
    localStorage.removeItem("walletconnect");
    window.location.reload();
    console.log("data");
  };
  //Building Block
    return(
        <div className="settings__item" > 
          <div className="settings__content">
              <div className="mode-switcher" 
                 style={{
                     position: "relative",
                     padding: "10px",
                     display: "flex",
                     flexDirection:"column"
                 }}
               >
              </div>
              <div className="wallet__disconnect">
                <img src={disconnect} alt="disconnect icon" onClick={LogOut}  className="disconnect_button" style={{
                    width: "15px",
                    marginTop: "-3px"
                }} />
                <button onClick={LogOut}>Disconnect wallet</button>
              </div>
          </div>
        </div>
    );
}
export default Settings;

