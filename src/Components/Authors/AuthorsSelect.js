import { useEffect, useMemo, useRef, useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import useLoadAll from "../../Hooks/useLoadAll";

const AuthorsSelect = ({ filter, updateParams }) => {
  const animatedComponents = makeAnimated();
  const selectRef = useRef(null);
  const [selected, setSelected] = useState(false);

  const [authors] = useLoadAll("authors", {
    per_page: 100,
  });

  const authorsItems = authors.map((item) => {
    return {
      value: item.login,
      label: item.name !== undefined && item.name !== null ? item.name : item.login,
      image: item.avatar_url,
    };
  });

  const defaultValues = useMemo(
    () =>
      filter
        ? authorsItems.filter(
            (item) => item.value && filter.split(",").includes(item.value)
          )
        : [],
    [filter, authorsItems]
  );

  const onChange = (values) => {
    const selectedValues = values.map((value) => value.value).join(",");
    if (filter === undefined || filter !== selectedValues) {
      updateParams({ authors: selectedValues });
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
      options={authorsItems}
      isMulti={true}
      placeholder="Filtrar por recrutadores"
      onChange={onChange}
      getOptionLabel={(option) => (
        <div>
          <img
            src={option.image}
            alt={option.label}
            style={{ width: "24px" }}
          />{" "}
          {option.label}
        </div>
      )}
    />
  );
};

export default AuthorsSelect;
