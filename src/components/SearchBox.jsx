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

import { Link } from "react-router-dom";

function SearchBox(){
  return(
    <div className="search-box full-width">
      <input className="search-box-input" type="search" placeholder="Buscar..." />
      <div className="search-box-results">
        <Link className="search-box-results-item" >
           <strong>Abbey Road</strong> - The Beatles
           <span> - The Beatles</span>
        </Link>
      </div>
    </div>
  )
}

export default SearchBox;
