import './styleCheckoutSummary.css';
import React, { useState, useEffect } from 'react';
import PaymentMethodSelector from './PaymentMethodSelector';

export default function CheckoutSummary({items, onClearCart, totalItems, totalPrice}) {
  const [paymentMethod, setPaymentMethod] = useState('pix');

  const handleCheckout = async () => {
    alert(`✅ Compra finalizada com ${paymentMethod.toUpperCase()}! Total: R$ ${totalPrice}`);

    if (onClearCart) {
      await onClearCart();
    }
  };

  return (
    <div className="checkoutSummary">
      <h3 className="titulo">Check-out</h3>

      <div className="resumoContainer">
        <div className="resumoLinha">
          <span>Number of Items:</span>
          <span>{totalItems}</span>
        </div>
        <div className="resumoLinha">
          <span>Total:</span>
          <span>R$ {totalPrice}</span>
        </div>
      </div>

      <div className="pagamentoContainer">
        <h4 className="subtitulo">Payment Methods</h4>
        <PaymentMethodSelector onChange={setPaymentMethod} selected={paymentMethod} />
      </div>

      <button className="botaoComprar" onClick={handleCheckout}>
        Buy Now
      </button>
    </div>
  );
}