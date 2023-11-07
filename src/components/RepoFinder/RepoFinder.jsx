import { useState, useEffect } from "react";
import { Octokit } from "@octokit/rest"; // Importa Octokit para poder hacer la paginación
import { Pagination, Box } from "@mui/material";
import classes from "./RepoFinder.module.css";
import { DetailsComponent } from "../RepoDetails/RepoDetails";
import { RepoList } from "../RepoDetails/RepoList";
import { UserDetails } from "../RepoDetails/UserDetail";

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
        // response = await octokit.users.getByUsername({ username });
        // setResults([response.data]); // Almacenar el usuario en la lista de resultados
        // setTotalPages(1); // Un solo resultado para el usuario
        response = await octokit.search.users({
          q: username,
          page: page,
          per_page: 30,
        });
        setResults(response.data.items);
        setTotalPages(Math.ceil(response.data.total_count / 30));
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

  useEffect(() => {
    handleSearch();
  }, [page]); // Se ejecuta cada vez que cambia la página


  // asignar que tipo de item es
  const [selectedType, setSelectedType] = useState(null);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    // Verificar si el item es un usuario o un repositorio
    if (item.type === 'User') {
      setSelectedType('user');
    } else {
      setSelectedType('repo');
    }
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

       {/*  Código para mostrar los detalles del usuario o del repositorio  */}
      {selectedItem && selectedType === "user" && (
        <UserDetails selectedItem={selectedItem} handleBack={handleBack} />
      )}
      {selectedItem && selectedType === "repo" && (
        <DetailsComponent selectedItem={selectedItem} handleBack={handleBack} />
      )}
      {!selectedItem && (
        // Código para mostrar la lista de repositorios y la paginación
        <div>
          <RepoList results={results} handleItemClick={handleItemClick} />

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
