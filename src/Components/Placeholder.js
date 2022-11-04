import { Fragment } from "react";

export const Item = () => {
  return (
    <div className="card border-default placeholder-glow mb-3 col-lg-3">
      <div className="card-header">
        <img
          src="https://via.placeholder.com/48?text=%20"
          alt="placeholder"
          className="rounded-circle img-responsive"
          style={{ width: "48px", marginRight: "20px" }}
        />
        <span className="placeholder col-lg-6"></span>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-lg-10">
            <span className="placeholder col-lg-12"></span>
            <span className="placeholder col-lg-12"></span>
            <span className="placeholder col-lg-12"></span>
          </div>
          <div className="col-lg-2">
            <img
              src="https://via.placeholder.com/48?text=%20"
              alt="placeholder"
              className="rounded-circle img-responsive"
              style={{ width: "48px" }}
            />
          </div>
        </div>
        <span className="placeholder col-lg-6 pb-2 pt-2 mr-1"></span>
        <br />
        <span className="placeholder col-lg-6 pb-2 pt-2"></span>
        <div className="alert alert-warning mt-3 mb-3 placeholder col-lg-12"></div>
      </div>
      <div className="card-footer">
        <div className="row">
          <span className="badge mr-2 mb-2 col-lg-1" style={{border: "2px solid rgb(180, 252, 160)", color: "#FFF"}}>
              <span className="placeholder col-lg-1"></span>
          </span>
          <span className="badge mr-2 mb-2 col-lg-1" style={{border: "2px solid rgb(170, 100, 100)", color: "#FFF"}}>
              <span className="placeholder col-lg-12"></span>
          </span>
          <span className="badge mr-2 mb-2 col-lg-1" style={{border: "2px solid rgb(170, 100, 100)", color: "#FFF"}}>
              <span className="placeholder col-lg-12"></span>
          </span>
          <span className="badge mr-2 mb-2 col-lg-1" style={{border: "2px solid rgb(100, 155, 100)", color: "#FFF"}}>
              <span className="placeholder col-lg-12"></span>
          </span>
          <span className="badge mr-2 mb-2 col-lg-1" style={{border: "2px solid rgb(205, 234, 220)", color: "#FFF"}}>
              <span className="placeholder col-lg-12"></span>
          </span>
          <span className="badge mr-2 mb-2 col-lg-1" style={{border: "2px solid rgb(8, 127, 91)", color: "#FFF"}}>
              <span className="placeholder col-lg-12"></span>
          </span>
          <span className="badge mr-2 mb-2 col-lg-1" style={{border: "2px solid rgb(252, 156, 4)", color: "#FFF"}}>
              <span className="placeholder col-lg-12"></span>
          </span>
          <span className="badge mr-2 mb-2 col-lg-1" style={{border: "2px solid rgb(173, 121, 233)", color: "#FFF"}}>
              <span className="placeholder col-lg-12"></span>
          </span>
          <span className="badge mr-2 mb-2 col-lg-1" style={{border: "2px solid rgb(15, 144, 220)", color: "#FFF"}}>
              <span className="placeholder col-lg-12"></span>
          </span>
        </div>
      </div>
    </div>
  );
};
export const Placeholder = ({ quantity }) => {
  const items = [];
  for (let i = 0; i < quantity; i++) {
    items.push(<Item key={i} />);
  }
  return <Fragment>{items}</Fragment>;
};
