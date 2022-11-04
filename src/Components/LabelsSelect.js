import Select from "react-select";
import makeAnimated from "react-select/animated";

const LabelsSelect = ({ labels, updateParams }) => {
  const labelsItems = labels.map((item) => {
    return { value: item.name, label: item.name };
  });

  const animatedComponents = makeAnimated();

  const onChange = (values) => {
    updateParams({ labels: values.map((value) => value.value).join(",") });
  };
  return (
    <Select
      components={animatedComponents}
      options={labelsItems}
      isMulti={true}
      placeholder="Filtrar por labels"
      onChange={onChange}
    />
  );
};

export default LabelsSelect;
