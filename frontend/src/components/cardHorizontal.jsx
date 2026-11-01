import Fundo from '../assets/fundo.png';
import Cart from '../assets/shoppingCart.svg';
import Modal from './modal';
import CardModal from './cardModal';
import { useState } from 'react';
import './styleCardHorizontal.css';
import FilmeNaN from '../assets/filmeNaNHorizontal.png';
import { adicionarAoCarrinho } from '../helper/axiosInstance';

function CardHorizontal(props) {
    const { filme, onAddToCart } = props;

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleCartClick = (event) => {
        console.log(
            "Clique no carrinho do CardHorizontal! A prop 'onAddToCart' é:",
            onAddToCart
        );
        event.stopPropagation();
        if (onAddToCart) {
            onAddToCart(filme);
        }
    };

    return (
        <>
            <div
                className="cardHorizontal"
                onClick={openModal}
                style={{
                    backgroundImage: filme.poster_path
                        ? `url(https://image.tmdb.org/t/p/original/${filme.poster_path})`
                        : `url(${FilmeNaN})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "216px",
                }}
            >
                <div className="infosHorizontal">
                    <div className="tituloContainer">
                        <p id="titulo">{filme.title.length > 30 ? filme.title.substring(0, 30) + "..." : filme.title}</p>
                    </div>
                    <div id="interacao">
                        <button type="button" onClick={openModal}>
                            About it
                        </button>
                        <div
                            id="shoppingCart"
                            onClick={(event) => {
                                event.stopPropagation(); // impede de abrir o modal
                                adicionarAoCarrinho(filme);
                            }}
                            style={{ cursor: 'pointer' }}
                        >
                            <img id="cart" src={Cart} alt="Adicionar ao carrinho" />
                        </div>
                    </div>
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <CardModal filme={filme} setOpenModal={setIsModalOpen} />
            </Modal>
        </>
    );
}

export default CardHorizontal;