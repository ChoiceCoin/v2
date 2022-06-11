import React from "react";
import SearchBar from "./search/search";
import './election.scss';

const ElectionPage = () => {
    return(
      <div className="election">
         <div className="election__content">
          <SearchBar />
         </div>
      </div>
    );
}

export default ElectionPage;
