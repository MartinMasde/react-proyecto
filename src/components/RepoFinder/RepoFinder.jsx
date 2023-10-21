import { useState } from 'react';

export const RepoFinder = () => {
// function App() {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
  
    const handleSearch = () => {
      fetch(`https://api.github.com/search/repositories?q=${searchTerm}`)
        .then(response => response.json())
        .then(data => setResults(data.items))
        .catch(error => console.error(error));
    };
  
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
            type="text"
            placeholder="Buscar por usuario o repositorio"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch}>Buscar</button>
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
          <div className="results">
            <ul>
              {results.map((item) => (
                <li key={item.id} onClick={() => handleItemClick(item)}>
                  <strong>{item.full_name}</strong>: {item.description}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
  
