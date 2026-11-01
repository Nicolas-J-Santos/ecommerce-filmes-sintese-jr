import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../../context/cartContext.jsx";
import Logo from "./Logo.jsx";
import SearchBar from "./SearchBar.jsx";
import CartButton from "./CartButton.jsx";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();

  // PASSO 2: Remover a linha do useState que estava errada
  // const [itemCount] = useState(0);

  // PASSO 3: Usar o contexto para obter a lista REAL de itens do carrinho
  const { cartItems } = useCart();

  // PASSO 4: Calcular a contagem a partir dos dados do contexto.
  // A contagem agora é dinâmica e mudará sempre que o carrinho mudar.
  const itemCount = cartItems.length;

  const handleCartClick = () => {
    navigate("/carrinho");
  };

  const handleLogoClick = () => {
    navigate("/");
  };
  
  return (
    <header className="site-header">
      <nav className="header-nav">
        <Logo onClick={handleLogoClick} />
        <SearchBar />
        {/* Agora você está passando a contagem correta e dinâmica para o botão! */}
        <CartButton itemCount={itemCount} onClick={handleCartClick} />
      </nav>
    </header>
  );
};

export default Header;