const Footer = () => {
  return (
    <footer className="font-small text-center mt-4 mb-3 mr-1 ml-1">
      Desenvolvido por{" "}
      <a
        href="https://guibranco.github.io/?utm_campaign=project&utm_media=vagas+aggregator&utm_source=apibr.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="https://guibranco.github.io/photo.png"
          alt="Guilherme Branco Stracini"
          className="image-rounded image-responsive"
          style={{ width: "24px" }}
        />
      </a>{" "}
      <a
        href="https://guibranco.github.io/?utm_campaign=project&utm_media=vagas+aggregator&utm_source=apibr.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Guilherme Branco Stracini
      </a>
    </footer>
  );
};

export default Footer;
