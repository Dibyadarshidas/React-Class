
import './App.css'
import { useState , useEffect} from 'react';

//onclick, //onchange


function App() {

  const [varibl, setVaribl] = useState("Batman")
  const [data, setData] = useState([])

  const callApi = async ()=>{
    const res = await fetch(`https://imdb.iamidiotareyoutoo.com/search?q=${varibl}`);
    const data = await res.json();
    console.log(data);
   setData(data?.description);
  }

useEffect(()=>{
  

  //callApi();

},[])

const handleChange = (e)=>{
setVaribl(e.target.value);
}

const renderCard = data?.map((item, index)=>{
  return <div key={index} className="card">
    <img src={item["#IMG_POSTER"]} alt={item["#TITLE"]} />
    <h3>{item["#TITLE"]}</h3>
    <p>{item["#YEAR"]}</p>
    <p>{item["#ACTORS"]}</p>
    <p>{item["#AKA"]}</p>
    <p>{item["#IMDB_ID"]}</p>
    <p>{item["#IMDB_IV"]}</p>
  </div>
})

const handleSearch = ()=>{
  callApi(varibl);
}


  return (
    <div className="App">
      <h2>Movie Search App</h2>
      <div className="search-section">
        <input onChange={handleChange} type="text" placeholder='Search for a movie' />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="container">
        {data?.length > 0 && renderCard}
      </div>
    </div>
  )
}

export default App
