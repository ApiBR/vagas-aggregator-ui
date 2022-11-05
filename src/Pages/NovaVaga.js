import {Link } from "react-router-dom";

const NovaVaga = () => {
  return (
    <div className="alert alert-info text-center">
      Para publicar uma nova vaga, crie uma conta no{" "}
      <a href="https://github.com">GitHub</a> e então localize o repositório
      desejado, e siga as regras de publicação de cada repositório.
      <br />
      Os links dos repositórios podem ser encontrados na página de <Link to="/repositorios">repositórios</Link> deste projeto.
    </div>
  );
};

export default NovaVaga;
