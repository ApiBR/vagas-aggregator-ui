import {LabelsSelect } from "./LabelsSelect";
import Select from 'react-select'
import useLoadAll from "../Hooks/useLoadAll";

export const Controls = ({ params, updateParams }) => {
    let searchInput;

    const pageSizeOptions = [
        {value: 10, label: "10 vagas por página"},
        {value: 25, label: "25 vagas por página"},
        {value: 50, label: "50 vagas por página"},
        {value: 100, label: "100 vagas por página"},
    ]

    const labels = useLoadAll("labels", { per_page: 100 });

    return (
        <div className="row mt-3 mb-3 mr-2 ml-2">
            <div className="col-lg-6">
                <form className="d-flex" onSubmit={(e) => {e.preventDefault(); updateParams({ term: searchInput.value }) }}>
                    <input className="form-control me-sm-2" type="text" placeholder="Pesquisar" ref={node => { searchInput = node }}/>
                    <button className="btn btn-secondary my-2 my-sm-0" type="submit">Pesquisar</button>
                </form>
            </div>
            <div className="col-lg-3">
                <LabelsSelect labels={labels} updateParams={updateParams} />
            </div>
            <div className="col-lg-3">
                <Select 
                 options={pageSizeOptions} 
                 defaultValue={pageSizeOptions.filter(option => option.value===params.per_page)} 
                 onChange={(value) => updateParams({per_page: value.value})} />
            </div>
            
        </div>
    )
}