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
        {results.map((product) => (
          <Link className="search-box-results-item" to={`/products/${product.id}`} key={product.id}>
            <strong>{product.name}</strong> -{ product.artist}
          </Link>
        ))}
      </div>
    </div>
  )}
}

export default SearchBox; */


import { Link } from "react-router-dom";
import { useState } from "react";

function SearchBox({ products = [] }) { // Añadido valor por defecto para evitar errores si products es undefined
  const [search, setSearch] = useState("");

  const normalizedSearch = search.toLowerCase().trim();

  const results = products.filter((product) => {
    const name = product.name?.toLowerCase() || ""; // Uso de optional chaining para seguridad
    const category = product.category?.toLowerCase() || "";

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
          {results.map((product) => (
            <Link 
              className="search-box-results-item" 
              to={`/products/${product.id}`} 
              /* key={product.id} */
            >
              <strong>{product.name}</strong> - {product.artist}
            </Link>
          ))}
        </div>
      )} {/* <- Condicional cerrado correctamente */}
    </div>
  ); // <- Se eliminaron las llaves externas inválidas que envolvían al JSX
}

export default SearchBox;

