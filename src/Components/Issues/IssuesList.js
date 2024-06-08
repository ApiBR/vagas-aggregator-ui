import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import toastr from "toastr";
import useFetch from "../../Hooks/useFetch";
import GetParams from "../../Helpers/GetParams";
import { Controls, Pagination, ProgressBar} from "../Layout";
import PlaceholderList from "../Placeholder/PlaceholderList";
import classNames from "classnames";
import IssueItem from "./IssueItem";
import UpdateBadge from "../Layout/UpdateBadge";

const IssuesList = () => {
  const [searchParams] = useSearchParams();
  const pagePreset = !isNaN(parseInt(searchParams.get("page")))
    ? parseInt(searchParams.get("page"))
    : 1;
  const paramsPreset = GetParams(searchParams);
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
    const paramsPreset = GetParams(searchParams);
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
    <IssueItem issue={issue} key={issue.id} />
  ));

  return (
    <div className="row mt-4">
      <div className="col-12">
        <Controls params={params} updateParams={updateParams} />
      </div>
      <div className="col-10 offset-1">
        <Pagination
          onPageChange={changePageNumber}
          totalPagesCount={totalPages}
          siblingCount={3}
          currentPage={page}
        />
      </div>
      <div className="justify-content-center">
        <div className="alert alert-secondary text-center col-xs-12 col-lg-6 offset-lg-3">
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
          {state.loading && (<ProgressBar />)}
          {!state.loading && state.lastModified && (
            <UpdateBadge
              date={state.lastModified}
              recentIssues={state.recentIssues}
              mostRecentIssue={state.mostRecentIssue}
            />
          )}
        </div>
      </div>
      {state.loading && (
        <PlaceholderList type="issue" quantity={params.per_page} />
      )}
      {!state.loading && issuesItems}
      <div className="col-10 offset-1">
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

export default IssuesList;
