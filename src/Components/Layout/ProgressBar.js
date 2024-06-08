const ProgressBar = (option) => {
    return (
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
    );
  };

  export default ProgressBar;
