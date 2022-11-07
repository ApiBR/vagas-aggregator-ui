import Select from "react-select";
import makeAnimated from "react-select/animated";

const AuthorsSelect = ({ authors, updateParams }) => {
  const authorsItems = authors.map((item) => {
    return {
      value: item.login,
      label: item.login,
      image: item.avatar_url,
    };
  });

  const animatedComponents = makeAnimated();

  const onChange = (values) => {
    updateParams({
      authors: values.map((value) => value.value).join(","),
    });
  };
  return (
    <Select
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
