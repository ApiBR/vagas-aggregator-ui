import { Link } from "react-router-dom";
export const Label = ({ label }) => {
    const url = "/?labels=" + label.name;
    return (
        <Link to={url}>
            <span className="badge mr-2 mb-2" style={{ textTransform: "capitalize", border: "2px solid #" + label.color, color: "#FFF" }}>
                {label.name}
            </span>
        </Link>
    )
}

export const Labels = ({ labels, issueId }) => {
    const labelsItems = labels.map(label => {
        const key = issueId + "-" + label.name;
        return (<Label label={label} key={key} />);
    })
    return (
        <div>
            {labelsItems}
        </div>
    )
}
 