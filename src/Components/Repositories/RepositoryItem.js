import { Link } from "react-router-dom";
import LabelsList from "../Labels/LabelsList";
import ContributorsList from "../Contributors/ContributorsList";

const RepositoryItem = ({ repository }) => {
  const githubUrl = "https://github.com/";
  const issuesUrl =
    githubUrl +
    repository.organization.login +
    "/" +
    repository.name +
    "/issues";
  const newIssueUrl =
    issuesUrl +
    "/new?assignees=&labels=&template=adicionar-nova-vaga.md&title=%5BCidade%20or%20Remoto%5D+Tecnologia+Developer+na+%5BNome+da+Empresa%5D";
  const url = "/?organizations=" + repository.organization.login;
  return (
    <div className="card border-default mb-3 col-4">
      <div className="card-header">
        <Link to={url}>
          <img
            src={repository.organization.avatar_url}
            alt={repository.organization.login}
            className="rounded-circle img-responsive"
            style={{ width: "48px" }}
          />
        </Link>{" "}
        <span className="badge bg-info rounded-pill">
          <i className="fa fa-briefcase"></i> {repository.issues} vaga
          {repository.issues === 1 ? "" : "s"}
        </span>
        <br />
        <Link to={url}>
          {repository.organization.login}/{repository.name}
        </Link>
      </div>
      <div className="card-body">
        <a
          href={newIssueUrl}
          target="_blank"
          rel="noreferrer"
          className="btn btn-outline-success btn-sm"
        >
          <i className="fa fa-plus"></i> Cadastrar nova vaga
        </a>
        <br />
        <br />
        {repository.description}
        <br />
        <br />
        <span className="badge bg-primary">
          <i className="fa fa-star"></i> {repository.stargazers} stargazer
          {repository.stargazers === 1 ? "" : "s"}
        </span>{" "}
        <span className="badge bg-primary">
          <i className="fa fa-bell"></i> {repository.subscribers} assinante
          {repository.subscribers === 1 ? "" : "s"}
        </span>
        <div className="alert alert-warning mt-3 mb-3">
          <a href={issuesUrl} target="_blank" rel="noopener noreferrer">
            Ver vagas disponívels no GitHub <i className="fa fa-github" />
          </a>
        </div>
        <LabelsList labels={repository.labels} />
      </div>
      <div className="card-footer">
        <ContributorsList contributors={repository.contributors} />
      </div>
    </div>
  );
};

export default RepositoryItem;
