import React, { useState, useEffect } from "react";
import SearchBar from "./search/search";
import ElectionCard from "./participate/participate";
import BarLoader from 'react-spinners/BarLoader';
import { useDispatch } from "react-redux";
import axios from "axios";
import './election.scss';

const ElectionPage = ({darkTheme}) => {
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
    axios.get('https://v2-testnet.herokuapp.com/elections').then(response => {
       setElections(response.data.data)

       dispatch({
         type : "getAllElection",
          allElection : response.data.data
       })
      console.log(response.data.data)

    })
  }, [])

    return(
      <div className="election">
         <div className="election__content">
          <SearchBar searchChange={onSearchChange} />

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
               filteredElectionList.map((election, index) => {
                 return(
                   <ElectionCard key={index} election={election} index={index}/>
                 )
               })
             }
           </div>
           )
          }
         </div>
      </div>
    );
}

export default ElectionPage;
