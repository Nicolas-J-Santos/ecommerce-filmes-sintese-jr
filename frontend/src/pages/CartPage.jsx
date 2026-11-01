import './styleCart.css';
import { useEffect, useState } from 'react';
import CartItem from '../components/CartItem.jsx';
import CheckoutSummary from '../components/CheckoutSummary.jsx';
import setaVoltar from '../assets/voltar.png';
import seeMore from '../assets/seeMore.png';
// import { useCart } from "../context/CartContext";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const PRECO_FIXO = 99.99;

  const reportValueToParent = (items, price) => {
    setTotalItems(items);
    setTotalPrice(price);
  };

  const fetchCartItems = () => {
    fetch('http://localhost:3000/carrinho')
      .then(res => res.json())
      .then(data => setCartItems(data))
      .catch(err => console.error('Erro ao buscar carrinho:', err));
  };

  const itemImplement = (items) => {
    console.log('items:', items);
    console.log('tipo:', typeof items);
    console.log('é array?', Array.isArray(items));
    let totalItems = items.reduce((acc, item) => acc + (item.quantidade || 0), 0);
    
    return totalItems;
  }
  const priceImplement = (items) => {
    console.log('items:', items);
    console.log('tipo:', typeof items);
    console.log('é array?', Array.isArray(items));
    let totalPrice = items.reduce(
    (acc, item) => acc + (item.quantidade || 0) * (item.filme?.price || PRECO_FIXO), 0).toFixed(2);

    return totalPrice;
  }

  useEffect(() => {
    fetchCartItems();
  }, []);

  const removeItem = (id) => {
    fetch(`http://localhost:3000/carrinho/${id}`, { method: 'DELETE' })
      .then(res => res.ok && fetchCartItems() && window.location.reload());
  };

  const decreaseQty = (id) => {
    fetch(`http://localhost:3000/carrinho/${id}`, { method: 'PATCH' })
      .then(res => res.ok && fetchCartItems());
  };

  const updateQuantity = (id_item, newQty) => {
    if (newQty < 1) return;
    let Envio = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantidade: newQty }),
    }
    console.log(Envio)
    fetch(`http://localhost:3000/carrinho/${id_item}`, Envio).then(res => res.ok && fetchCartItems());
  };

  return (
    <main>
      <div className="containerCarrinho">

        <div className="headerCarrinho">
          <button className="btnVoltar" onClick={() => window.history.back()}>
            <img src={setaVoltar} alt="Voltar" className="iconVoltar" />
            <span className="textoVoltar">Cart</span>
          </button>
        </div>

        <section className="conteudoCarrinho">

          {/*<div id="divider"></div>*/}

          <div className="conteudoGrid">

            {/* Coluna da lista de produtos */}
            <div className="itensCarrinho">

              {/* Cabeçalho da lista: Products e Price */}
              <div className="headerProdutosPreco">
                <h2 className="tituloProducts">Products</h2>
                <h2 className="tituloPrice">Price</h2>
              </div>

              {/* Lista dos filmes no carrinho */}
              {cartItems.slice(0, visibleCount).map(item => (
                <CartItem
                  key={item._id}
                  item={item}
                  removeItem={() => removeItem(item._id)}
                  decreaseQty={() => decreaseQty(item._id)}
                  updateQuantity={(newQty) => updateQuantity(item._id, newQty)}
                  itemImplement ={() => itemImplement(cartItems)}
                  priceImplement ={() => priceImplement(cartItems)}
                  reportValueToParent={(totalItems, totalPrice) => reportValueToParent(totalItems, totalPrice)}
                />
              ))}

              {/* Botão para ver mais */}
              {visibleCount < cartItems.length && (
                <button className="btnSeeMore" onClick={() => setVisibleCount(prev => prev + 3)}>
                  <span className="textoSeeMore">See More</span>
                  <img src={seeMore} alt="See More" className="iconSeeMore" />
                </button>
              )}
            </div>

            {/* Coluna do resumo do checkout */}
            <CheckoutSummary 
              items={cartItems}
              totalItems={totalItems}
              totalPrice={totalPrice} 
            />

          </div>
        </section>

      </div>
    </main>
  );
}

export default CartPage;
