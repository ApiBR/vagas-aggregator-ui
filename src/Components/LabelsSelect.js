export const LabelsSelect = ({ labels, updateParams }) => {
    const labelsItems = labels.map(label => {
        return (<option key={label.name} value={label.name}>{label.name}</option>);
    });
    labelsItems.unshift(<option key="todos" value="">[TODAS AS LABELS]</option>);
    let labelsInput;
    return(
        <select className="form-control" onChange={() => updateParams({labels: labelsInput.value})}  ref={node => { labelsInput = node }}>
            {labelsItems}
        </select>
    )
}