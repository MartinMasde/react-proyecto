import PropTypes from "prop-types";
import classes from "./RepoDetails.module.css";

export const UserDetails = ({ selectedItem, handleBack }) => {
  return (
    <>
      <div className={classes.details}>
        <h2>Nombre Usuario: {selectedItem.login}</h2>
        <p>
        <strong>Avatar: </strong> <a href={selectedItem.avatar_url} target="_blank" rel="noopener noreferrer"> {selectedItem.avatar_url}</a>
        </p>
        <p>
          <strong>URL: </strong> <a href={selectedItem.html_url} target="_blank" rel="noopener noreferrer"> {selectedItem.html_url}</a>
        </p>
      </div>
      <div className={classes.button}>
        <button onClick={handleBack}>Volver a los resultados</button>
      </div>
    </>
  );
};

UserDetails.propTypes = {
  selectedItem: PropTypes.object,
  handleBack: PropTypes.func,
};