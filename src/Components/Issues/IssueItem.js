import React from 'react';
import { Link } from "react-router-dom";
import FormatDate from "../../Helpers/FormatDate";
import LabelsList from "../Labels/LabelsList";
import LabelNoLinkItem from "../Labels/LabelNoLinkItem";
import classNames from "classnames";
import reactStringReplace from "react-string-replace";

/**
     * A functional component that displays information about a specific issue.
     *
     * @component
     * @param {Object} props - The properties passed to the component.
     * @param {Object} props.issue - The issue object containing details about the issue.
     * @param {string} props.issue.user.login - The login name of the issue's author.
     * @param {string} props.issue.user.name - The name of the issue's author (optional).
     * @param {string} props.issue.user.avatar_url - The URL of the author's avatar.
     * @param {Object} props.issue.repository - The repository where the issue is located.
     * @param {string} props.issue.repository.organization.login - The login name of the organization.
     * @param {string} props.issue.repository.organization.avatar_url - The URL of the organization's avatar.
     * @param {string} props.issue.title - The title of the issue.
     * @param {string} props.issue.created_at - The creation date of the issue in ISO format.
     * @param {string} props.issue.updated_at - The last updated date of the issue in ISO format.
     * @param {number} props.issue.comments - The number of comments on the issue.
     * @param {Array<Object>} props.issue.labels - An array of labels associated with the issue.
     * @param {string} props.issue.url - The URL to view the issue on GitHub.
     *
     * @returns {JSX.Element} A card component displaying the issue details, including author and organization information,
     *                        creation and update dates, comment count, and labels.
     *
     * @example
     * const issue = {
     *   user: { login: 'johnDoe', name: 'John Doe', avatar_url: 'http://example.com/avatar.jpg' },
     *   repository: {
     *     organization: { login: 'exampleOrg', avatar_url: 'http://example.com/org-avatar.jpg' },
     *     name: 'exampleRepo'
     *   },
     *   title: 'Issue Title',
     *   created_at: '2023-01-01T00:00:00Z',
     *   updated_at: '2023-01-02T00:00:00Z',
     *   comments: 10,
     *   labels: [{ name: 'bug' }],
     *   url: 'http://github.com/exampleOrg/exampleRepo/issues/1'
     * };
     *
     * <IssueItem issue={issue} />
     */
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

  const staleClass = isStale ? "stale" : "";
 
  const title = reactStringReplace(issue.title, /[[(](.+?)[\])]/g, (match, _) => <span className="badge bg-info">{match}</span>);

  return (
    <div className={classNames("card border-default mb-3 col-lg-3", staleClass)}>
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
                <i className="fa fa-comments" /> Comentários: {issue.comments}
              </span>
            </div>
        
            <div>
              <span className="badge bg-secondary mt-2 mb-2 pb-2 pt-2">
                <i className="fa fa-clock-o" /> Publicado em: {FormatDate(createdAt)}
              </span>
              <br />
              <span className="badge bg-secondary mt-2 mb-2 pb-2 pt-2">
                <i className="fa fa-clock-o" /> Atualizado em: {FormatDate(updatedAt)}
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
