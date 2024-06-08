import PlaceholderList from "../Placeholder/PlaceholderList";
import useLoadAll from "../../Hooks/useLoadAll";
import classNames from "classnames";
import RepositoryItem from "./RepositoryItem";
import { ProgressBar, UpdateBadge } from "../Layout";

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
              <ProgressBar />
            </>
          )}
          {allRepositoriesLoaded && <UpdateBadge date={lastModified} />}
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
