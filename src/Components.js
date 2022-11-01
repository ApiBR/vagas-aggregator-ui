import React from "react";

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
    for (let i = 1; i <= pages; i++) {
        pagesItems.push(<Page key={i} page={i} currentPage={currentPage} loadPage={loadPage} />);
    }
   return (
    <div className="col-lg-12">
        <ul className="pagination pagination-sm">
            {pagesItems}
        </ul>
    </div>
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
    console.log(typeof(labels));
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
    return (
        <div className="card border-default mb-3 col-lg-3">
            <div className="card-header">
                <img src={issue.repository.organization.avatar_url} alt={issue.repository.organization.login} className="rounded-circle img-responsive" style={{width: "48px"}} />
                &nbsp;<a href={url}>{issue.repository.organization.login}</a>
            </div>
            <div className="card-body">
                <div className="alert alert-warning mt-3 mb-3">
                    <a href={issue.url} target="_blank" rel="noopener noreferrer">Ver vaga no GitHub <i className="fa fa-github" /></a>
                </div>
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
            <div className="alert alert-primary col-lg-12 text-center">
                Total vagas: {totalIssues}
            </div>
            <Pagination pages={totalPages} currentPage={currentPage} loadPage={loadPage} />
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
    const repositoryUrl = githubUrl + repository.organization.login + "/vagas";
    const issuesUrl = repositoryUrl + "/issues";
    return (
        <div className="card border-default mb-3 col-lg-4">
            <div className="card-header">
                <img src={repository.organization.avatar_url} alt={repository.organization.login} className="rounded-circle img-responsive" style={{width: "48px"}} />
                &nbsp;<a href={repositoryUrl} target="_blank" rel="noopener noreferrer">{repository.organization.login}</a>
                &nbsp;<span className="badge badge-success">{repository.issues} vagas</span>
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
            <div className="alert alert-primary col-lg-12 text-center">
                Repositórios: {repositories.length}
            </div>
            {repositoriesItems}
        </div>
    )
}