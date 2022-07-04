import React from "react";
import './search.scss';

const SearchBar = ({searchChange}) => {
   return (
     <div className="search__bar">
         <i className="uil uil-search"></i>
       <input onChange={searchChange} type="text" placeholder="Search for voting process"/>
     </div>

   )
  
}

export default SearchBar;
