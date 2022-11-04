import { Link } from "react-router-dom";
import logo from "../ApiBRLogo.png";

const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="https://apibr.com/ui/">
                <img src={logo} alt="API BR Logo" style={{ width: "48px", marginLeft: "10px"}} />
            </a>
            <div>
                <ul className="navbar-nav me-auto">
                    <li className="nav-item">
                        <Link className="nav-link active" href="/">Vagas</Link>
                    </li>        
                    <li className="nav-item">
                        <Link className="nav-link" href="/repositorios">Repositórios</Link>
                    </li>
                </ul>                
            </div>
        </nav>
    )
}

export default NavBar;