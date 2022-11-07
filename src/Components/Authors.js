import { Link } from "react-router-dom";
import useLoadAll from "../Hooks/useLoadAll";
import { Placeholder } from "./Placeholder";
import { FormatDate } from "../Helpers/FormatDate";
import classNames from "classnames";

export const Author = ({ author }) => {
  const githubUrl = "https://github.com/";
  const profileUrl = githubUrl + author.login;
  const url = "/?authors=" + author.login;
  return (
    <div className="card border-default mb-3 col-lg-2">
      <div className="card-header">
        <Link to={url}>
          <img
            src={author.avatar_url}
            alt={author.login}
            className="rounded-circle img-responsive"
            style={{ width: "48px" }}
          />
        </Link>
        &nbsp;
        <span className="badge bg-info rounded-pill">
          {author.issues} vaga{author.issues === 1 ? "" : "s"} publicada
          {author.issues === 1 ? "" : "s"}
        </span>
      </div>
      <div className="card-body">
        <Link to={url}>{author.login}</Link>
        <br />
        <div className="alert alert-warning mt-3 mb-3">
          <a href={profileUrl} target="_blank" rel="noopener noreferrer">
            Ver perfil no GitHub <i className="fa fa-github" />
          </a>
        </div>
      </div>
    </div>
  );
};

export const Authors = () => {
  const [authors, allAuthorsLoaded, lastModified] = useLoadAll("authors", {
    per_page: 100,
  });
  return (
    <div className="row mt-2 ml-1 mr-1">
      <div className="justify-content-center">
        <div className="alert alert-secondary text-center col-xs-6 col-lg-6 offset-lg-3">
          Recrutadores:{" "}
          <span
            className={classNames("badge roudend-pill", {
              "bg-danger": authors.length === 0,
              "bg-warning": !allAuthorsLoaded,
              "bg-success": allAuthorsLoaded && authors.length > 0,
            })}
          >
            {allAuthorsLoaded
              ? authors.length
              : "Carregando página " + authors.length + "..."}
          </span>
          <br />
          {!allAuthorsLoaded && (
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
          {allAuthorsLoaded && (
            <span className="badge bg-info">
              Atualizado em: {FormatDate(new Date(lastModified))}
            </span>
          )}
        </div>
      </div>
      {!allAuthorsLoaded && <Placeholder quantity={100} />}
      {allAuthorsLoaded &&
        authors.map((author) => {
          return <Author author={author} key={author.id} />;
        })}
    </div>
  );
};
