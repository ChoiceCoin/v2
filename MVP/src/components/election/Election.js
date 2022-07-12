// Copyright Fortior Blockchain 2022
// 17 U.S.C §§ 101-1511

import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import ElectionCard from "./ElectionCard";
import BarLoader from 'react-spinners/BarLoader';
import { useDispatch } from "react-redux";
import axios from "axios";

const ElectionPage = () => {
  const dispatch = useDispatch();
  const [elections, setElections] = useState([]);
  const [searchField, setSearchField] = useState('');
  const onSearchChange = (event) => {
    setSearchField(event.target.value);
  }
  const filteredElectionList = elections.filter(eachElection => {
    return eachElection.name.toLowerCase().includes(searchField.toLowerCase());
  }) 
  useEffect(() => {
    axios.get('').then(response => {
       setElections(response.data.data)
       dispatch({
         type : "getAllElection",
          allElection : response.data.data
       })
      console.log(response.data.data)
    })
  }, [dispatch])
  return(
      <div className="election">
         <div className="election__content">
          <SearchBar searchChange={onSearchChange} />
          {
         !elections.length <0 && (
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
            fontWeight: 500,
            textTransform: "uppercase",
          }}
        >
          <p style={{ opacity: 0.8, margin: "30px 0px 20px" }}>Getting ongoing election...</p>
          <BarLoader
            color="#888"
            size={150}
            speedMultiplier="0.5"
          />
        </div>
         ) 
        }
         { elections.length > 0 &&
         (
           <div className="election__cards">
             {
               filteredElectionList.map((election, index) => {
                 return(
                   <ElectionCard key={index} election={election} index={index}/>
                 )
               })
             }
           </div>
           )

          }
        {
            elections.length===0 && (
              <p style={{
                margin: "18px",
                fontWeight: "bold",
                borderLeft: "solid 3px rgb(57, 129, 198)",
                paddingLeft: "10px",
              }}>There is currently no live election.</p>
            ) 
          }
         </div>
      </div>
    );
}

export default ElectionPage;
