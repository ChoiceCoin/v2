import React from "react";
import SearchBar from "./search/search";
import ElectionCard from "./participate/participate";
import './election.scss';

const ElectionPage = () => {
    return(
      <div className="election">
         <div className="election__content">
          <SearchBar />
           <div className="election__cards">
            <ElectionCard />
            <ElectionCard/>
            {/* <ElectionCard/>
            <ElectionCard />
            <ElectionCard />
            <ElectionCard />
            <ElectionCard />
            <ElectionCard />
            <ElectionCard /> */}
           </div>
         </div>
      </div>
    );
}

export default ElectionPage;
