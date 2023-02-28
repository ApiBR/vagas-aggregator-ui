const LabelOption = (option) => {
    return (
      <div>
        <img
          src={option.image}
          alt={option.label}
          style={{ width: "24px" }}
          loading="lazy"
        />{" "}
        {option.label}
      </div>
    );
  };

  export default LabelOption;