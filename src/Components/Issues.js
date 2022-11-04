import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import useFetch from "../Hooks/useFetch";
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
        <Link to={url}>
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
                className="rounded-circle img-responsive"
                style={{ width: "48px" }}
              />
              <br />
              <span className="small ellipsis">{issue.user.login}</span>
            </a>
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

export const Issues = () => {
  const urlParams = new URLSearchParams(window.location.search);

  const pagePreset = !isNaN(parseInt(urlParams.get("page"))) ? parseInt(urlParams.get("page")) : 1;

  const paramsPreset = { };

  if(urlParams.get("labels")){
    paramsPreset.labels = urlParams.get("labels");
  }

  if(urlParams.get("organizations")){
    paramsPreset.organizations = urlParams.get("organizations");
  }
    
  const entityRef = useRef("issues");
  const [items, setItems] = useState([]);
  const [totalIssues, setTotalIssues] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [params, setParams] = useState({ per_page: 100, ...paramsPreset });
  const [page, setPage] = useState(pagePreset > 0 ? pagePreset : 1);
  const [loaded, setLoaded] = useState(false);
  const [state, loadPage] = useFetch(entityRef.current, params, page);

  useEffect(() => {
    if (state.loading) {
      return;
    }
    if (state.items.length > 0) {
      setItems(state.items);
    }
    if (state.itemCount > 0) {
      setTotalIssues(state.itemCount);
    }
    if(state.pageCount > 0) {
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
    changePageNumber(1);
  }

  const issuesItems = items.map((issue) => <Issue issue={issue} key={issue.id} />);

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
      <div className="col-lg-12" style={{justifyContent : "center", display: "flex"}}>
        <div className="alert alert-secondary text-center" style={{ width: "30%"}}>
          Vagas: {totalIssues}
        </div>
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