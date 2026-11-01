import "./AboutUs.css";

const ImageWithText = () => {
  return (
    <section className="image-with-text-container" aria-label="About Us">
      <div className="image-column">
        <img
          src="/logo_grande.png"
          alt="Simon Filmes company logo featuring bold stylized text Simon Filmes centered on a clean white background, conveying a professional and creative atmosphere"
          loading="lazy"
        />
      </div>
      <div className="text-column">
        <h2>Lorem ipsum dolor sit amet</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </section>
  );
};

export default ImageWithText;
