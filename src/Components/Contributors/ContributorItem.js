const ContributorItem = ({ contributor, showName = false }) => {
  const name = showName ? <span>{contributor.login}</span> : "";
  const contributorAvatar = contributor.avatar_url + "&size=48";
  return (
    <div className="mb-3 mt-3 col-1">
      <a
        href={contributor.url}
        target="_blank"
        title={contributor.login}
        rel="noopener noreferrer"
      >
        <img
          src={contributorAvatar}
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
