import React from 'react';

const SearchBox = ({searchChange }) => {
  return (
    <div className='pa2'>
      <input
        className='search pa3 ba b--green bg-lightest-blue'
        type='search'
        placeholder='search ASA name'
        onChange={searchChange}
      />
    </div>
  );
}

export default SearchBox;