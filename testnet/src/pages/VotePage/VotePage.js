import React from "react";
import { Link } from "react-router-dom";
import './VotePage.scss';

const VotingPage = () => {
   return (
       <div className="voting__page">
         <div className="voting__header" >
             <h1>Vote and Propose Issues </h1>
             <p> Vote on existing issues or propose a new issue for decentralized governance.</p>
         </div> 
         <div className="voting__card_header">
             <div className="voting__card">
               <h1>Vote  </h1>
               <p> Vote on existing issues.  </p>
               <Link to='/participate'>
                 <button> Vote </button>
               </Link>
             </div>
             <div className="voting__card">
             <h1>Propose  </h1>
               <p> Propose a new issue for decentralized governance. </p>
               <Link to='/propose'>
                <button> Propose</button>
               </Link>
              
             </div>
         </div>
       </div>
   )
}

export default VotingPage;
