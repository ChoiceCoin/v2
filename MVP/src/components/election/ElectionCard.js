// Copyright Fortior Blockchain 2022
// 17 U.S.C §§ 101-1511

// Importing relevant library
import React from "react";
import { useDispatch} from "react-redux";
import { Link } from "react-router-dom";

// JSX Component ElectionCard
const ElectionCard = ({election, index})=> {
  // Each election card
  const dispatch = useDispatch();   
    return (
      <div className="election__card">
        <h1>{election.name}</h1>
         <p>
           {election.issue}
         </p>
         <Link to='/voting/participate'>
         <button
          onClick={()=> {
            dispatch({
             type : "getEachElectionNumber",
             electionIndex : index
            })
          }
         }> VOTE</button>
         </Link>    
      </div>
    );
}

export default ElectionCard;
