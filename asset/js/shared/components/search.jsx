import React from 'react';

const Search = ({onSubmit, loading, total}) => {
  const result = (loading) ? 'loading...' : total + ' total questions';

  return (
    <form onSubmit={onSubmit}>
      <input 
        name="search"
        type="text"
        className="search-input-wrap"
        placeholder="Search by name, email, or position..."/>
      <button type="submit" className="search-btn">
        <i className="ws-icon-search"></i>
      </button>
      <div className="search-result-text">{result}</div>
    </form>
  )
}

export default Search;
