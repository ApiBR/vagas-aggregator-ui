import { Link } from "react-router-dom";
import FormatDate from "../../Helpers/FormatDate";
import LabelsList from "../Labels/LabelsList";
import LabelNoLinkItem from "../Labels/LabelNoLinkItem";
import classNames from "classnames";
import reactStringReplace from "react-string-replace";

const IssueItem = ({ issue }) => {
  const authorUrl = "/?authors=" + issue.user.login;
  const organizationUrl =
    "/?organizations=" + issue.repository.organization.login;
  const createdAt = new Date(issue.created_at);
  const updatedAt = new Date(issue.updated_at);
  const isNew = Math.round((new Date() - createdAt) / 8.64e7) <= 5;
  const isStale =
    issue.labels.filter((l) => l.name.toLowerCase() === "stale").length === 1;
  const organizationsAvatar =
    issue.repository.organization.avatar_url + "&size=48";
  const userAvatar = issue.user.avatar_url + "&size=48";

  const labelNew = { name: "NOVA", color: "#64B264" };
  const labelStale = { name: "SEM ATIVIDADE", color: "#FF3300" };

  const bgColorHighActivity = issue.comments > 5 ? "bg-success" : "bg-warning";
  const bgColorComments = issue.comments === 0 ? "bg-danger" : bgColorHighActivity;

  const title = reactStringReplace(issue.title, /[[(](.+?)[\])]/g, (match, _) => <span className="badge bg-info">{match}</span>);

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
        {isNew && <LabelNoLinkItem label={labelNew} />}
        {isStale && <LabelNoLinkItem label={labelStale} />}
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-12 mb-2">{title}</div>
          <div className="col-10">
            <div className="mr-3">
              <span className={classNames("badge mt-2 mb-2 pb-2 pt-2", bgColorComments)}>
                Comentários: {issue.comments}
              </span>
            </div>
        
            <div>
              <span className="badge bg-secondary mt-2 mb-2 pb-2 pt-2">
                Publicado em: {FormatDate(createdAt)}
              </span>
              <br />
              <span className="badge bg-secondary mt-2 mb-2 pb-2 pt-2">
                Atualizado em: {FormatDate(updatedAt)}
              </span>
            </div>
          </div>
          
          <div className="col-xs-12 col-sm-10 col-lg-12">
            <hr className="border-top mt-3 mb-3" />
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center">
              <div className="mb-sm-3 mb-lg-0 text-center">
                <a className="btn btn-warning" href={issue.url} target="_blank" rel="noopener noreferrer">
                  Ver vaga no GitHub <i className="fa fa-github" />
                </a>
              </div>

              <div className="mt-3 text-sm-center text-lg-right">
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
            </div>
            <hr className="border-top mt-3" />
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
