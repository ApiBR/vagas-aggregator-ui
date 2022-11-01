import React from "react";

export const FormatDate = (date) => {
    if (typeof date === "undefined" || date === null)
        return "--:--:-- --/--/----";
    var mm = date.getMonth() + 1;
    var d = date.getDate();
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    return [[(d > 9 ? "" : "0") + d, (mm > 9 ? "" : "0") + mm, date.getFullYear()].join("/"), [(h > 9 ? "" : "0") + h, (m > 9 ? "" : "0") + m, (s > 9 ? "" : "0") + s].join(":")].join(" ");
}

export const Page = ({ page, currentPage, loadPage }) => {
    let className = "page-item";
    if(parseInt(page) === parseInt(currentPage)) {
        className += " active";
    }

    return (
        <li className={className}>
            <button className="page-link" onClick={() => loadPage(page)}>
                {page}
            </button>
        </li>
    )
}

export const Pagination = ({ pages, currentPage, loadPage }) => {
    const pagesItems = [];
    const first = parseInt(currentPage) === 1;
    const classNameFirst = "page-item" + (first ? " disabled" : ""); 
    const last = parseInt(currentPage) === parseInt(pages);
    const classNameLast = "page-item" + (last ? " disabled" : "");
    pagesItems.push(<li className={classNameFirst}><button className="page-link" onClick={() => loadPage(1)}>&laquo;</button></li>);
    for (let i = 1; i <= pages; i++) {
        pagesItems.push(<Page key={i} page={i} currentPage={currentPage} loadPage={loadPage} />);
    }
    pagesItems.push(<li className={classNameLast}><button className="page-link" onClick={() => loadPage(pages)}>&raquo;</button></li>);
   return (
    <div className="col-lg-12">
        <ul className="pagination">
            {pagesItems}
        </ul>
    </div>
   )
}

export const LabelsDropDown = ({ labels }) => {
    const labelsItems = labels.map(label => {
        return (<option key={label.name}>{label.name}</option>);
    });
    return(
        <select>
            {labelsItems}
        </select>
    )
}

export const Label = ({ label }) => {
    const url = "?labels=" + label.name;
    return (
        <a href={url}>
            <span className="badge mr-2 mb-2" style={{ textTransform: "capitalize", border: "2px solid #" + label.color, color: "#FFF" }}>
                {label.name}
            </span>
        </a>
    )
}

export const Labels = ({ labels, issueId }) => {
    const labelsItems = labels.map(label => {
        const key = issueId + "-" + label.name;
        return (<Label label={label} key={key} />);
    })
    return (
        <div>
            {labelsItems}
        </div>
    )
}
 
export const Issue = ({ issue }) => {
    const githubUrl = "https://github.com/";
    const userUrl = githubUrl + issue.user.login;
    const url = "?organizations=" + issue.repository.organization.login;
    const createdAt = new Date(issue.created_at);
    const updatedAt = new Date(issue.updated_at);
    return (
        <div className="card border-default mb-3 col-lg-3">
            <div className="card-header">
                <img src={issue.repository.organization.avatar_url} alt={issue.repository.organization.login} className="rounded-circle img-responsive" style={{width: "48px"}} />
                &nbsp;<a href={url}>{issue.repository.organization.login}</a>
            </div>
            <div className="card-body">
                <div className="media">
                    <div className="media-body ml-3">                        
                        {issue.title}                            
                    </div>
                    <a className="pull-right text-center" href={userUrl} target="_blank" title={issue.user.login} rel="noopener noreferrer">
                        <img src={issue.user.avatar_url} alt={issue.user.login} className="media-object rounded-circle img-responsive" style={{width: "48px"}}/>  
                        <br />
                        <span>{issue.user.login}</span>
                    </a>                    
                </div>
                <span className="badge badge-secondary pb-2 pt-2 mr-1">
                    Enviado em: {FormatDate(createdAt)}
                </span>
                <span className="badge badge-secondary pb-2 pt-2">
                    Atualizado em: {FormatDate(updatedAt)}
                </span>
                <div className="alert alert-warning mt-3 mb-3">                    
                    <a href={issue.url} target="_blank" rel="noopener noreferrer">Ver vaga no GitHub <i className="fa fa-github" /></a>
                </div>                
            </div>
            <div className="card-footer">
                <Labels labels={issue.labels} issueId={issue.id} />
            </div>
        </div>
    )
}

export const Issues = ({ issues, totalIssues, totalPages, currentPage, loadPage }) => {
    const issuesItems = issues.map(issue => {
        return (<Issue issue={issue} key={issue.id} />);
    });
    return (
        <div className="row mt-2">
            <div className="alert alert-secondary col-lg-12 text-center">
                Vagas: {totalIssues}
            </div>
            <div className="col-lg-12">
                <Pagination pages={totalPages} currentPage={currentPage} loadPage={loadPage} />
            </div>
            {issuesItems}     
            <Pagination pages={totalPages} currentPage={currentPage} loadPage={loadPage} />
        </div>
    )
}

export const Contributor = ({ contributor, showName = false }) => {
    const name = showName ? (<span>{contributor.login}</span>) : "";
    return (
        <div className="mb-2 mr-2">
            <a href={contributor.url} target="_blank" title={contributor.login} rel="noopener noreferrer">
                <img src={contributor.avatar_url} alt={contributor.login} className="rounded-circle img-responsive" style={{width: "48px"}}/>
                {name}
            </a>
        </div>
    )
}

export const Contributors = ({ contributors }) => {
    const contributorsItems = contributors.map(contributor => {
        return (<Contributor contributor={contributor} key={contributor.id} />);
    });
    return (
        <div className="row">
            {contributorsItems}
        </div>
    )
}

export const Repository = ({ repository }) => {
    const githubUrl = "https://github.com/";
    const issuesUrl = githubUrl + repository.organization.login + "/vagas/issues";    
    const url = "?organizations=" + repository.organization.login;
    return (
        <div className="card border-default mb-3 col-lg-4">
            <div className="card-header">
                <a href={url} target="_blank" rel="noopener noreferrer">
                    <img src={repository.organization.avatar_url} alt={repository.organization.login} className="rounded-circle img-responsive" style={{width: "48px"}} />
                </a>&nbsp;<span className="badge badge-info rounded-pill">{repository.issues} vagas</span>
                <br />
                <a href={url} target="_blank" rel="noopener noreferrer">{repository.organization.login}</a>                               
            </div>
            <div className="card-body">
                {repository.description}
                <br />
                <div className="alert alert-warning mt-3 mb-3">
                    <a href={issuesUrl} target="_blank" rel="noopener noreferrer">Ver vagas disponívels no GitHub <i className="fa fa-github" /></a>
                </div>
                <Labels labels={repository.labels} />
            </div>
            <div className="card-footer">
                <Contributors contributors={repository.contributors} />
            </div>
        </div>
    )
}

export const Repositories = ({ repositories }) => {
    const repositoriesItems = repositories.map(repository => {
        return (<Repository repository={repository} key={repository.id} />);
    });
    return (
        <div className="row">
            <div className="alert alert-secondary col-lg-12 text-center">
                Repositórios: {repositories.length}
            </div>
            {repositoriesItems}
        </div>
    )
}

export const NavBar = ({ doSearch }) => {
    let input;
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
                <form className="d-flex" onSubmit={(e) => {e.preventDefault(); doSearch(input); }}>
                    <input className="form-control me-sm-2" type="text" placeholder="Pesquisar" ref={node => { input = node }}/>
                    <button className="btn btn-secondary my-2 my-sm-0" type="submit">Pesquisar</button>
                </form>
            </div>
        </nav>
    )
}