import { Link } from "react-router-dom";
import LabelsList from "../Labels/LabelsList";
import ContributorsList from "../Contributors/ContributorsList";
import FormatDate from "../../Helpers/FormatDate";

const RepositoryItem = ({ repository }) => {
  const githubUrl = "https://github.com/";
  const repositoryUrl = githubUrl + repository.organization.login + "/" + repository.name;
  const issuesUrl = repositoryUrl + "/issues";
  const newIssueUrl = issuesUrl + "/new/choose";
  const url = "/?organizations=" + repository.organization.login;
  const urlAuthors = "/recrutadores?organizations=" + repository.organization.login;
  const mostRecentIssue = new Date(repository.mostRecent);
  const leastRecentIssue = new Date(repository.leastRecent);
  const organizationAvatar = repository.organization.avatar_url + "&size=48";

  return (
    <div className="card border-default mb-3 col-lg-4">
      <div className="card-header">
        <Link to={url} title={repository.organization.login}>
          <img
            src={organizationAvatar}
            alt={repository.organization.login}
            className="rounded-circle img-responsive"
            style={{ width: "48px", height: "48px" }}
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
        </span>{" "}
        <span className="badge bg-primary">
          <i className="fa fa-users"></i> {repository.authors} recrutador
          {repository.authors === 1 ? "" : "es"}
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
        </a>{" "}
        <Link to={urlAuthors} className="btn btn-outline-primary btn-sm">
          <i className="fa fa-users"></i> Ver recrutadores
        </Link>
        {repository.description && (
          <>
            <br /> <br /> {repository.description}
          </>
        )}
        {!repository.description && (
          <>
            <br /> <br /> 🔬 Espaço para divulgação de vagas
          </>
        )}
        <br />
        <br />
        {repository.issues > 0 && (
          <>
            <span className="badge bg-secondary mt-2">
              <i className="fa fa-calendar"></i> Vaga mais recente:{" "}
              {FormatDate(mostRecentIssue)}
            </span>
            <br />
            <span className="badge bg-secondary mt-2">
              <i className="fa fa-calendar"></i> Vaga mais antiga:{" "}
              {FormatDate(leastRecentIssue)}
            </span>
            <br />
            <br />
          </>
        )}
        <LabelsList labels={repository.labels} />
      </div>
      <div className="card-footer">
        <ContributorsList contributors={repository.contributors} />
      </div>
    </div>
  );
};

export default RepositoryItem;
