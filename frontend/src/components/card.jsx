import Fundo from '../assets/fundo.png';
import Cart from '../assets/shoppingCart.svg';
import Modal from './modal';
import CardModal from './cardModal';
import { useState } from 'react';
import './styleCard.css';
import FilmeNaN from '../assets/filmeNaN.png'
import { adicionarAoCarrinho } from '../helper/axiosInstance';

function Card(props) {

    const { filme, onClick } = props

    return (
        <div className='card'>
            <img id='fundo' src={filme.poster_path ? `https://image.tmdb.org/t/p/original/${filme.poster_path}` : FilmeNaN} onClick={onClick} />
            <div className='tituloContainer'>
                <p id="titulo">{filme.title.length > 30 ? filme.title.substring(0, 30) + "..." : filme.title}</p>
            </div>
            <div className='compra'>
                <p id='precoAntigo'>R$99,99</p>
                <p id='preco'>R$99,99</p>
                <div id='shoppingCart' onClick={() => adicionarAoCarrinho(filme)} style={{ cursor: 'pointer' }}>
                    <img id='cart' src={Cart} alt="Carrinho" />
                </div>
            </div>
            <button type='button' onClick={onClick}>About it</button>

        </div>
    );
}


export default Card