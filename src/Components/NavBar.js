export const NavBar = ({ doSearch, changeQuantity, currentQuantity }) => {
    let quantityInput;
    let searchInput;
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="https://apibr.com/ui/">API BR</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarColor02">
                <ul className="navbar-nav me-auto">
                    <li className="nav-item">
                        <a className="nav-link active" href="/ui/vagas">Vagas</a>
                    </li>        
                </ul>
                <select defaultValue={currentQuantity} className="form-control col-lg-4" onChange={() => changeQuantity(quantityInput) } ref={node => { quantityInput = node }}>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
                <form className="d-flex col-lg-6" onSubmit={(e) => {e.preventDefault(); doSearch(searchInput); }}>
                    <input className="form-control me-sm-2" type="text" placeholder="Pesquisar" ref={node => { searchInput = node }}/>
                    <button className="btn btn-secondary my-2 my-sm-0" type="submit">Pesquisar</button>
                </form>         
            </div>
        </nav>
    )
}