import { useEffect, useMemo, useRef, useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import useLoadAll from "../../Hooks/useLoadAll";

const LabelsSelect = ({ filter, updateParams }) => {
  const animatedComponents = makeAnimated();
  const selectRef = useRef(null);
  const [selected, setSelected] = useState(false);

  const [labels] = useLoadAll("labels", {
    per_page: 100,
  });

  const labelsItems = labels.map((item) => {
    return { value: item.name, label: item.name };
  });

  const defaultValues = useMemo(
    () =>
      filter
        ? labelsItems.filter(
            (item) =>
              item.value &&
              filter.toLowerCase().split(",").includes(item.value.toLowerCase())
          )
        : [],
    [filter, labelsItems]
  );

  const onChange = (values) => {
    const selectedValues = values.map((value) => value.value).join(",");
    if (filter === undefined || filter !== selectedValues) {
      updateParams({ labels: selectedValues });
    }
  };

  useEffect(() => {
    if (defaultValues[0] && !selected) {
      selectRef.current?.setValue(defaultValues);
      setSelected(true);
    }
  }, [defaultValues, selected]);

  return (
    <Select
      ref={selectRef}
      styles={{ menu: (provided) => ({ ...provided, zIndex: 9999 }) }}
      components={animatedComponents}
      options={labelsItems}
      isMulti
      placeholder="Filtrar por labels"
      onChange={onChange}
    />
  );
};

export default LabelsSelect;
