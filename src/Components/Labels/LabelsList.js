import LabelItem from "./LabelItem";

const LabelsList = ({ labels, issueId }) => {
  const labelsItems = labels.map((label) => {
    const key = issueId + "-" + label.name;
    return <LabelItem label={label} key={key} />;
  });
  return <div>{labelsItems}</div>;
};

export default LabelsList;