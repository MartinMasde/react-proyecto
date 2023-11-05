import PropTypes from "prop-types";
import classes from "./RepoDetails.module.css";

export const DetailsComponent = ({ selectedItem, handleBack }) => {
  return (
    <>
      <div className={classes.details}>
        <h2>Nombre Repositorio: {selectedItem.full_name}</h2>
        <p>
          <strong>Descripción: </strong> {selectedItem.description}
        </p>
        <p>
          <strong>Nombre Autor: </strong> {selectedItem.name}
        </p>
        <p>
          <strong>URL: </strong> <a href={selectedItem.html_url} target="_blank" rel="noopener noreferrer"> {selectedItem.html_url}</a>
        </p>
        <p>
          <strong> ⭐️ Estrellas:</strong> {selectedItem.stargazers_count}{" "}
        </p>
      </div>
      <div className={classes.button}>
        <button onClick={handleBack}>Volver a los resultados</button>
      </div>
    </>
  );
};

DetailsComponent.propTypes = {
  selectedItem: PropTypes.object,
  handleBack: PropTypes.func,
};
