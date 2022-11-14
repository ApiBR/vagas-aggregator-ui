import { Link } from "react-router-dom";
import { FormatDate } from "../../Helpers/FormatDate";
import RepositoriesListGroup from "../Repositories/RepositoriesListGroup";

const AuthorItem = ({ author }) => {
  const githubUrl = "https://github.com/";
  const profileUrl = githubUrl + author.login;
  const url = "/?authors=" + author.login;
  const lastIssueAt = new Date(author.lastIssue_at);
  return (
    <div className="card border-default mb-3 col-lg-2">
      <div className="card-header">
        <Link to={url}>
          <img
            src={author.avatar_url}
            alt={author.login}
            className="rounded-circle img-responsive"
            style={{ width: "48px" }}
            loading="lazy"
          />
        </Link>{" "}
        <Link to={url} title={author.login}>
          {author.name !== null ? author.name : author.login}
        </Link>
        <br />
        <span className="badge bg-info mt-2">
          <i className="fa fa-briefcase"></i> {author.issues} vaga
          {author.issues === 1 ? "" : "s"} publicada
          {author.issues === 1 ? "" : "s"}
        </span>
        <br />
        <span className="badge bg-primary mt-2">
          <i className="fa fa-eye"></i> {author.followers} seguidor
          {author.followers === 1 ? "" : "es"}
        </span>
        <br />
        <span className="badge bg-secondary mt-2">
          <i className="fa fa-calendar"></i> Última vaga em:{" "}
          {FormatDate(lastIssueAt)}
        </span>
      </div>
      <div className="card-body">
        {author.bio && (
          <>
            {author.bio}
            <br />
          </>
        )}
        {author.repositories && (
          <RepositoriesListGroup
            repositories={author.repositories}
            authorLogin={author.login}
          />
        )}
      </div>
      <div className="card-footer">
        <a
          href={profileUrl}
          target="_blank"
          rel="noreferrer"
          className="btn btn-outline-warning btn-sm"
        >
          <i className="fa fa-github"></i> Ver perfil no GitHub
        </a>
      </div>
    </div>
  );
};

export default AuthorItem;
