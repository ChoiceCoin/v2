import React from "react";
import { Link } from "react-router-dom";
import './participate.scss';
import { useDispatch} from "react-redux";

const ElectionCard = ({election, index})=> {
  const dispatch = useDispatch();

  const isThereAddress = localStorage.getItem("address");


   
  console.log(election)
    return (
      <div className="election__card">
        <h1>{election.name}</h1>
         <p>
           {election.issue}
         </p>

       {
         isThereAddress ? 
         <Link to='/voting/participate'>
         <button
         onClick={()=> {
           dispatch({
            type : "getEachElectionNumber",
            electionIndex : index
           })
         }

        }> VOTE</button>
        </Link> :
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
       }  
  

    
         
      </div>
    );
}

export default ElectionCard;