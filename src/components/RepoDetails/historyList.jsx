import PropTypes from "prop-types";
import classes from "./RepoDetails.module.css";

export const QueriesList = ({ queries, handleQueryClick, handleUpdateClick }) => {
  const formatDate = (date) => {
    const options = {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return new Intl.DateTimeFormat("es-ES", options).format(new Date(date));
  };

  return (
    <>
      {queries && (
        <div className={classes.list}>
          <ul className={classes.results}>
            {queries.map((query) => (
              <li key={query._id} >
                  <strong>Buscado: </strong>{" "}{query.queryOptions.q} {" "}
                  <strong>Tipo de Repositorio: </strong> {" "}{query.searchType}{" "}
                  <strong>Fecha de busqueda:</strong> {" "}{formatDate(query.date)}{" "}
                  <br />
                  <button className={classes.button2} onClick={() => handleQueryClick(query)}> BORRAR </button>
                  <button className={classes.button2} onClick={() => handleUpdateClick(query.queryOptions.q)}> BUSCAR </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

QueriesList.propTypes = {
  queries: PropTypes.array,
  handleQueryClick: PropTypes.func,
  handleUpdateClick: PropTypes.func
};
