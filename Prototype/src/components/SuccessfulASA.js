import React from 'react';

const EachASA = (props) => {
    return (
      <div className='media tc grow bg-light-green br3 pa3 ma2 dib bw2 shadow-5'>
        <h1 className='name'>{props.name}</h1>
        <div className='tl pa3'>
          <h2 className='pa1 voting'> <span className='each vote'>Voting Issue:</span> {props.issue}</h2>
          <p className='pa1 voting'><span className='each'>Option 1 :</span>  {props.option1} </p>
          <p className='pa1 voting'> <span className='each'>Option 2: </span>{props.option2}</p>
          <p className='pa1 voting'><span className='each'>Schedule Date:</span> {
          (props.date < new Date().toISOString()) ? 
              <span className='dating'> Voting Date has elapsed</span>
               : <span className='schedule'>{props.date}</span> }</p>
        </div>
      </div>
    );
  }
  
  export default EachASA;