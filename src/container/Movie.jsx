
import { Header } from '../component/Header';
import { SearchBar } from '../component/SearchBar';
import { useState } from 'react';
import { Card } from '../component/Card';
//onclick, //onchange


export const Movie =() => {

  const [varibl, setVaribl] = useState("Batman")
  const [data, setData] = useState([])

  const callApi = async ()=>{
    const res = await fetch(`https://imdb.iamidiotareyoutoo.com/search?q=${varibl}`);
    const data = await res.json();
    console.log(data);
   setData(data?.description);
  }


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
      <Header title={"Movie Search App"} />
     <SearchBar handleChange={handleChange} handleSearch={handleSearch} placeholder='Search for a movie' />
      <Card data={data} renderCard={renderCard} />
    </div>
  )
}


