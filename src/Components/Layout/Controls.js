import Select from "react-select";
import useLoadAll from "../../Hooks/useLoadAll";
import LabelsSelect from "../Labels/LabelsSelect";
import RepositoriesSelect from "../Repositories/RepositoriesSelect";
import AuthorsSelect from "../Authors/AuthorsSelect";

const Controls = ({ params, updateParams }) => {
  let searchInput;

  const pageSizeOptions = [
    { value: 10, label: "10 vagas por página" },
    { value: 25, label: "25 vagas por página" },
    { value: 50, label: "50 vagas por página" },
    { value: 100, label: "100 vagas por página" },
  ];

  const [labels] = useLoadAll("labels", { per_page: 100 });
  const [repositories] = useLoadAll("repositories", { per_page: 100 });
  const [authors] = useLoadAll("authors", { per_page: 100 });

  return (
    <div className="row mt-3 mb-3 mr-2 ml-2">
      <div className="col-lg-4 mb-2">
        <form
          className="d-flex"
          onSubmit={(e) => {
            e.preventDefault();
            updateParams({ term: searchInput.value });
          }}
        >
          <input
            className="form-control me-sm-2"
            type="text"
            placeholder="Pesquisar"
            ref={(node) => {
              searchInput = node;
            }}
          />
          <button
            className="btn btn-lg btn-secondary my-2 my-sm-0"
            type="submit"
          >
            Pesquisar
          </button>
        </form>
      </div>
      <div className="col-lg-2 mb-2">
        <RepositoriesSelect
          repositories={repositories}
          updateParams={updateParams}
        />
      </div>
      <div className="col-lg-2 mb-2">
        <LabelsSelect labels={labels} updateParams={updateParams} />
      </div>
      <div className="col-lg-2 mb-2">
        <AuthorsSelect authors={authors} updateParams={updateParams} />
      </div>
      <div className="col-lg-2 mb-2">
        <Select
          styles={{ menu: (provided) => ({ ...provided, zIndex: 9999 }) }}
          options={pageSizeOptions}
          defaultValue={pageSizeOptions.filter(
            (option) => option.value === params.per_page
          )}
          onChange={(value) => updateParams({ per_page: value.value })}
        />
      </div>
    </div>
  );
};

export default Controls;