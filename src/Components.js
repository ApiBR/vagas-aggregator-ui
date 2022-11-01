import React from "react";

export const Page = ({ page, currentPage, loadPage }) => {
    let className = "page-item";
    if(page === currentPage) {
        className += " active";
    }

    return (
        <li className={className} onClick={() => loadPage(page)}>
            {page}
        </li>
    )
}

export const Pagination = ({ pages, currentPage, loadPage }) => {
    const pagesItems = [];
    for (let i = 1; i <= pages; i++) {
        pagesItems.push(<Page key={i} page={i} currentPage={currentPage} loadPage={loadPage} />);
    }
   return (
    <ul className="pagination pagination-sm">
        {pagesItems}
    </ul>
   )
}

export const Label = ({ label }) => {
    return (
        <span className="badge mr-2" style={{ backgroundColor: "#" + label.color, color: "#FFF" }}>
            {label.name}
        </span>
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
    const repositoryUrl = githubUrl + issue.repository.organization.login + "/vagas";
    const userUrl = githubUrl + issue.user.login;
    return (
        <div className="card border-default mb-3 col-lg-4">
            <div className="card-header">
                <img src={issue.repository.organization.avatar_url} alt={issue.repository.organization.login} className="rounded-circle img-responsive" style={{width: "48px"}} />
                &nbsp;<a href={repositoryUrl} target="_blank" rel="noopener noreferrer">{issue.repository.organization.login}</a>
            </div>
            <div className="card-body">
                {issue.title}
                <br />
                <div className="alert alert-warning mt-3 mb-3">
                    <a href={issue.url} target="_blank" rel="noopener noreferrer">Ver vaga</a>
                </div>
            </div>
            <div className="card-footer">
                <Contributor contributor={issue.user} />
                <a href={userUrl}>{issue.user.login}</a>
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
            <div className="alert alert-success col-lg-12 text-center">
                Total vagas: {totalIssues}
            </div>
            {issuesItems}
            <Pagination pages={totalPages} currentPage={currentPage} loadPage={loadPage} />            
        </div>
    )
}

export const Contributor = ({ contributor }) => {
    return (
        <div className="mb-2 mr-2">
            <a href={contributor.url} target="_blank" title={contributor.login} rel="noopener noreferrer">
                <img src={contributor.avatar_url} alt={contributor.login} className="rounded-circle img-responsive" style={{width: "48px"}}/>
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
                    <a href={issuesUrl} target="_blank" rel="noopener noreferrer">Ver vagas disponívels</a>
                </div>
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
            {repositoriesItems}
        </div>
    )
}