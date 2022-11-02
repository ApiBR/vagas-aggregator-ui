import { Fragment } from "react";

export const Item = () => {
    return (
          <div className="card border-default mb-3 col-lg-3">
            <div className="card-header">
              <img
                src="https://via.placeholder.com/50?text=%20"
                alt="placeholder"
                className="rounded-circle img-responsive"
                style={{ width: "48px" }}
              />
              <h5 className="card-title placeholder-glow">
                <span className="placeholder col-lg-6"></span>
              </h5>
            </div>
            <div className="card-body">
              <div className="media">
                <div className="media-body ml-3"></div>
                <img
                  src="https://via.placeholder.com/50?text=%20"
                  alt="placeholder"
                  className="media-object rounded-circle img-responsive"
                  style={{ width: "48px" }}
                />
                <br />
                <span className="placeholder col-4"></span>
              </div>
              <span className="badge badge-secondary pb-2 pt-2 mr-1"></span>
              <span className="badge badge-secondary pb-2 pt-2"></span>
              <div className="alert alert-warning mt-3 mb-3 placeholder"></div>
            </div>
            <div className="card-footer"></div>
          </div>
        );
}
export const Placeholder = ({ quantity }) => {
    const items = [];
    for(let i = 0; i < quantity; i++){
        items.push(<Item key={i}/>);
    }
    return <Fragment>{items}</Fragment>
};
