import { useState, useRef, useEffect } from "react";
import useFetch from "../Hooks/useFetch";
import useLoadAll from "../Hooks/useLoadAll";
import { FormatDate } from "../Helpers/FormatDate";
import { Labels } from "./Labels";
import { Pagination } from "./Pagination";
import { Controls } from "./Controls";
import { Placeholder } from "./Placeholder";

export const Issue = ({ issue }) => {
  const githubUrl = "https://github.com/";
  const userUrl = githubUrl + issue.user.login;
  const url = "?organizations=" + issue.repository.organization.login;
  const createdAt = new Date(issue.created_at);
  const updatedAt = new Date(issue.updated_at);
  return (
    <div className="card border-default mb-3 col-lg-3">
      <div className="card-header">
        <a href={url}>
          <img
            src={issue.repository.organization.avatar_url}
            alt={issue.repository.organization.login}
            className="rounded-circle img-responsive"
            style={{ width: "48px" }}
          />
          &nbsp;{issue.repository.organization.login}/{issue.repository.name}
        </a>
      </div>
      <div className="card-body">
        <div className="media">
          <div className="media-body ml-3">{issue.title}</div>
          <a
            className="pull-right text-center"
            href={userUrl}
            target="_blank"
            title={issue.user.login}
            rel="noopener noreferrer"
          >
            <img
              src={issue.user.avatar_url}
              alt={issue.user.login}
              className="media-object rounded-circle img-responsive"
              style={{ width: "48px" }}
            />
            <br />
            <span>{issue.user.login}</span>
          </a>
        </div>
        <span className="badge badge-secondary pb-2 pt-2 mr-1">
          Publicado em: {FormatDate(createdAt)}
        </span>
        <span className="badge badge-secondary pb-2 pt-2">
          Atualizado em: {FormatDate(updatedAt)}
        </span>
        <div className="alert alert-warning mt-3 mb-3">
          <a href={issue.url} target="_blank" rel="noopener noreferrer">
            Ver vaga no GitHub <i className="fa fa-github" />
          </a>
        </div>
      </div>
      <div className="card-footer">
        <Labels labels={issue.labels} issueId={issue.id} />
      </div>
    </div>
  );
};

export const Issues = () => {
  const entityRef = useRef("issues");
  const [items, setItems] = useState([]);
  const [totalIssues, setTotalIssues] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [params, setParams] = useState({ per_page: 100 });
  const [page, setPage] = useState(1);
  const [loaded, setLoaded] = useState(false);
  const [state, loadPage] = useFetch(entityRef.current, params, page);

  const labels = useLoadAll("labels", { per_page: 100 });

  useEffect(() => {
    if (state.loading) return;
    if (state.items.length > 0) {
      setItems(state.items);
    }
    if (state.itemCount > 0) {
      setTotalIssues(state.itemCount);
    }
    if(state.pageCount > 0)
    {
        setTotalPages(state.pageCount);
    }
    if(!loaded){
        setLoaded(true);
        loadPage();
    }

  }, [page, state, loadPage, loaded]);
  
  const changePageNumber = (pageNumber) => {
    setPage(pageNumber);
    setLoaded(false);
  }

  const updateParams = (data) => {
    setParams({...params, ...data});
    setPage(1);
    setLoaded(false);
  }

  const issuesItems = items.map((issue) => {
    return <Issue issue={issue} key={issue.id} />;
  });
  return (
    <div className="row mt-2 ml-1 mr-1">
      <div className="alert alert-secondary col-lg-12 text-center">
        Vagas: {totalIssues}
      </div>      
      <div className="col-lg-12">
        <Controls params={params} labels={labels} updateParams={updateParams} />
      </div>
      <div className="col-lg-12">
        <Pagination
          onPageChange={changePageNumber}
          totalPagesCount={totalPages}
          siblingCount={3}
          currentPage={page}
        />
      </div>
      {state.loading && <Placeholder quantity={params.per_page}/>}
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