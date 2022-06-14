import React from "react";
import { Link } from "react-router-dom";
import './VotePage.scss';

const VotingPage = () => {
   return (
       <div className="voting__page">
         <div className="voting__header" >
             <h1>VOTE AND Propose on decisions </h1>
             <p> making proposals and voting on current electionssjsjjsjsjsjnsn jsjjjww whhw</p>
             <p> making proposals and voting on current electionssjsjjsjsjsjnsn jsjjjww whhw</p>
         </div> 
         <div className="voting__card_header">
             <div className="voting__card">
               <h1>Voting  </h1>
               <p> lorem ipsum making proposals and voting on current electionssjsjjsjsjsjnsn jsjjjww whhw  </p>
               <Link to='/participate'>
                 <button> participate </button>
               </Link>
             </div>
             <div className="voting__card">
             <h1>Voting  </h1>
               <p> lorem ipsum making proposals and voting on current electionssjsjjsjsjsjnsn jsjjjww whhw  </p>
               <Link to='/propose'>
                <button> Propose</button>
               </Link>
              
             </div>
         </div>
       </div>
   )
}

export default VotingPage;