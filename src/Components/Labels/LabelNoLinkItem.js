const LabelNoLinkItem = ({ label }) => {

  return (
    <>
      <span
        className="badge mr-2 mb-2"
        style={{
          textTransform: "capitalize",
          background: label.color,
          color: "#FFF",
        }}
      >
        {label.name}
      </span>{" "}
    </>
  );
};

export default LabelNoLinkItem;
