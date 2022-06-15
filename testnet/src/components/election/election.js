import React, { useState, useEffect } from "react";
import SearchBar from "./search/search";
import ElectionCard from "./participate/participate";
import BarLoader from 'react-spinners/BarLoader';
import axios from "axios";
import './election.scss';

const ElectionPage = ({darkTheme}) => {
  const [elections, setElections] = useState([]);
  const [searchField, setSearchField] = useState('');

  useEffect(() => {
    axios.get('http://localhost:4000/elections').then(response => {
       setElections(response.data.data)
      console.log(response.data.data)

    })
  }, [])

    return(
      <div className="election">
         <div className="election__content">
          <SearchBar />

          {
         !elections.length ? (
          <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            color: "var(--wht)",
            textAlign: "center",
            fontSize: "14px",
            fontWeight: darkTheme ? 400 : 500,
            textTransform: "uppercase",
          }}
        >
          <p style={{ opacity: 0.8, margin: "30px 0px 20px" }}>Getting Ongoing election...</p>
          <BarLoader
            color={darkTheme ? "#eee" : "#888"}
            size={150}
            speedMultiplier="0.5"
          />
        </div>
         ) : (
           <div className="election__cards">
             {
               elections.map((election, index) => {
                 return(
                   <ElectionCard key={index} election={election} index={index}/>
                 )
               })
             }
            {/* <ElectionCard /> */}
          
            {/* <ElectionCard/>
            <ElectionCard />
            <ElectionCard />
            <ElectionCard />
            <ElectionCard />
            <ElectionCard />
            <ElectionCard /> */}
           </div>
           )
          }
         </div>
      </div>
    );
}

export default ElectionPage;
