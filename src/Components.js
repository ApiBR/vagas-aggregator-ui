import React from "react";

export const Repository = ({ repository }) => {
    return (
        <div>
            {repository.organization.login}
        </div>
    )
}

export const Repositories = ({ repositories }) => {
    const repositoriesItems = repositories.map(repository => {
        return (<Repository repository={repository} />);
    });
    return (
        <div>
            {repositoriesItems}
        </div>
    )
}