// Copyright Fortior Blockchain 2022
// 17 U.S.C §§ 101-1511

// import relevant dependencies
import React from "react";
import { Link } from "react-router-dom";

//JSX Component
const VotingAndProposalLinkPage = () => {
   return (
       <div className="voting__page">
         <div className="voting__header" >
             <h1>Vote and Propose Issues</h1>
             <p> Vote on existing issues or propose a new issue for decentralized governance. Kindly Connect Your Wallet Before Proceeding.</p>
         </div> 
         <div className="voting__card_header">
             <div className="voting__card">
               <h1> Vote </h1>
               <p> Vote on existing issues. </p>
               <Link to='/participate'>
                 <button> Vote </button>
               </Link>
             </div>
             <div className="voting__card">
               <h1> Propose </h1>
               <p> Propose a new issue. </p>
               <Link to='/propose'>
                <button> Propose</button>
               </Link>
             </div>
         </div>
       </div>
   )
}

export default VotingAndProposalLinkPage;
