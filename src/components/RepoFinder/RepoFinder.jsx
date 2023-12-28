import { useState, useEffect } from "react";
import { Pagination, Box } from "@mui/material";
import classes from "./RepoFinder.module.css";
import { DetailsComponent } from "../RepoDetails/RepoDetails";
import { RepoList } from "../RepoDetails/RepoList";
import { UserDetails } from "../RepoDetails/UserDetail";
import { QueriesList } from "../RepoDetails/historyList";

export const RepoFinder = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [queryList, setQueryList] = useState([]); // para listar las queries de la BD
  // eslint-disable-next-line no-unused-vars
  const [authenticated, setAuthenticated] = useState(false); // para verificar si el usuario esta autenticado
  // eslint-disable-next-line no-unused-vars
  const [selectedQuery, setSelectedQuery] = useState(null); // para seleccionar una query en particular de las listadas


  const storedToken = localStorage.getItem("authToken");

  const urlQueries = "http://localhost:3000/api/github/queries";

  // METODO PARA LISTAR LAS QUERIES DE LA BD si el usuario esta autenticado
  const fetchQueries = async () => {
    try {
      // const storedToken = localStorage.getItem("authToken");
      const response = await fetch(urlQueries, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${storedToken}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (storedToken) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
      setQueryList(data);
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
  }, [results]);

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

  // const deleteQueryClick = async (query) => {
  //   if (query) {
  //     setSelectedQuery(query); //
  //     const urlDelete = `http://localhost:3000/api/github/delete/${query._id}`;
  //     try {
  //       const response = await fetch(urlDelete, { method: "Delete" });
  //       if (response.ok) {
  //         deleteQuery(query._id);
  //       }
  //     } catch (error) {
  //       console.log("Error:  ", error.message);
  //     }
  //   }
  // };

  // METODO PARA BUSCAR REPOS O USUARIOS EN GITHUB si el usuario esta autenticado
  const handleSearch = async (searchTermToUse) => {
    try {
      let response;
      let data;

      const urlUsers = `http://localhost:3000/api/github/search/users?username=${searchTermToUse}`;
      const urlRepos = `http://localhost:3000/api/github/search/repos?repoName=${searchTermToUse}`;

      // Verificar si el input parece ser un nombre de usuario (empieza con @) // Si el input empieza con @, buscar usuario
      if (searchTermToUse.startsWith("@")) {
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

  //       const fetchData = async () => {
  //         try {
  //           response = await fetch(urlUsers);
  //           data = await response.json();

  //           setSelectedQuery(null); // para que no quede seleccionada la query
  //         } catch (error) {
  //           console.log("Error:  ", error.message);
  //         }
  //         return data;
  //       };

  //       response = await fetchData();
  //       setResults(response.items);
  //       setTotalPages(Math.ceil(response.total_count / 30));
  //     } else {
  //       // Si no empieza con @, busca el
  //       const fetchData = async () => {
  //         try {
  //           response = await fetch(urlRepos);
  //           data = await response.json();
  //         } catch (error) {
  //           console.log("Error:  ", error.message);
  //         }
  //         return data;
  //       };
  //       response = await fetchData();

  //       setResults(response.items);
  //       setTotalPages(Math.ceil(response.total_count / 30));
  //     }
  //   } catch (error) {
  //     console.error("Error: ", error.message);
  //   }
  // };

  useEffect(() => {
    handleSearch();
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
      <div className="search-bar">
        <input
          className={classes.input}
          type="text"
          placeholder="Buscar por repositorio o por usuario agregar ´@´ adelante"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className={classes.button}
          onClick={() => handleSearch(searchTerm)}
        >
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

      <div>
        <h2>Historial de Busquedas</h2>
        <QueriesList
          queries={queryList}
          handleQueryClick={deleteQueryClick}
          handleUpdateClick={handleSearch}
        />
      </div>
    </div>
  );
};
