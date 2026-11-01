import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

import api from "../../api";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const searchContainerRef = useRef(null);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    const delayDebounceFn = setTimeout(async () => {
      try {
        const response = await api.get(`/catalogo?title=${searchTerm}`);
        setResults(response.data.results);
      } catch (error) {
        console.error("Erro ao buscar filmes:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setResults([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleResultClick = (filmeId) => {
    setSearchTerm("");
    setResults([]);
    navigate(`/catalogo/${filmeId}`);
  };

  return (
    <div className="search-bar-container" ref={searchContainerRef}>
      <input
        type="text"
        placeholder="Find Movie Titles"
        className="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <button className="search-button" aria-label="Pesquisar"></button>
      <span className="search-extra-icon" aria-label="icone">
        <img src="/search.svg" alt="icone barra" className="search-icon" />
      </span>

      {(results.length > 0 || loading) && (
        <div className="search-results">
          {loading ? (
            <div className="result-item">Carregando...</div>
          ) : (
            <ul>
              {results.map((filme) => (
                <li
                  key={filme._id}
                  className="result-item"
                  onClick={() => handleResultClick(filme._id)}
                  style={{ cursor: "pointer" }}
                >
                  {filme.title}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
