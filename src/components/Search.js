import React, { useState } from 'react';

function Search() {
  let data = JSON.parse(localStorage.getItem('data'));

  const [input, setInput] = useState();
  const [currentCard, setCurrentCard] = useState();

  function handleChange(event) {
    setInput(event.target.value);
    data._embedded.episodes.map((card) => {
      if (card.name === event.target.value) {
        setCurrentCard(showMatch(card));
      }
    });
  }

  function showMatch(card) {
    return (
      <div className='match-card'>
        <img className="match-card-image" src={card.image.medium} alt={card.name}/>
        <h3 className="match-card-title">{card.name}</h3>
      </div>
    )
  }

  return (
    <div className="cont-search">
      <form className="form">
        <label>Search</label>
        <input type="text" value={input} name="search" placeholder="Type a episode" onChange={handleChange}/>
      </form>
      <div className="cont-match-Card">
        {currentCard}
      </div>
    </div>
  );
}

export default Search;
