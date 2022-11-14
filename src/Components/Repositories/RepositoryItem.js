import { Link } from "react-router-dom";
import LabelsList from "../Labels/LabelsList";
import ContributorsList from "../Contributors/ContributorsList";

const RepositoryItem = ({ repository }) => {
  const githubUrl = "https://github.com/";
  const repositoryUrl =
    githubUrl + repository.organization.login + "/" + repository.name;
  const issuesUrl = repositoryUrl + "/issues";
  const newIssueUrl =
    issuesUrl +
    "/new?assignees=&labels=&template=adicionar-nova-vaga.md&title=%5BCidade%20or%20Remoto%5D+Tecnologia+Developer+na+%5BNome+da+Empresa%5D";
  const url = "/?organizations=" + repository.organization.login;
  return (
    <div className="card border-default mb-3 col-lg-4">
      <div className="card-header">
        <Link to={url} title={repository.organization.login}>
          <img
            src={repository.organization.avatar_url}
            alt={repository.organization.login}
            className="rounded-circle img-responsive"
            style={{ width: "48px" }}
            loading="lazy"
          />
        </Link>{" "}
        <Link to={url} title={repository.organization.login}>
          {repository.organization.login}/{repository.name}
        </Link>
        <br />
        <span className="badge bg-info rounded-pill">
          <i className="fa fa-briefcase"></i> {repository.issues} vaga
          {repository.issues === 1 ? "" : "s"}
        </span>{" "}
        <span className="badge bg-primary">
          <i className="fa fa-star"></i> {repository.stargazers} stargazer
          {repository.stargazers === 1 ? "" : "s"}
        </span>{" "}
        <span className="badge bg-primary">
          <i className="fa fa-bell"></i> {repository.subscribers} assinante
          {repository.subscribers === 1 ? "" : "s"}
        </span>
      </div>
      <div className="card-body">
        <a
          href={newIssueUrl}
          target="_blank"
          rel="noreferrer"
          className="btn btn-outline-success btn-sm"
        >
          <i className="fa fa-plus"></i> Cadastrar nova vaga
        </a>{" "}
        <a
          href={repositoryUrl}
          target="_blank"
          rel="noreferrer"
          className="btn btn-outline-warning btn-sm"
        >
          <i className="fa fa-github"></i> Ver repositório
        </a>
        <br />
        <br />
        {repository.description}
        <br />
        <br />
        <LabelsList labels={repository.labels} />
      </div>
      <div className="card-footer">
        <ContributorsList contributors={repository.contributors} />
      </div>
    </div>
  );
};

export default RepositoryItem;
