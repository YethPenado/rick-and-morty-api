import React, { useState } from 'react';

export default () => {
  let data = JSON.parse(localStorage.getItem('data'));

  const [input, setInput] = useState();
  const [currentCart, setCurrentCart] = useState();

  function handleChange(event) {
    setInput(event.target.value);
    data._embedded.episodes.map((card) => {
      if (card.name === event.target.value) {
        setCurrentCart(showMatch(card));
      }
    });
  }

  function showMatch(card) {
    
    return (
      <div className='match-card'>
        <img className="match-card-image" src={card.image.medium} alt=""/>
        <h3 className="match-card-title">{card.name}</h3>
      </div>
    )
  }

  return (
    <div className="cont-search">
      <form className="form">
        <div className="form__item">
          <label>Search</label>
          <input type="text" value={input} name="search" onChange={handleChange}/>
        </div>
      </form>
      <div className="cont-match-cart">
        {currentCart}
      </div>
    </div>
  )
}
