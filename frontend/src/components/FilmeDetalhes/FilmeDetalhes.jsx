//para teste
import "./FilmeDetalhes.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api"; // ajuste o caminho se necessário
import Card from "../cardHorizontal";

const FilmeDetalhes = () => {
  const { id } = useParams();
  const [filme, setFilme] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buscarFilme = async () => {
      try {
        const response = await api.get(`catalogo/${id}`);
        setFilme(response.data);
      } catch (error) {
        console.error("Erro ao carregar filme:", error);
      } finally {
        setLoading(false);
      }
    };

    buscarFilme();
  }, [id]);

  const handleAddToCart = (filmeClicado) => {
    alert(`Filme "${filmeClicado.title}" adicionado ao carrinho!`);
    console.log("Adicionando ao carrinho:", filmeClicado);
  };

  if (loading) return <div>Carregando detalhes...</div>;
  if (!filme) return <div>Filme não encontrado.</div>;

  return (
    <div className="filme-detalhes-container">
      <Card filme={filme} onAddToCart={handleAddToCart} />
    </div>
  );
};

export default FilmeDetalhes;