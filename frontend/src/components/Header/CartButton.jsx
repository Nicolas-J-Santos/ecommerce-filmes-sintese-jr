import React from "react";
import CartIcon from '../../assets/carrinho.svg'

const CartButton = ({ itemCount, onClick }) => {
  return (
    <div
      className="cart-button-pro"
      onClick={onClick}
      role="button"
      aria-label="Carrinho"
    >
      <div className="icon-container">
        <img src={CartIcon} alt="Cart Icon" className="cart-icon" />
        {itemCount > 0 && <span className="item-count">{itemCount}</span>}
      </div>
      <span className="cart-text">Cart</span>
    </div>
  );
};

export default CartButton;
