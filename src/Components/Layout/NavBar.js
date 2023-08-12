import { NavLink } from "react-router-dom";
import logo from "../../ApiBRLogo.png";
import classnames from "classnames";
import useMetadata from "../../Hooks/useMetadata";

const NavBar = () => {

  let ApiMetadata = useMetadata();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-between">
      <a className="navbar-brand" href="https://apibr.com/ui/">
        <img
          src={logo}
          alt="API BR Logo"
          style={{ width: "80px", height: "80px", marginLeft: "10px" }}
          loading="lazy"
        />
      </a>
      <div>
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <NavLink
              className={({ isActive }) =>
                classnames("nav-link", { active: isActive })
              }
              to="/"
            >
              Vagas
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={({ isActive }) =>
                classnames("nav-link", { active: isActive })
              }
              to="/repositorios"
            >
              Repositórios
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={({ isActive }) =>
                classnames("nav-link", { active: isActive })
              }
              to="/recrutadores"
            >
              Recrutadores
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={({ isActive }) =>
                classnames("nav-link", { active: isActive })
              }
              to="/nova-vaga"
            >
              Publicar uma vaga
            </NavLink>
          </li>
        </ul>
      </div>
      <div>
        <a href="https://apibr.com/vagas/swagger/" title="Swagger da API v1">
        <span className="badge bg-info"><i className="fa fa-code-fork"></i> Versão da API: {ApiMetadata.version}</span>
        <br />
        <span className="badge bg-info"><i className="fa fa-clock-o"></i> Data da API: {ApiMetadata.date}</span>
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
