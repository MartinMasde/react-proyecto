import { useState, useEffect } from "react";
import { Pagination, Box, Switch, Stack, Typography } from "@mui/material";
import classes from "./RepoFinder.module.css";
import { DetailsComponent } from "../RepoDetails/RepoDetails";
import { RepoList } from "../RepoDetails/RepoList";
import { UserDetails } from "../RepoDetails/UserDetail";
import { useNavigate } from "react-router-dom";

export const RepoFinder = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [authenticated, setAuthenticated] = useState(false); // para verificar si el usuario esta autenticado
  // eslint-disable-next-line no-unused-vars
  const [selectedQuery, setSelectedQuery] = useState(null); // para seleccionar una query en particular de las listadas

  const navigate = useNavigate();

  const handleHistoryClick = () => {  
    navigate("/history");
  };

  const storedToken = localStorage.getItem("authToken");

  // METODO PARA BUSCAR REPOS O USUARIOS EN GITHUB si el usuario esta autenticado

  const [searchType, setSearchType] = useState("repos"); // para buscar repos o usuarios

  const handleSearch = async (searchTermToUse, type) => {
    try {

      // setPage(1); // para que cuando se haga una nueva busqueda, se vuelva a la pagina 1

      let response;
      let data;

      // Para manejar la paginación
      const per_page = 30;
      const startIndex = (page - 1) * per_page;

      const urlUsers = `http://localhost:3000/api/github/search/users?username=${searchTermToUse}&page=${page}&per_page=${per_page}&start_index=${startIndex}`;
      // const urlUsers = `http://localhost:3000/api/github/search/users?username=${searchTermToUse}&page=${page}&per_page=${per_page}`;
      const urlRepos = `http://localhost:3000/api/github/search/repos?repoName=${searchTermToUse}&page=${page}&per_page=${per_page}`;
      // const urlRepos = `http://localhost:3000/api/github/search/repos?repoName=${searchTermToUse}&page=${page}&per_page=${per_page}&start_index=${startIndex}`;

      // Verificar si el input parece ser un nombre de usuario (empieza con @) // Si el input empieza con @, buscar usuario
      if (type === "users") {
        const fetchData = async () => {
          try {
            response = await fetch(urlUsers, {
              method: "GET",
              headers: {
                Authorization: `Bearer ${storedToken}`,
                "Content-Type": "application/json",
              },
            });
            data = await response.json();

            if (storedToken) {
              setAuthenticated(true);
            } else {
              setAuthenticated(false);
            }
            setSelectedQuery(null); // para que no quede seleccionada la query
          } catch (error) {
            console.log("Error:  ", error.message);
          }
          return data;
        };
        response = await fetchData();
        setResults(response.items);
        setTotalPages(Math.ceil(response.total_count / 30));
      } else {
        // Si no empieza con @, busca el
        const fetchData = async () => {
          try {
            response = await fetch(urlRepos, {
              method: "GET",
              headers: {
                Authorization: `Bearer ${storedToken}`,
                "Content-Type": "application/json",
              },
            });
            data = await response.json();

            if (storedToken) {
              setAuthenticated(true);
            } else {
              setAuthenticated(false);
            }
          } catch (error) {
            console.log("Error:  ", error.message);
          }
          return data;
        };
        response = await fetchData();

        setResults(response.items);
        setTotalPages(Math.ceil(response.total_count / 30));
      }
    } catch (error) {
      console.error("Error: ", error.message);
    }
  };

  useEffect(() => {
    handleSearch(searchTerm, searchType, page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]); // Se ejecuta cada vez que cambia la página

  // asignar que tipo de item es
  const [selectedType, setSelectedType] = useState(null);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    // Verificar si el item es un usuario o un repositorio
    if (item.type === "User") {
      setSelectedType("user");
    } else {
      setSelectedType("repo");
    }
  };

  const handleBack = () => {
    setSelectedItem(null);
  };

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <div>
      <div className={classes.searchBar}>
        <input
          className={classes.input}
          type="text"
          placeholder="Ingrese su busqueda"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <br />
        <Stack
          direction="row"
          justifyContent="center"
          spacing={1}
          alignItems="center"
        >
          <Typography>Repositorio</Typography>
          <Switch
            checked={searchType === "users"} // si es users, el switch esta activado
            onChange={() =>
              setSearchType(searchType === "repos" ? "users" : "repos")
            } //cambio de repos a users
            inputProps={{ "aria-label": "controlled" }}
          />
          <Typography>Usuarios</Typography>
        </Stack>
        <br />
        <div className={classes.buttonBar}>
          <button
            className={classes.button}
            onClick={() => handleSearch(searchTerm, searchType)}
          >
            Buscar
          </button>
          <button className={classes.button} onClick={handleHistoryClick}>
            Historial
          </button>
        </div>
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

        <div className={classes.dosColumnas}>
          {/* <div className={classes.repoListContainer}> */}
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
