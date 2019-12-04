import React, { useState } from 'react';
import Search from './components/Search';
import logo from './img/logo.png';
import './App.css';

function App() {
  const currentData = JSON.parse(localStorage.getItem('data'));
  const data = [];
  const [isFavorite, setIsFavorite] = useState(false);

  function initData() {
    currentData._embedded.episodes.map((element) => {
      if (element.image) {
        const episode = {}
        episode.id = element.id;
        episode.img = element.image.medium;
        episode.name = element.name;
        episode.text = element.summary;
        episode.favorite = false;
        
        data.push(episode);
      }
    });
  }

  async function setFavorite(id) {
    await data.map((episode) => {
      if(episode.id === id) {
        episode.favorite = !episode.favorite;
      }
    })
  }

  function renderCards() {
    let cards;

    if (isFavorite === true) {
      cards = (
        data.map((card) => {
          if (card.favorite === true) {
            return (
              <li className="card__item" key= {card.id}>
                <h3 className="card__name">{card.name}</h3>
                <button onClick={()=> setFavorite(card.id)} className="favorites">
                <img src={card.favorite ? "./img/isFavorite.png" : "./img/markFavorite.png"} alt="" />
                </button>
                <img className="card-image" src={card.img} alt=""/>
                <p className="card-text">{card.text}</p>
              </li>
            )
          }
        })
      )
    } else {
      cards = (
        data.map((card) => {
          return (
            <li className="card__item" key= {card.id}>
              <div className="card-head">
                <h3 className="card__name">{card.name}</h3>
                <button onClick={()=> setFavorite(card.id)} className="favorites">
                  <img src={card.favorite ? "./img/isFavorite.png" : "./img/markFavorite.png"} alt="" />
                </button>
              </div>
              <img className="card-image" src={card.img} alt=""/>
              <p className="card-text">{card.text}</p>
            </li>
          )
        })
      )
    }

    return cards;
  }

  return (
    initData(),
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="Rick and Morty Episodes API" className="logo img--center"></img>
        <Search />
      </header>

      <div>
      <button className="show-favorites" onClick={() => setIsFavorite(!isFavorite)}>
        {isFavorite ? "Hide favorites" : "Show favorites"}
      </button>

      <ul className="cards-container">
        {renderCards()}
      </ul>
      </div>
    </div>
  );
}

export default App;
