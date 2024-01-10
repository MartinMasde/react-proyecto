import PropTypes from "prop-types";
import classes from "./RepoDetails.module.css";

export const RepoList = ({ results, handleItemClick }) => {
  return (
    <div className={classes.list}>
      <ul className={classes.results}>
        {results?.map((item) => (
          <li key={item.id} onClick={() => handleItemClick(item)}>
            <strong> {item.full_name} </strong> {item.description}
            <strong> {item.login} </strong>{" "}
            {/* Muestra el nombre del usuario */}
            <br />
            {item.type === "User" ? (
              <img
                src={item.avatar_url}
                className={classes.avatar}
                alt={`${item.login}'s avatar`}
              />
            ) : (
              <img
                src={item.owner?.avatar_url ?? 'URL_POR_DEFECTO'}
                className={classes.avatar}
                alt={`${item.login}'s avatar`}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

RepoList.propTypes = {
  results: PropTypes.array,
  handleItemClick: PropTypes.func,
  UserDetails: PropTypes.bool,
};
