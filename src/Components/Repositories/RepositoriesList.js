import PlaceholderList from "../Placeholder/PlaceholderList";
import useLoadAll from "../../Hooks/useLoadAll";
import { FormatDate } from "../../Helpers/FormatDate";
import classNames from "classnames";
import RepositoryItem from "./RepositoryItem";

const Repositories = () => {
  const [repositories, allRepositoriesLoaded, lastModified] = useLoadAll(
    "repositories",
    { per_page: 100 }
  );

  return (
    <div className="row mt-2 ml-1 mr-1">
      <div className="justify-content-center">
        <div className="alert alert-secondary text-center col-xs-12 col-lg-6 offset-lg-3">
          Repositórios:{" "}
          <span
            className={classNames("badge roudend-pill", {
              "bg-danger": repositories.length === 0,
              "bg-warning": !allRepositoriesLoaded,
              "bg-success": repositories.length > 0,
            })}
          >
            {allRepositoriesLoaded
              ? repositories.length
              : "Carregando página " + repositories.length + "..."}
          </span>
          <br />
          {!allRepositoriesLoaded && (
            <>
              <br />
              <div className="progress">
                <div
                  className="progress-bar bg-success progress-bar-striped progress-bar-animated"
                  role="progressbar"
                  style={{ width: "50%" }}
                  aria-valuenow="50"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </>
          )}
          {allRepositoriesLoaded && (
            <span className="badge bg-info">
              Atualizado em: {FormatDate(new Date(lastModified))}
            </span>
          )}
        </div>
      </div>
      {!allRepositoriesLoaded && (
        <PlaceholderList type="repository" quantity={100} />
      )}
      {allRepositoriesLoaded &&
        repositories.map((repository) => {
          return <RepositoryItem repository={repository} key={repository.id} />;
        })}
    </div>
  );
};

export default Repositories;
