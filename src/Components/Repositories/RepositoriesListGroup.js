import { Link } from "react-router-dom";
import React from "react";
const RepositoriesListGroup = ({ repositories, authorLogin }) => {
  const repositoriesItems = repositories.map((repository) => {
    const key = authorLogin + "-" + repository.id;
    const url =
      "/?organizations=" +
      repository.organization.login +
      "&authors=" +
      authorLogin;
    const organizationAvatar = repository.organization.avatar_url + "&size=36";
    return (
      <span className="badge badge-secondary d-flex align-items-center" key={key}>
        <Link to={url} title={repository.organization.login}>
          <img
            src={organizationAvatar}
            alt={repository.organization.login}
            className="rounded-circle img-responsive"
            style={{ width: "36px", height: "36px" }}
            loading="lazy"
          />
        </Link>{"\u00A0"}
        <Link to={url} title={repository.organization.long}>
          {repository.organization.login}/{repository.name}
        </Link>
      </span>
    );
  });
  return <div className="mt-3">{repositoriesItems}</div>;
};

export default RepositoriesListGroup;
