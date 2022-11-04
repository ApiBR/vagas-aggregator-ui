export const Contributor = ({ contributor, showName = false }) => {
    const name = showName ? (<span>{contributor.login}</span>) : "";
    return (
        <div className="mb-3 mt-3 col-lg-1">
            <a href={contributor.url} target="_blank" title={contributor.login} rel="noopener noreferrer">
                <img src={contributor.avatar_url} alt={contributor.login} className="rounded-circle img-responsive" style={{width: "48px"}}/>
                {name}
            </a>
        </div>
    )
}

export const Contributors = ({ contributors }) => {
    const contributorsItems = contributors.map(contributor => {
        return (<Contributor contributor={contributor} key={contributor.id} />);
    });
    return (
        <div className="d-flex row">
            {contributorsItems}
        </div>
    )
}
