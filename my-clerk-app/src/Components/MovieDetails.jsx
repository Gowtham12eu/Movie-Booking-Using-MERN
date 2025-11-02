import React, { useContext, useEffect, useState } from 'react';
import '../Css/movie.css';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton
} from '@clerk/clerk-react';
import { movieContext, movieDateContext, heartContext } from "../Components/Context";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function MovieDetails() {
  const { movie, setMovie } = useContext(movieContext);
  const { setMovieDate } = useContext(movieDateContext);
  const { heartBook, setHeartBook } = useContext(heartContext);
  const [date, setDate] = useState();
  const [active, setActive] = useState(Array(26).fill(false));

  useEffect(() => {
    if (!movie) {
      const savedMovie = localStorage.getItem("movie");
      if (savedMovie) {
        try {
          setMovie(JSON.parse(savedMovie));
        } catch (error) {
          console.error("Error parsing movie data:", error);
        }
      }
    }
  }, [movie, setMovie]);

  if (!movie) {
    return (
      <div style={{ color: "white", textAlign: "center", marginTop: "100px" }}>
        Loading movie details...
      </div>
    );
  }

  const handel = (e, index) => {
    const value = e.target.getAttribute("value");
    setDate(value);
    setMovieDate(value);
    const update = [...active];
    update[index] = !update[index];
    setActive(update);
  };

  const handleAddToFavorites = () => {
    setHeartBook(prev => {
      if (!Array.isArray(prev)) prev = [];
      if (!prev.some(item => item._id === movie._id)) {
        toast.success(`${movie.title} added to favorites!`);
        return [...prev, movie];
      } else {
        toast.info(`${movie.title} is already in favorites!`);
        return prev;
      }
    });
  };

  return (
    <div className="movie-page">
      <header className="main">
        <h1 className="main-header">
          <Link to="/" style={{ textDecoration: 'none' }} className="logo-link">
            <span className="main-single" style={{ color: 'red' }}>Q</span>uick
            <span>Show</span>
          </Link>
        </h1>
        <nav className="main-para">
          <p>Home</p>
          <p>Movies</p>
          <p>Theaters</p>
          <p>Releases</p>
        </nav>
        <SignedOut>
          <div className="login-wrapper">
            <SignInButton mode="modal">
              <button className="auth-btn">Login</button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="auth-btn">SignUp</button>
            </SignUpButton>
          </div>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>

      <main className="Movie-data">
        <div className="poster-container">
          <img
            src={movie.image}
            alt="Movie Poster"
            className="movie-poster"
            style={{ width: '300px', height: '400px' }}
          />
        </div>

        <div className="movie-info">
          <h4 className="movie-language">ENGLISH</h4>
          <h1 className="title-mov">{movie.title}</h1>
          <div className="title-icon">
            <i className="fa-solid fa-star father-icon"></i>
            <span>{movie.rating}</span>
          </div>
          <p className="movie-details">{movie.story}</p>
          <p className="movie-detail">{movie.movieDetails}</p>
          <p className="movie-time">
            2h 13min | Crime, Thriller, Action | 2025
          </p>
          <div className="movie-buttons">
            <button className="watch-trailer">Watch Trailer</button>
            <button className="buy-tickets" onClick={() => setMovieDate(date)}>Buy Tickets</button>
            <i
              className="fa-regular fa-heart heart-like"
              onClick={handleAddToFavorites}
              style={{ cursor: 'pointer' }}
            ></i>
          </div>
        </div>
      </main>

      <div className='Booking'>
        <h1 className='booking-chooseDate'>Choose Date</h1>
        <div className="date">
          <p className='booking-date' value="10 jun" style={{ backgroundColor: active[0] ? "black" : "#ff4081" }} onClick={(e) => handel(e, 0)}>10 jun</p>
          <p className='booking-date' value="11 jun" style={{ backgroundColor: active[1] ? "black" : "#ff4081" }} onClick={(e) => handel(e, 1)}>11 jun</p>
          <p className='booking-date' value="12 jun" style={{ backgroundColor: active[2] ? "black" : "#ff4081" }} onClick={(e) => handel(e, 2)}>12 jun</p>
          <p className='booking-date' value="13 jun" style={{ backgroundColor: active[3] ? "black" : "#ff4081" }} onClick={(e) => handel(e, 3)}>13 jun</p>
          <p className='booking-date' value="14 jun" style={{ backgroundColor: active[4] ? "black" : "#ff4081" }} onClick={(e) => handel(e, 4)}>14 jun</p>
          <p className='booking-date' value="15 jun" style={{ backgroundColor: active[5] ? "black" : "#ff4081" }} onClick={(e) => handel(e, 5)}>15 jun</p>
          <p className='booking-date' value="16 jun" style={{ backgroundColor: active[6] ? "black" : "#ff4081" }} onClick={(e) => handel(e, 6)}>16 jun</p>
          <p className='booking-date' value="17 jun" style={{ backgroundColor: active[7] ? "black" : "#ff4081" }} onClick={(e) => handel(e, 7)}>17 jun</p>
          <p className='booking-date' value="18 jun" style={{ backgroundColor: active[8] ? "black" : "#ff4081" }} onClick={(e) => handel(e, 8)}>18 jun</p>
          <p className='booking-date' value="19 jun" style={{ backgroundColor: active[9] ? "black" : "#ff4081" }} onClick={(e) => handel(e, 9)}>19 jun</p>
          <p className='booking-date' value="20 jun" style={{ backgroundColor: active[10] ? "black" : "#ff4081" }} onClick={(e) => handel(e, 10)}>20 jun</p>
          <p className='booking-date' value="21 jun" style={{ backgroundColor: active[11] ? "black" : "#ff4081" }} onClick={(e) => handel(e, 11)}>21 jun</p>
          <p className='booking-date' value="22 jun" style={{ backgroundColor: active[12] ? "black" : "#ff4081" }} onClick={(e) => handel(e, 12)}>22 jun</p>
          <p className='booking-date' value="23 jun" style={{ backgroundColor: active[13] ? "black" : "#ff4081" }} onClick={(e) => handel(e, 13)}>23 jun</p>
          <p className='booking-date' value="24 jun" style={{ backgroundColor: active[14] ? "black" : "#ff4081" }} onClick={(e) => handel(e, 14)}>24 jun</p>
          <p className='booking-date' value="25 jun" style={{ backgroundColor: active[15] ? "black" : "#ff4081" }} onClick={(e) => handel(e, 15)}>25 jun</p>
          <p className='booking-date' value="26 jun" style={{ backgroundColor: active[16] ? "black" : "#ff4081" }} onClick={(e) => handel(e, 16)}>26 jun</p>
          <p className='booking-date' value="27 jun" style={{ backgroundColor: active[17] ? "black" : "#ff4081" }} onClick={(e) => handel(e, 17)}>27 jun</p>
          <p className='booking-date' value="28 jun" style={{ backgroundColor: active[18] ? "black" : "#ff4081" }} onClick={(e) => handel(e, 18)}>28 jun</p>
          <p className='booking-date' value="29 jun" style={{ backgroundColor: active[19] ? "black" : "#ff4081" }} onClick={(e) => handel(e, 19)}>29 jun</p>
          <p className='booking-date' value="30 jun" style={{ backgroundColor: active[20] ? "black" : "#ff4081" }} onClick={(e) => handel(e, 20)}>30 jun</p>
          <p className='booking-date' value="31 jun" style={{ backgroundColor: active[21] ? "black" : "#ff4081" }} onClick={(e) => handel(e, 21)}>31 jun</p>
          <p className='booking-date' value="32 jun" style={{ backgroundColor: active[22] ? "black" : "#ff4081" }} onClick={(e) => handel(e, 22)}>32 jun</p>
          <p className='booking-date' value="33 jun" style={{ backgroundColor: active[23] ? "black" : "#ff4081" }} onClick={(e) => handel(e, 23)}>33 jun</p>
          <p className='booking-date' value="34 jun" style={{ backgroundColor: active[24] ? "black" : "#ff4081" }} onClick={(e) => handel(e, 24)}>34 jun</p>
          <p className='booking-date' value="35 jun" style={{ backgroundColor: active[25] ? "black" : "#ff4081" }} onClick={(e) => handel(e, 25)}>35 jun</p>
        </div>
        <Link to='/seat-booking'><button className='booknow'>BookNow</button></Link>
      </div>
    </div>
  );
}

export default MovieDetails;