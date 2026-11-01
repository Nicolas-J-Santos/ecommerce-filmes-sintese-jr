// src/components/Footer.jsx
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-logo-section">
          <div className="footer-logo">
            <img src="/logo2.svg" alt="Logo" />
            <div className="text-logo">Simon Filmes</div>
          </div>

          <Link to="/about" className="about-us">
            ABOUT US
          </Link>
        </div>

        <div className="footer-column-group">
          <div className="title-text">
            <h3>Powered By:</h3>
          </div>

          <div className="footer-columns-container">
            <div className="footer-column">
              <h4>Núcleo de criação</h4>
              <p>
                Ayla Costa <br />
                Ayla Santos <br />
                Giovanna Antunes
              </p>
            </div>

            <div className="footer-column">
              <h4>Núcleo de Front-end</h4>
              <p>
                Danilo Nishimoto <br />
                Nicolas Santos <br />
                Samira Lins
              </p>
            </div>

            <div className="footer-column">
              <h4>Núcleo de Back-end</h4>
              <p>
                Giovanne Giroldo <br />
                Nicolas Fagundes <br />
                Vinícios Conceição
              </p>
            </div>
          </div>

          <div className="fotter-after-columns">
            <p className="text-above">
              Orientados por: Giovanni Piccolo e Tiago Almeida
            </p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 Síntese Jr.</p>
      </div>
    </footer>
  );
};

export default Footer;
