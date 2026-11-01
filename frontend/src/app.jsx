import { Routes, Route } from 'react-router-dom'
import { CartProvider } from "./context/cartContext.jsx";
import Catalogo from './pages/index.jsx'
import Carrinho from './pages/CartPage.jsx'
import FilmeDetalhes from './components/FilmeDetalhes/FilmeDetalhes.jsx'
import AboutUs from './components/AboutUs/AboutUs.jsx'
import Layout from './layout.jsx'
import Header from './components/Header/Header.jsx';



function App() {
  return (
  <CartProvider>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Catalogo />} />
        <Route path="/carrinho" element={<Carrinho />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/catalogo/:id" element={<FilmeDetalhes />} />
      </Route>
    </Routes>
  </CartProvider>
  )
}


export default App