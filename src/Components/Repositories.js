import { Link } from "react-router-dom";
import { Labels } from "./Labels";
import { Contributors } from "./Contributors";
import { Placeholder } from "./Placeholder";
import useLoadAll from "../Hooks/useLoadAll";
import { FormatDate } from "../Helpers/FormatDate";
import classNames from "classnames";

export const Repository = ({ repository }) => {
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
        <Labels labels={repository.labels} />
      </div>
      <div className="card-footer">
        <Contributors contributors={repository.contributors} />
      </div>
    </div>
  );
};

export const Repositories = () => {
  const [repositories, allRepositoriesLoaded, lastModified] = useLoadAll(
    "repositories",
    { per_page: 100 }
  );

  return (
    <div className="row mt-2 ml-1 mr-1">
      <div className="justify-content-center">
        <div className="alert alert-secondary text-center col-xs-6 col-lg-6 offset-lg-3">
          Repositórios:{" "}
          <span
            className={classNames("badge roudend-pill", {
              "bg-danger": repositories.length === 0,
              "bg-warning": !allRepositoriesLoaded,
              "bg-success": repositories.length > 0,
            })}
          >
            {allRepositoriesLoaded ? repositories.length : "Carregando página "  + repositories.length + "..."}
          </span>
          <br />
          {!allRepositoriesLoaded && (
            <div className="progress">
              <div
                className="progress-bar bg-success"
                role="progressbar"
                aria-label="Success example"
                style={{ width: "50%" }}
                aria-valuenow="50"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          )}
          {allRepositoriesLoaded && (
            <span className="badge bg-info">
              Atualizado em: {FormatDate(new Date(lastModified))}
            </span>
          )}
        </div>
      </div>
      {!allRepositoriesLoaded && <Placeholder quantity={100} />}
      {allRepositoriesLoaded &&
        repositories.map((repository) => {
          return <Repository repository={repository} key={repository.id} />;
        })}
    </div>
  );
};
