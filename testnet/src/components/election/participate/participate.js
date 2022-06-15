import React from "react";
import './participate.scss';

const ElectionCard = ({election})=> {
    return (
      <div className="election__card">
        <h1>{election.name}</h1>
         <p>
           {election.issue}
         </p>
         <button> VOTE</button>
      </div>
    );
}

export default ElectionCard;