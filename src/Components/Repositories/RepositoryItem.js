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
  const url = "/?organizations=" + repository.organization.login;
  return (
    <div className="card border-default mb-3 col-lg-4">
      <div className="card-header">
        <Link to={url}>
          <img
            src={repository.organization.avatar_url}
            alt={repository.organization.login}
            className="rounded-circle img-responsive"
            style={{ width: "48px" }}
          />
        </Link>
        &nbsp;
        <span className="badge bg-info rounded-pill">
          {repository.issues} vagas
        </span>
        <br />
        <Link to={url}>
          {repository.organization.login}/{repository.name}
        </Link>
      </div>
      <div className="card-body">
        {repository.description}
        <br />
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
