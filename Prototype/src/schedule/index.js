import "../styles/faq.css";
import axios from "axios";
import { useEffect, useState } from "react";
import ASAList from "../components/SucessfulASAList";
import BottomNavigationBar from "../statics/BottomNavigationBar";
import SearchBox from "../components/SearchBox";
import BarLoader from 'react-spinners/BarLoader';
import { useSelector } from "react-redux";


const Schedule = () => {

  const darkTheme = useSelector((state) => state.status.darkTheme);
  const [succesfullAsasInformation, setSuccessfullAsasInformation] = useState([]);
  const [searchField, setSearchField] = useState('')

  const onSearchChange = (event) => {
    setSearchField(event.target.value);
   }
     const filteredASA = succesfullAsasInformation.filter(asa =>{
      return asa.name.toLowerCase().includes(searchField.toLowerCase());
    })


  useEffect(() => {
    axios.get('https://tita-backend.herokuapp.com/data').then(response => {
       setSuccessfullAsasInformation(response.data.data)
      console.log(response.data.data)

    })
  }, [])
  return (
    <div className="tc mb4">
      <SearchBox searchChange={onSearchChange} /> 
       {
         !succesfullAsasInformation.length ? (
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
          <p style={{ opacity: 0.8, margin: "30px 0px 20px" }}>Getting ASA(s) Schedules...</p>
          <BarLoader
            color={darkTheme ? "#eee" : "#888"}
            size={150}
            speedMultiplier="0.5"
          />
        </div>
         ) :
         <ASAList  asalist={filteredASA} />
       }
      
      <BottomNavigationBar txt='Make Payment' />
   
  </div>
);
};

export default Schedule;
