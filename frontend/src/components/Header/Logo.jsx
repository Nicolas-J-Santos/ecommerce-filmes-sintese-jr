const Logo = ({ onClick }) => {
  return (
    <div className="logo-container" onClick={onClick}>
      <img src="/logo.svg" alt="Logo Simon Filmes" className="logo-img" />
      <h1 className="logo-title">
        Simon
        <br />
        <span className="logo-subtitle">Filmes</span>
      </h1>
    </div>
  );
};

export default Logo;
