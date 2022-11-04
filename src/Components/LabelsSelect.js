import Select from "react-select";

export const LabelsSelect = ({ labels, updateParams }) => {
  const labelsItems = labels.map((item) => {
    return { value: item.name, label: item.name };
  });

  const onChange = (values) => {
    updateParams({ labels: values.map((value) => value.value).join(",")});
  }
  return (
    <Select
      options={labelsItems}
      isMulti={true}
      placeholder="Filtrar por labels"
      onChange={onChange}
    />
  );
};
