import { useState, useEffect } from "react";
import { Octokit } from "@octokit/rest"; // Importa Octokit para poder hacer la paginación
import { Pagination } from "@mui/material";
import classes from "./RepoFinder.module.css";
import { Box } from "@mui/material";
import { DetailsComponent } from "../RepoDetails/RepoDetails";

const octokit = new Octokit(); // Instancia de Octokit para poder hacer la paginación

export const RepoFinder = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const handleSearch = async () => {
    try {
      let response;

      // Verificar si el input parece ser un nombre de usuario (empieza con @)
      if (searchTerm.startsWith("@")) {
        // Si el input empieza con @, buscar usuario
        const username = searchTerm.substring(1); // Eliminar el @ del input
        response = await octokit.users.getByUsername({ username });
        setResults([response.data]); // Almacenar el usuario en la lista de resultados
        setTotalPages(1); // Un solo resultado para el usuario
      } else {
        // Si no empieza con @, busca el repositorio
        response = await octokit.search.repos({
          q: searchTerm,
          page: page,
          per_page: 30,
        });
        setResults(response.data.items);
        setTotalPages(Math.ceil(response.data.total_count / 30));
      }
    } catch (error) {
      console.error("Error: ", error.message);
    }
  };

  // const handleSearch = async () => {
  //   try {
  //     const response = await octokit.search.repos({  // Utiliza el método search.repos de Octokit
  //       q: searchTerm,
  //       page: page,
  //       per_page: 30 // Número de resultados por página
  //     });
  //     setResults(response.data.items);
  //     setTotalPages(Math.ceil(response.data.total_count / 30)); // 30 resultados por página
  //   } catch (error) {
  //     console.error("Error: ", error.message);
  //   }
  // };

  useEffect(() => {
    handleSearch();
  }, [page]); // Se ejecuta cada vez que cambia la página

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleBack = () => {
    setSelectedItem(null);
  };

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <div className="App">
      <div className="search-bar">
        <input
          className={classes.input}
          type="text"
          placeholder="Buscar por repositorio o por usuario agregar ´@´ adelante"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className={classes.button} onClick={handleSearch}>
          Buscar
        </button>
      </div>

      {selectedItem ? (
        <DetailsComponent selectedItem={selectedItem} handleBack={handleBack} />

      ) : (
        <div>
          <ul className={classes.results}>
            {results.map((item) => (
              <li key={item.id} onClick={() => handleItemClick(item)}>
                <strong> {item.full_name} </strong> {item.description}
                <strong> {item.login} </strong>{" "}
                <a href={item.avatar_url} target="_blank" rel="noopener noreferrer"> {item.avatar_url} </a>{" "} {/* Muestra el nombre del usuario */}
              </li>
            ))}
          </ul>
          {/* Agrega el componente de paginación */}
          <Box sx={{ display: "flex", justifyContent: "center", m: 2, p: 1 }}>
            <Pagination
              variant="outlined"
              color="primary"
              count={totalPages}
              page={page}
              onChange={handleChange}
            />
          </Box>
        </div>
      )}
    </div>
  );
};
