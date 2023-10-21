/* eslint-disable react/prop-types */
import { useState } from 'react';
import Repo from './Repo';
import classes from './Repo.module.css';

 export const Repos = ({ repos: reposProp }) => {
    const [showRepos, setShowRepos] = useState(true);
    const [repos, setRepos] = useState(reposProp);

    const toggleReposHandler = () => {
        setShowRepos ((curState) => !curState);
    };

    const onShowRepo = (verRepo) => {
        const filteredRepos = repos.filter((repo) => repo.name != verRepo);
        setRepos(filteredRepos);
    };

    const reposList = () => {
        return (
            <ul>
                {repos.map((repo) => (
                    <Repo key={repo.id} name={repo.name} description={repo.description} onShowRepo={onShowRepo} />
                ))}
            </ul>
        );
    };

    return (
        <div className={classes.repos}>
            <button onClick={toggleReposHandler}>
                {showRepos ? 'Hide' : 'Show'} Repos
            </button>
            {showRepos && reposList()}
        </div>
    );
};