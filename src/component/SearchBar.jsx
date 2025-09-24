export const SearchBar = ({handleChange, handleSearch, placeholder}) => {
  return <>
   <div className="search-section">
        <input onChange={handleChange} type="text" placeholder={placeholder} />
        <button onClick={handleSearch}>Search</button>
      </div>
  </>
};