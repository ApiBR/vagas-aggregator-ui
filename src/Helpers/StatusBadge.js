import classNames from "classnames";
import { ProgressBar, UpdateBadge } from "../Components/Layout";
const StatusBadge = ({ itemsLength, allItemsLoaded, lastModified, itemType }) => (
  <div className="alert alert-secondary text-center col-xs-12 col-lg-6 offset-lg-3">
    {itemType}:{' '}
    <span
      className={classNames("badge rounded-pill", {
        "bg-danger": itemsLength === 0,
        "bg-warning": !allItemsLoaded,
        "bg-success": itemsLength > 0,
      })}
    >
      {allItemsLoaded ? itemsLength : `Carregando página ${itemsLength}...`}
    </span> 
    <br /> {!allItemsLoaded && <><br/><ProgressBar /></>} {allItemsLoaded && <UpdateBadge date={lastModified} />}
  </div>
);
export default StatusBadge;