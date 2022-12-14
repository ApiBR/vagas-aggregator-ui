const ContributorItem = ({ contributor, showName = false }) => {
  const name = showName ? <span>{contributor.login}</span> : "";
  return (
    <div className="mb-3 mt-3 col-1">
      <a
        href={contributor.url}
        target="_blank"
        title={contributor.login}
        rel="noopener noreferrer"
      >
        <img
          src={contributor.avatar_url}
          alt={contributor.login}
          className="rounded-circle img-responsive"
          style={{ width: "48px" }}
          loading="lazy"
        />
        {name}
      </a>
    </div>
  );
};

export default ContributorItem;
