import { useState } from "react";
import classes from "./RepoFinder.module.css";
import { Pagination } from "@mui/material";
// import Box from '@mui/material/Box';
import { Box } from "@mui/material";

export const RepoFinder = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://api.github.com/search/repositories?q=${searchTerm}`
      );
      const data = await response.json();
      setResults(data.items);
      setCount(Math.ceil(data.total_count / 30)); //pagination
      console.log("Data: ", data.total_count); //ver en consola el total de resultados
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  // pagination
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  const handleChange = (event, value) => {
    setPage(value);
  };
  // end pagination

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleBack = () => {
    setSelectedItem(null);
  };

  return (
    <div className="App">
      <div className="search-bar">
        <input
          className={classes.input}
          type="text"
          placeholder="Buscar por usuario o repositorio"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className={classes.button} onClick={handleSearch}>
          Buscar
        </button>
      </div>

      {selectedItem ? (
        <div className="details">
          <h2>Nombre Repositorio: {selectedItem.full_name}</h2>
          <p>Descripción: {selectedItem.description}</p>
          <p>Nombre Autor: {selectedItem.name}</p>
          <p>Estrellas: {selectedItem.stargazers_count} ⭐️</p>
          <button onClick={handleBack}>Volver a los resultados</button>
        </div>
      ) : (
        <div className={classes.input}>
          <ul className="results">
            {results.map((item) => (
              <li key={item.id} onClick={() => handleItemClick(item)}>
                <strong>{item.full_name}</strong>: {item.description}
              </li>
            ))}
          </ul>
          {/* pagination */}
          <Box sx={{ display: "flex", justifyContent: "center", m: 2, p: 1 }}>
            <Pagination
              variant="outlined"
              color="primary"
              count={count}
              page={page}
              onChange={handleChange}
            />
          </Box>
          {/* end pagination  */}
        </div>
      )}
    </div>
  );
};
