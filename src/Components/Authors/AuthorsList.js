import { useSearchParams } from "react-router-dom";
import classNames from "classnames";
import useLoadAll from "../../Hooks/useLoadAll";
import PlaceholderList from "../Placeholder/PlaceholderList";
import AuthorItem from "./AuthorItem";
import UpdateBadge from "../Layout/UpdateBadge";

const AuthorsList = () => {
  const [searchParams] = useSearchParams();
  const paramsPreset = { per_page: 100 };
  if (searchParams.get("organizations")) {
    paramsPreset.organizations = searchParams.get("organizations");
  }
  const [authors, allAuthorsLoaded, lastModified, totalPages] = useLoadAll(
    "authors",
    paramsPreset
  );

  const percentage = (authors.length / totalPages) * 100;
  return (
    <div className="row mt-2 ml-1 mr-1">
      <div className="justify-content-center">
        <div className="alert alert-secondary text-center col-xs-12 col-lg-6 offset-lg-3">
          Recrutadores:{" "}
          <span
            className={classNames("badge roudend-pill", {
              "bg-danger": authors.length === 0,
              "bg-warning": !allAuthorsLoaded,
              "bg-success": allAuthorsLoaded && authors.length > 0,
            })}
          >
            {allAuthorsLoaded
              ? authors.length
              : "Carregando página " + authors.length + "..."}
          </span>
          <br />
          {!allAuthorsLoaded && (
            <>
              <br />
              <div className="progress">
                <div
                  className="progress-bar bg-success progress-bar-striped progress-bar-animated"
                  role="progressbar"
                  style={{ width: percentage + "%" }}
                  aria-valuenow={percentage}
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </>
          )}
          {allAuthorsLoaded && <UpdateBadge date={lastModified} />}
        </div>
        {paramsPreset.organizations && (
          <>
            <a href="recrutadores" className="btn btn-outline-success mb-3">
              <i className="fa fa-users"></i> Ver todos os recrutadores
            </a>
          </>
        )}
      </div>
      {!allAuthorsLoaded && <PlaceholderList type="author" quantity={100} />}
      {allAuthorsLoaded &&
        authors.map((author) => {
          return <AuthorItem author={author} key={author.id} />;
        })}
    </div>
  );
};

export default AuthorsList;
