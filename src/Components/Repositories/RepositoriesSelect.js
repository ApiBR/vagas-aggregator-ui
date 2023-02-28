import { useEffect, useMemo, useRef, useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import useLoadAll from "../../Hooks/useLoadAll";

const RepositoriesSelect = ({ filter, updateParams }) => {
  const animatedComponents = makeAnimated();
  const selectRef = useRef(null);
  const [selected, setSelected] = useState(false);
  const [repositories] = useLoadAll("repositories", {
    per_page: 100,
  });

  const repositoriesItems = repositories.map((item) => {
    return {
      value: item.organization.login,
      label: item.organization.login + "/" + item.name,
      image: item.organization.avatar_url + "&size=24",
    };
  });

  const defaultValues = useMemo(
    () =>
      filter
        ? repositoriesItems.filter(
            (item) => item.value && filter.split(",").includes(item.value)
          )
        : [],
    [filter, repositoriesItems]
  );

  const onChange = (values) => {
    const selectedValues = values.map((value) => value.value).join(",");
    if (filter === undefined || filter !== selectedValues) {
      updateParams({ organizations: selectedValues });
    }
  };

  useEffect(() => {
    if (defaultValues[0] && !selected) {
      selectRef.current?.setValue(defaultValues);
      setSelected(true);
    }
  }, [defaultValues, selected]);

  function labelOption(option) {
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
  }

  return (
    <Select
      ref={selectRef}
      styles={{ menu: (provided) => ({ ...provided, zIndex: 9999 }) }}
      components={animatedComponents}
      options={repositoriesItems}
      isMulti={true}
      placeholder="Filtrar por repositórios"
      onChange={onChange}
      getOptionLabel={labelOption}
    />
  );
};

export default RepositoriesSelect;
