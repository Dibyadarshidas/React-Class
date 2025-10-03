export const SearchBar = ({handleChange, handleSearch, placeholder}) => {
  return (
    <div className="search-container scale-in">
      <div className="search-box">
        <input 
          onChange={handleChange} 
          type="text" 
          placeholder={placeholder}
          className="search-input"
        />
        <button 
          onClick={handleSearch}
          className="btn btn-primary"
        >
          🔍 Search
        </button>
      </div>
    </div>
  );
};