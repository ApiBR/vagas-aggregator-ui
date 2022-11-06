import { Link } from "react-router-dom";
import useLoadAll from "../Hooks/useLoadAll";
import { Placeholder } from "./Placeholder";

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
          {author.issues} vaga{author.issues === 1 ? "" : "s"} publicada{author.issues === 1 ? "" : "s"}
        </span>
      </div>
      <div className="card-body">
        {author.login}
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
  const [authors, allAuthorsLoaded] = useLoadAll("authors", { per_page: 100 });
  return (
    <div className="row mt-2 ml-1 mr-1">
      <div className="justify-content-center">
        <div className="alert alert-secondary text-center col-xs-6 col-lg-6 offset-lg-3">
          Recrutadores: {allAuthorsLoaded ? authors.length : 0}
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
