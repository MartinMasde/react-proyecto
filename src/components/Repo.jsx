
import classes from './Repo.module.css';
import  PropTypes  from 'prop-types';

 export const Repo = ({ name, owner, description, onShowRepo}) => {
    const onClickHandler = () => {
        onShowRepo(name);
    };

    return (
        <li className={classes.repo}>
            <span onClick={() => onClickHandler()}>{name}</span>
            <span>{owner}</span>
            <span>{description}</span>
        </li>
    );
};
Repo.propTypes={
    name: PropTypes.string,
    owner: PropTypes.object,
    description: PropTypes.string,
    onShowRepo: PropTypes.any
}
