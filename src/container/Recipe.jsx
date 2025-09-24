import { Header } from "../component/Header";
import { SearchBar } from "../component/SearchBar";
import { Card } from "../component/Card";
import { useState } from "react";



export const Recipe = () => {

  const [varibl, setVaribl] = useState("")
  const [data, setData] = useState([])

  const callApi = async ()=>{
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${varibl}`);
    const data = await res.json();
    console.log(data);
   setData(data?.meals);
  }

  const handleSearch = ()=>{
    callApi(varibl);
  }
  const handleChange = (e)=>{
    setVaribl(e.target.value);
    }

    const renderCard = data?.map((item, index)=>{
      return <div key={index} className="card">
        <img src={item["strMealThumb"]} alt={item["strMeal"]} />
        <h3>{item["strMeal"]}</h3>
       {/* Rest Content goes here */}
      </div>
    })


    console.log(data);
    

  return <>
  <Header title={"Recipe App"} />
  <SearchBar handleChange={handleChange} handleSearch={handleSearch} placeholder='Search for a movie' />
  <Card data={data} renderCard={renderCard} />

  </>
};