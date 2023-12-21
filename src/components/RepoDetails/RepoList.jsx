import PropTypes from "prop-types";
import classes from "./RepoDetails.module.css";

export const RepoList = ({ results, handleItemClick }) => {
    return (
        <div className={classes.list}>
            <ul className={classes.results}>
                {results?.map((item) => (
                <li key={item.id} onClick={() => handleItemClick(item)}>
                <strong> {item.full_name} </strong> {item.description}
                <strong> {item.login} </strong>{" "} {/* Muestra el nombre del usuario */}
                <a href={item.avatar_url} target="_blank" rel="noopener noreferrer"> {item.avatar_url} </a>{" "} 
                </li>
                ))}
            </ul>
        </div>
    )
};   

RepoList.propTypes = {
    results: PropTypes.array,
    handleItemClick: PropTypes.func,
};

// import PropTypes from "prop-types";
// import classes from "./RepoDetails.module.css"

// import { useState } from 'react';
// import { Select, MenuItem, TextField, } from '@mui/material';

// export const RepoList = ({ results, handleItemClick }) => {
//   const [languageFilter, setLanguageFilter] = useState('');
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');

//   const handleLanguageChange = (event) => {
//     setLanguageFilter(event.target.value);
//   };

//   const handleStartDateChange = (event) => {
//     setStartDate(event.target.value);
//   };

//   const handleEndDateChange = (event) => {
//     setEndDate(event.target.value);
//   };

//   const filteredResults = results.filter((item) => {
//     const matchesLanguage = languageFilter === '' || item.language === languageFilter;
//     const matchesDateRange =
//       (startDate === '' || new Date(item.created_at) >= new Date(startDate)) &&
//       (endDate === '' || new Date(item.created_at) <= new Date(endDate));
//     return matchesLanguage && matchesDateRange;
//   });

//   return (
//     <div>
//       <div>
//         <Select value={languageFilter} onChange={handleLanguageChange} label="Idioma">
//           <MenuItem value="">Todos los idiomas</MenuItem>
//           <MenuItem value="JavaScript">JavaScript</MenuItem>
//           <MenuItem value="Python">Python</MenuItem>
//           {/* Agrega más opciones de idioma según tus necesidades */}
//         </Select>
//         <TextField
//           type="date"
//           value={startDate}
//           onChange={handleStartDateChange}
//           label="Fecha de inicio"
//           variant="outlined"
//         />
//         <TextField
//           type="date"
//           value={endDate}
//           onChange={handleEndDateChange}
//           label=""
//           variant="outlined"
//         />
//       </div>
//       <ul className={classes.results}>
//         {filteredResults.map((item) => (
//           <li key={item.id} onClick={() => handleItemClick(item)}>
//             <strong> {item.full_name} </strong> {item.description}
//             <strong> {item.login} </strong> {/* Muestra el nombre del usuario */}
//             <a href={item.avatar_url} target="_blank" rel="noopener noreferrer">
//               {item.avatar_url}
//             </a>{' '}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };


// RepoList.propTypes = {
//     results: PropTypes.array,
//     handleItemClick: PropTypes.func,
// };