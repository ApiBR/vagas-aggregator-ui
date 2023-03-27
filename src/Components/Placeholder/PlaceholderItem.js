const PlaceholderSingleItem = ({ color }) => {
  return (
    <span
      className="badge mr-2 mb-2 col-1"
      style={{ border: `2px solid ${color}`, color: "#FFF" }}
    >
      <span className="placeholder col-12"></span>
    </span>
  );
};
const PlaceholderItem = () => {
  return (
    <div className="card border-default placeholder-glow mb-3 col-xs-12 col-lg-3">
      <div className="card-header">
        <img
          src="https://via.placeholder.com/48?text=%20"
          alt="placeholder"
          className="rounded-circle img-responsive"
          style={{ width: "48px", height: "48px", marginRight: "20px" }}
          loading="lazy"
        />
        <span className="placeholder col-6"></span>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-10">
            <span className="placeholder col-12"></span>
            <span className="placeholder col-12"></span>
            <span className="placeholder col-12"></span>
          </div>
          <div className="col-2">
            <img
              src="https://via.placeholder.com/48?text=%20"
              alt="placeholder"
              className="rounded-circle img-responsive"
              style={{ width: "48px", height: "48px" }}
              loading="lazy"
            />
          </div>
        </div>
        <span className="placeholder col-6 pb-2 pt-2 mr-1"></span>
        <br />
        <span className="placeholder col-6 pb-2 pt-2"></span>
        <div className="alert alert-warning mt-3 mb-3 placeholder col-12"></div>
      </div>
      <div className="card-footer">
        <div className="row">
          <PlaceholderSingleItem color="rgb(180, 252, 160)" />
          <PlaceholderSingleItem color="rgb(170, 100, 100)" />
          <PlaceholderSingleItem color="rgb(100, 155, 100)" />
          <PlaceholderSingleItem color="rgb(205, 234, 220)" />
          <PlaceholderSingleItem color="rgb(8, 127, 91)" />
          <PlaceholderSingleItem color="rgb(252, 156, 4)" />
          <PlaceholderSingleItem color="rgb(173, 121, 233)" />
          <PlaceholderSingleItem color="rgb(15, 144, 220)" />
        </div>
      </div>
    </div>
  );
};

export default PlaceholderItem;
