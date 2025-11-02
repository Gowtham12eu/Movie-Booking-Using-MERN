import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Trailer from "./Trailer";
import { movieContext } from "../Components/Context"
import '../Css/movie.css';

function MovieShow() {
  const { setMovie } = useContext(movieContext);
  const [movieData, setMovieData] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [lessAll, setLessAll] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/moviedata");
        const result = await response.json();
        setMovieData(result.data);
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };
    fetchData();
  }, []);

  const visibleCards = showAll ? movieData : movieData.slice(0, 4);
  const displayedCards = lessAll ? movieData.slice(0, 4) : visibleCards;

  const handleShowMore = () => {
    setShowAll(true);
    setLessAll(false);
  };

  const handleLessMore = () => {
    setShowAll(false);
    setLessAll(false);
  };

  const Submit = (item) => {
    setMovie(item);
    localStorage.setItem("selectedMovie", JSON.stringify(item));
  }

  return (
    <div className="page-wrapper">
      <div className="container-wrapper">
        <h1 className="container-head">Now Showing</h1>
        <div className="container">
          {displayedCards.map((item, index) => (
            <div className="container-main" key={index}>
              <img src={item.image} alt={`${item.title} Poster`} className="poster" />
              <h3 className="title">{item.title}</h3>
              <p className="genre">
                {item.genre || "Genre Unknown"} <span className="runtime">{item.releaseDate}</span>
              </p>
              <div className="rating">
                <span className="star">★</span> {item.rating}
              </div>
              <Link to="/movieDetails">
                <button className="buy-button" onClick={() => Submit(item)}>Buy Tickets</button>
              </Link>
            </div>
          ))}
        </div>

        <div className="button-wrapper">
          {!showAll && !lessAll && (
            <button className="toggle-button" onClick={handleShowMore}>Show More</button>
          )}
          {showAll && !lessAll && (
            <button className="toggle-button" onClick={handleLessMore}>Less More</button>
          )}
        </div>
      </div>

      <Trailer />
    </div>
  );
}

export default MovieShow;
