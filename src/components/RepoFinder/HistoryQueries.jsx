import { useState, useEffect } from "react";
import classes from "./RepoFinder.module.css";
import { QueriesList } from "../RepoDetails/QueriesList";
import PropTypes from "prop-types";

export const HistoryQueries = () => {
  const [queryList, setQueryList] = useState([]); // para listar las queries de la BD
  // eslint-disable-next-line no-unused-vars
  const [authenticated, setAuthenticated] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [selectedQuery, setSelectedQuery] = useState(null); // para seleccionar una query en particular de las listadas

  const storedToken = localStorage.getItem("authToken");

  const urlQueries = "http://localhost:3000/api/github/queries";

  // METODO PARA LISTAR LAS QUERIES DE LA BD si el usuario esta autenticado
  const fetchQueries = async () => {
    try {
      const response = await fetch(urlQueries, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${storedToken}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (storedToken) {
        // setQueryList(data);
        setQueryList(data.sort((a, b) => new Date(b.date) - new Date(a.date)));
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
      // setQueryList(data);
    } catch (error) {
      console.log("Error:  ", error.message);
    }
  };

  // const fetchQueries = async () => {
  //   try {
  //     const response = await fetch(urlQueries);
  //     const data = await response.json();
  //     setQueryList(data);
  //   } catch (error) {
  //     console.log("Error:  ", error.message);
  //   }
  // };

  useEffect(() => {
    fetchQueries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storedToken]);

  // METODOS PARA BORRAR UNA QUERY EN PARTICULAR DE LA BD si el usuario esta autenticado
  const deleteQuery = (id) => {
    const filteredQueryList = queryList.filter((query) => query._id !== id);
    setQueryList(filteredQueryList);
  };

  const deleteQueryClick = async (query) => {
    if (query) {
      setSelectedQuery(query);
      const urlDelete = `http://localhost:3000/api/github/delete/${query._id}`;
      try {
        const response = await fetch(urlDelete, {
          method: "Delete",
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          deleteQuery(query._id);
        }
      } catch (error) {
        console.log("Error:  ", error.message);
      }
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className={classes.dosColumnas}>
      <h2>Historial de Busquedas</h2>
      <QueriesList
        queries={queryList}
        handleQueryClick={deleteQueryClick}
        // handleUpdateClick={handleSearch}
      />
      <div>
        <button className={classes.button} onClick={handleBack}>
          Volver
        </button>
      </div>
    </div>
  );
};

HistoryQueries.propTypes = {
  handleBack: PropTypes.func,
};
