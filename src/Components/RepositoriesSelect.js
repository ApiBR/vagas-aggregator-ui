import Select from "react-select";
import makeAnimated from "react-select/animated";

const RepositoriesSelect = ({ repositories, updateParams }) => {
  const repositoriesItems = repositories.map((item) => {
    return { value: item.organization.login, label: item.organization.login + "/" + item.name, image: item.organization.avatar_url };
  });

  const animatedComponents = makeAnimated();

  const onChange = (values) => {
    updateParams({
      organizations: values.map((value) => value.value).join(","),
    });
  };
  return (
    <Select
      components={animatedComponents}
      options={repositoriesItems}
      isMulti={true}
      placeholder="Filtrar por repositórios"
      onChange={onChange}
      getOptionLabel={(option) => (<div><img src={option.image} alt={option.label} style={{width: "24px"}} /> {option.label}</div>)}
    />
  );
};

export default RepositoriesSelect;
