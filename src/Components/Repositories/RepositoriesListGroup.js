import { Link } from "react-router-dom";

const RepositoriesListGroup = ({ repositories, authorLogin }) => {
  const repositoriesItems = repositories.map((repository) => {
    const key = authorLogin + "-" + repository.id;
    const url =
      "/?organizations=" +
      repository.organization.login +
      "&authors=" +
      authorLogin;
    return (
      <span className="badge badge-secondary d-flex" key={key}>
        <Link to={url} title={repository.organization.login}>
          <img
            src={repository.organization.avatar_url}
            alt={repository.organization.login}
            className="rounded-circle img-responsive"
            style={{ width: "36px" }}
            loading="lazy"
          />
        </Link>{" "}
        <Link to={url} title={repository.organization.long}>
          {repository.organization.login}/{repository.name}
        </Link>
      </span>
    );
  });
  return <div className="mt-3">{repositoriesItems}</div>;
};

export default RepositoriesListGroup;
