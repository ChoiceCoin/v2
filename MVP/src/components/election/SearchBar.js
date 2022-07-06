// Copyright Fortior Blockchain 2022
// 17 U.S.C §§ 101-1511

import React from "react";

// JSX Component SearchBar
const SearchBar = ({searchChange}) => {
  // Search bar
   return (
     <div className="search__bar">
         <i className="uil uil-search"></i>
       <input onChange={searchChange} type="text" placeholder="Search for voting process"/>
     </div>

   )
  
}

export default SearchBar;
