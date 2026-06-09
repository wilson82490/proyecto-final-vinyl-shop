/* import { Link } from "react-router-dom";



function SearchBox(){
    return(
        <div className="search-box">
            <input className="search-box-input" type="search" placeholder="Buscar..." />
            <div className= "search-box-results">
                <Link className="search-box-results">
                   <strong>Abbey Road</strong> - The Beatles
                   <span> - The Beatles</span>
                </Link>

            </div>
        </div>
    )
}

export default SearchBox; */

/* import { Link } from "react-router-dom";
import { useState } from "react";

function SearchBox({ products }) {

     const [search, setSearch] = useState("");

    const normalizedSearch = search.toLowerCase().trim();
    

    const results = products.filter((product) => {
        const Name = product.name.toLowerCase(); */
        /* const Artist = product.artist ? product.artist.toLowerCase() : "";
        const category = product.category.toLowerCase();

        return Name.includes(normalizedSearch) || category.includes(normalizedSearch);
    }).slice(0, 3); // Limitar a los 3 primeros resultados

  return(
    {<div className="search-box full-width">
      <input 
      className="search-box-input" 
      type="search" 
      placeholder="Buscar..."
      value={search}
      onChange={(e) => setSearch(e.target.value)} />


      {search.trim() != '' && (
      <div className="search-box-results">
        {results.map((vinilo) => (
          <Link className="search-box-results-item" to={`/vinilos/${vinilo.id}`} key={vinilo.id}>
            <strong>{vinilo.name}</strong> - {vinilo.artist}
          </Link>
        ))}
      </div>
    </div>
  )}
}

export default SearchBox; */


import { Link } from "react-router-dom";
import { useState } from "react";

function SearchBox({ products }) { // Recibe products de Home.jsx
  const [search, setSearch] = useState("");

  const normalizedSearch = search.toLowerCase().trim();

  const results = products.filter((vinilo) => {
    const name = vinilo.name?.toLowerCase() || ""; // Uso de optional chaining para seguridad
    const category = vinilo.category?.toLowerCase() || "";

    return name.includes(normalizedSearch) || category.includes(normalizedSearch);
  }).slice(0, 3); // Limitar a los 3 primeros resultados

  return (
    <div className="search-box full-width">
      <input 
        className="search-box-input" 
        type="search" 
        placeholder="Buscar..."
        value={search}
        onChange={(e) => setSearch(e.target.value)} 
      />

      {search.trim() !== '' && (
        <div className="search-box-results">
          {results.map((vinilo) => (
            <Link 
              key={vinilo.id}
              onClick={() => setSearch("")} // Limpiar el campo de búsqueda al hacer clic en un resultado
              className="search-box-results-item" 
              to={`/vinilos/${vinilo.id}`} 
            >
              <strong>{vinilo.name}</strong> 
              <span>{vinilo.artist} - {vinilo.category}</span>
            </Link>
          ))}
        </div>
      )} {/* <- Condicional cerrado correctamente */}
    </div>
  ); // <- Se eliminaron las llaves externas inválidas que envolvían al JSX
}

export default SearchBox;
