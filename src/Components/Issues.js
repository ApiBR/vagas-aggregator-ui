import { useState, useRef, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import toastr from "toastr";
import useFetch from "../Hooks/useFetch";
import { FormatDate } from "../Helpers/FormatDate";
import { Labels } from "./Labels";
import { Pagination } from "./Pagination";
import { Controls } from "./Controls";
import { Placeholder } from "./Placeholder";
import classNames from "classnames";

export const Issue = ({ issue }) => {
  const authorUrl = "/?authors=" + issue.user.login;
  const organizationUrl =
    "/?organizations=" + issue.repository.organization.login;
  const createdAt = new Date(issue.created_at);
  const updatedAt = new Date(issue.updated_at);
  return (
    <div className="card border-default mb-3 col-lg-3">
      <div className="card-header">
        <Link to={organizationUrl}>
          <img
            src={issue.repository.organization.avatar_url}
            alt={issue.repository.organization.login}
            className="rounded-circle img-responsive"
            style={{ width: "48px" }}
          />
          &nbsp;{issue.repository.organization.login}/{issue.repository.name}
        </Link>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-lg-12">{issue.title}</div>
          <div className="col-lg-10">
            <span className="badge bg-secondary mt-2 mb-2 pb-2 pt-2">
              Publicado em: {FormatDate(createdAt)}
            </span>
            <span className="badge bg-secondary mt-2 mb-2 pb-2 pt-2">
              Atualizado em: {FormatDate(updatedAt)}
            </span>
          </div>
          <div className="col-lg-2">
            <Link to={authorUrl} className="pull-right text-center">
              <img
                src={issue.user.avatar_url}
                alt={issue.user.login}
                className="rounded-circle img-responsive"
                style={{ width: "48px" }}
              />
              <br />
              <span className="small ellipsis">{issue.user.login}</span>
            </Link>
          </div>
          <div className="col-lg-12">
            <div className="alert alert-warning mt-3 mb-3">
              <a href={issue.url} target="_blank" rel="noopener noreferrer">
                Ver vaga no GitHub <i className="fa fa-github" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="card-footer">
        <Labels labels={issue.labels} issueId={issue.id} />
      </div>
    </div>
  );
};

export const getParams = (searchParams) => {
  const paramsPreset = {};

  if (searchParams.get("per_page")) {
    paramsPreset.per_page = parseInt(searchParams.get("per_page"));
  } else {
    paramsPreset.per_page = 100;
  }

  if (searchParams.get("authors")) {
    paramsPreset.authors = searchParams.get("authors");
  }

  if (searchParams.get("labels")) {
    paramsPreset.labels = searchParams.get("labels");
  }

  if (searchParams.get("organizations")) {
    paramsPreset.organizations = searchParams.get("organizations");
  }

  return paramsPreset;
};

export const Issues = () => {
  const [searchParams] = useSearchParams();
  const pagePreset = !isNaN(parseInt(searchParams.get("page")))
    ? parseInt(searchParams.get("page"))
    : 1;
  const paramsPreset = getParams(searchParams);
  const entityRef = useRef("issues");
  const [items, setItems] = useState([]);
  const [totalIssues, setTotalIssues] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [params, setParams] = useState(paramsPreset);
  const [page, setPage] = useState(pagePreset > 0 ? pagePreset : 1);
  const [loaded, setLoaded] = useState(false);
  const [state, loadPage] = useFetch(entityRef.current, params, page);
  const changePageNumber = (pageNumber) => {
    if (pageNumber === page) {
      return;
    }
    setPage(pageNumber);
    setLoaded(false);
  };

  const updateParams = (data) => {
    setParams({ ...params, ...data });
    setPage(1);
    setLoaded(false);
  };

  useEffect(() => {
    const paramsPreset = getParams(searchParams);
    setParams(paramsPreset);
    setPage(1);
    setLoaded(false);
  }, [searchParams]);

  useEffect(() => {
    if (state.error) {
      toastr["error"]("issues: " + state.error.message, { closeButton: true });
    }

    if (state.loading) {
      return;
    }

    setItems(state.items);
    setTotalIssues(state.itemCount);
    setTotalPages(state.pageCount);

    if (!loaded) {
      setLoaded(true);
      loadPage();
    }
  }, [page, state, loadPage, loaded]);

  if (typeof items !== "object") {
    toastr["error"]("Resposta inválida da API", { closeButton: true });
    return;
  }
  const issuesItems = items.map((issue) => (
    <Issue issue={issue} key={issue.id} />
  ));

  return (
    <div className="row mt-4">
      <div className="col-lg-12">
        <Controls params={params} updateParams={updateParams} />
      </div>
      <div className="col-lg-12">
        <Pagination
          onPageChange={changePageNumber}
          totalPagesCount={totalPages}
          siblingCount={3}
          currentPage={page}
        />
      </div>
      <div className="justify-content-center">
        <div className="alert alert-secondary text-center col-xs-6 col-lg-6 offset-lg-3">
          Vagas:{" "}
          <span
            className={classNames("badge rounded-pill", {
              "bg-danger": totalIssues === 0,
              "bg-warning": state.loading,
              "bg-success": !state.loading && totalIssues > 0,
            })}
          >
            {state.loading ? "Carregando..." : totalIssues}
          </span>
          <br />
          {state.loading && (
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
          {!state.loading && state.lastModified && (
            <span className="badge bg-info">
              Atualizado em: {FormatDate(new Date(state.lastModified))}
            </span>
          )}
        </div>
      </div>
      {state.loading && <Placeholder quantity={params.per_page} />}
      {!state.loading && issuesItems}
      <div className="col-lg-12">
        <Pagination
          onPageChange={changePageNumber}
          totalPagesCount={totalPages}
          siblingCount={3}
          currentPage={page}
        />
      </div>
    </div>
  );
};
