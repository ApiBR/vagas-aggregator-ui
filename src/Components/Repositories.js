import { Labels } from "./Labels";
import { Contributors } from "./Contributors";
import useLoadAll from "../Hooks/useLoadAll";

export const Repository = ({ repository }) => {
    const githubUrl = "https://github.com/";
    const issuesUrl = githubUrl + repository.organization.login + "/" +  repository.name + "/issues";    
    const url = "?organizations=" + repository.organization.login;
    return (
        <div className="card border-default mb-3 col-lg-4">
            <div className="card-header">
                <a href={url}>
                    <img src={repository.organization.avatar_url} alt={repository.organization.login} className="rounded-circle img-responsive" style={{width: "48px"}} />
                </a>
                &nbsp;
                <span className="badge badge-info rounded-pill">{repository.issues} vagas</span>
                <br />
                <a href={url}>{repository.organization.login}/{repository.name}</a>                               
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

export const Repositories = () => {
    const repositories = useLoadAll("repositories", { per_page: 100 });
    const repositoriesItems = repositories.map(repository => {
        return (<Repository repository={repository} key={repository.id} />);
    });
    return (
        <div className="row mt-2 ml-1 mr-1">
            <div className="col-lg-12">
                <div className="alert alert-secondary text-center">
                    Repositórios: {repositories.length}
                </div>
            </div>
            {repositoriesItems}
        </div>
    )
}