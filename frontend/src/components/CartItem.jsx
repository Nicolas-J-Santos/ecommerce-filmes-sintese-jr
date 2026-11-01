import './styleCartItem.css';
import Estrela from '../assets/estrela.png';
import Relogio from '../assets/relogio.png';
import React, { useState, useEffect } from 'react';

export default function CartItem({item, removeItem, updateQuantity, itemImplement, priceImplement, reportValueToParent}) {
  const filme = item.filme || {};
  const [qty, setQty] = useState(Number(item.quantidade) || 1);
  const [totalItems, setTotalItems] = useState(itemImplement());
  const [totalPrice, setTotalPrice] = useState(priceImplement());

  useEffect(() => {

    let newTotalItems = itemImplement();
    setTotalItems(newTotalItems);

    let newTotalPrice = priceImplement();
    setTotalPrice(newTotalPrice);

    if (reportValueToParent) {
      reportValueToParent(totalItems, totalPrice);
    }
  }, []);

  useEffect(() => {
    setQty(Number(item.quantidade) || 1);

    let newTotalItems = itemImplement();
    setTotalItems(newTotalItems);

    let newTotalPrice = priceImplement();
    setTotalPrice(newTotalPrice);

    if (reportValueToParent) {
      reportValueToParent(totalItems, totalPrice);
    }
  }, [item.quantidade]);

  const handleDecrease = () => {
    if (qty > 1) {
      const newQty = qty - 1;
      setQty(newQty);
      console.log (item._id);
      console.log (newQty);
      updateQuantity(newQty); 
    }
    window.location.reload(); 
  };

  const handleIncrease = () => {
    const newQty = qty + 1;
    setQty(newQty);
    console.log (item._id);
    console.log (newQty);
    updateQuantity(newQty);
    window.location.reload(); 
  };

  const pricePerUnit = filme.price || 99.99;
  const totalPriceItem = (pricePerUnit * qty).toFixed(2);

  const releaseYear = filme.release_date ? new Date(filme.release_date).getFullYear() : 'N/A';
  const runtime = filme.runtime || '—';
  const genres = Array.isArray(filme.genres) ? filme.genres.map(g => g.name).join(', ') : filme.genres || '—';
  const language = filme.original_language || '—';
  const voteAverage = filme.vote_average !== undefined ? parseFloat(filme.vote_average).toFixed(2) : '—';

  return (
    <div className="cartItem">
      <div
        className="poster"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w500${filme.poster_path || filme.backdrop_path || ''})`
        }}
        aria-label={`${filme.title} poster`}
      />
      <div className="details">
        <h2 className="title">
          {filme.title || 'Título não disponível'}{' '}
          <span className="year">({releaseYear})</span>
        </h2>

        <div className="infoRow">
          <img src={Estrela} alt="Avaliação" />
          <span>{voteAverage}</span>
        </div>

        <div className="infoRow">
          <img src={Relogio} alt="Duração" />
          <span>{runtime} min</span>
        </div>

        <p className="infoRow">Genre: {genres}</p>
        <p className="language">Language: {language}</p>
      </div>

      <div className="actions">
        <div className="quantity">
          <button onClick={handleDecrease} aria-label="Diminuir quantidade">–</button>
          <span>{qty}</span>
          <button onClick={handleIncrease} aria-label="Aumentar quantidade">+</button>
        </div>
        <div className="price">R$ {totalPriceItem}</div>
        <button className="removeBtn" onClick={removeItem}>Remover</button>
      </div>
    </div>
  );
}
