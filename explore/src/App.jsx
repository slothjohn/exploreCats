import React, { useEffect, useState } from "react";
import axios from "axios";

const ACCESS_KEY = import.meta.env.API_KEY;


function App() {
  const [catIds, setCatIds] = useState([]);
  const [img, setImg] = useState(null);
  const [name, setname] = useState(null);
  const [life, setLife] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [buttons, setButtons] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.thecatapi.com/v1/images/search?limit=100", {
        headers: {
          "x-api-key": ACCESS_KEY
        }
      })
      .then(response => {
        const ids = response.data.filter(cat => cat.id.length === 9).map(cat => cat.id);
        setCatIds(ids);
      })
      .catch(error => console.log(error));
  }, []);

  const handleSelectCat = () => {
    const randomIndex = Math.floor(Math.random() * catIds.length);
    const randomCatId = catIds[randomIndex];

    axios
      .get(`https://api.thecatapi.com/v1/images/${randomCatId}`, {
        headers: {
          "x-api-key": ACCESS_KEY
        }
      })
      .then(response => {
        console.log(response.data);
        setname(response.data.breeds[0].name);
        setImg(response.data.url);
        setLife(response.data.breeds[0].life_span);
        setOrigin(response.data.breeds[0].origin);
      })
      .catch(error => console.log(error));
  };

  const handleAddButton = (value) => {
    setButtons([...buttons, value]);
  }

  const handleRemoveButton = (value) => {
    setButtons(buttons.filter(button => button !== value));
  }

  return (
    <div>
      <h1>Cats</h1>
      <p>Explore Cats. Learn about their names, life span, and origin!</p>
      <button onClick={handleSelectCat}>Explore</button>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <img src={img} style={{ maxWidth: "100%", maxHeight: "400px" }} />
        {name && (<button onClick={() => handleAddButton(name)}> Name: {name}</button>)}
        {life && (<button onClick={() => handleAddButton(life)}> Life Span: {life}</button>)}
        {origin && (<button onClick={() => handleAddButton(origin)}> Origin: {origin}</button>)}
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h2>Banned List</h2>
        {buttons.map((button, index) => (
          <button key={index} onClick={() => handleRemoveButton(button)}> {button}</button>
        ))}
      </div>
    </div>
  );
}

export default App;
