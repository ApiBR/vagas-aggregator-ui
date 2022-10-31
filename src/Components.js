import React from "react";

export const Contributor = ({ contributor }) => {
    return (
        <div>
            <img src={contributor.avatar_url} alt={contributor.login} className="rounded-circle img-responsive" style={{width: "48px"}}/>
        </div>
    )
}

export const Contributors = ({ contributors }) => {
    const contributorsItems = contributors.map(contributor => {
        return (<Contributor contributor={contributor} key={contributor.id} />);
    });
    return (
        <div class="row">
            {contributorsItems}
        </div>
    )
}

export const Repository = ({ repository }) => {
    const githubUrl = "https://github.com/";
    const repositoryUrl = githubUrl + repository.organization.login + "/vagas";
    const issuesUrl = repositoryUrl + "/issues";
    return (
        <div className="card border-success mb-3 col-lg-4">
            <div className="card-header">
                <img src={repository.organization.avatar_url} alt={repository.organization.login} className="rounded-circle img-responsive" style={{width: "48px"}} />
                &nbsp;<a href={repositoryUrl}>{repository.organization.login}</a>
                &nbsp;<span class="badge badge-success">{repository.issues} vagas</span>
            </div>
            <div className="card-body">
                {repository.description}
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
        <div class="row">
            {repositoriesItems}
        </div>
    )
}