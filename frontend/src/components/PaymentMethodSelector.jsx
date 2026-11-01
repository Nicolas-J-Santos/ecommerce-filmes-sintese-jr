import './stylePaymentMethodSelector.css';
import { useState, useEffect } from 'react';

function PaymentMethodSelector({ onChange, selected: externalSelected }) {
  const [selected, setSelected] = useState(externalSelected || 'pix');

  useEffect(() => {
    setSelected(externalSelected);
  }, [externalSelected]);

  const methods = [
    { id: 'pix', label: 'PIX' },
    { id: 'cartão de crédito', label: 'Cartão de Crédito' },
  ];

  const handleSelect = (id) => {
    setSelected(id);
    onChange && onChange(id);
  };

  return (
    <div className="paymentMethods">
      {methods.map((method) => (
        <button
          key={method.id}
          onClick={() => handleSelect(method.id)}
          className={`paymentBtn ${selected === method.id ? 'selected' : ''}`}
        >
          {method.label}
        </button>
      ))}
    </div>
  );
}

export default PaymentMethodSelector;