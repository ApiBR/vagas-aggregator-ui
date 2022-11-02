import {LabelsSelect } from "./LabelsSelect";

export const Controls = ({ params, labels, updateParams }) => {
    let quantityInput;
    let searchInput;
    return (
        <div className="row mt-3 mb-3 mr-2 ml-2">
            <div className="col-lg-3">
                <LabelsSelect labels={labels} updateParams={updateParams} />
            </div>
            <div className="col-lg-3">
                <select defaultValue={params.per_page} className="form-control" onChange={() => updateParams({ per_page: quantityInput.value })} ref={node => { quantityInput = node }}>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
            </div>
            <div className="col-lg-6">
                <form className="d-flex" onSubmit={(e) => {e.preventDefault(); updateParams({ term: searchInput.value }) }}>
                    <input className="form-control me-sm-2" type="text" placeholder="Pesquisar" ref={node => { searchInput = node }}/>
                    <button className="btn btn-secondary my-2 my-sm-0" type="submit">Pesquisar</button>
                </form>
            </div>
        </div>
    )
}