import { Link } from "react-router-dom";
import FormatDate from "../../Helpers/FormatDate";
import LabelsList from "../Labels/LabelsList";

const IssueItem = ({ issue }) => {
  const authorUrl = "/?authors=" + issue.user.login;
  const organizationUrl = "/?organizations=" + issue.repository.organization.login;
  const createdAt = new Date(issue.created_at);
  const updatedAt = new Date(issue.updated_at);
  const isNew = Math.round((new Date() - createdAt) / 8.64e7) <= 5;
  const organizationsAvatar = issue.repository.organization.avatar_url + "&size=48";
  const userAvatar = issue.user.avatar_url + "&size=48";
  return (
    <div className="card border-default mb-3 col-lg-3">
      <div className="card-header">
        <Link to={organizationUrl}>
          <img
            src={organizationsAvatar}
            alt={issue.repository.organization.login}
            className="rounded-circle img-responsive"
            style={{ width: "48px", height: "48px" }}
            loading="lazy"
          />
        </Link>{" "}
        <Link to={organizationUrl}>
          {issue.repository.organization.login}/{issue.repository.name}
        </Link>{" "}
        {isNew && (
          <span
            className="badge mr-2 mb-2"
            style={{
              textTransform: "capitalize",
              border: "2px solid #64B264",
              color: "#FFF",
            }}
          >
            NOVA
          </span>
        )}
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-12 mb-2">{issue.title}</div>
          <div className="col-10">
            <span className="badge bg-secondary mt-2 mb-2 pb-2 pt-2">
              Publicado em: {FormatDate(createdAt)}
            </span>
            <span className="badge bg-secondary mt-2 mb-2 pb-2 pt-2">
              Atualizado em: {FormatDate(updatedAt)}
            </span>
          </div>
          <div className="col-2">
            <Link
              to={authorUrl}
              className="pull-right text-center"
              title={issue.user.login}
            >
              <img
                src={userAvatar}
                alt={issue.user.login}
                className="rounded-circle img-responsive"
                style={{ width: "48px", height: "48px" }}
                loading="lazy"
              />
              <br />
              <span className="small ellipsis">
                {issue.user.name !== undefined && issue.user.name !== null
                  ? issue.user.name
                  : issue.user.login}
              </span>
            </Link>
          </div>
          <div className="col-xs-12 col-lg-6 offset-lg-3">
            <div className="alert alert-warning mt-3 mb-3">
              <a href={issue.url} target="_blank" rel="noopener noreferrer">
                Ver vaga no GitHub <i className="fa fa-github" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="card-footer">
        <LabelsList labels={issue.labels} issueId={issue.id} />
      </div>
    </div>
  );
};

export default IssueItem;
