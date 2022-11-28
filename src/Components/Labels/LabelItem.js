import { Link } from "react-router-dom";

const LabelItem = ({ label }) => {
  const url = "/?labels=" + label.name;
  return (
    <>
      <Link to={url}>
        <span
          className="badge mr-2 mb-2"
          style={{
            textTransform: "capitalize",
            border: "2px solid #" + label.color,
            color: "#FFF",
          }}
        >
          {label.name}
        </span>
      </Link>{" "}
    </>
  );
};

export default LabelItem;
