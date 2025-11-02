import { heartContext, movieContext } from "./Context";
import { useContext } from "react";
import { SignedOut, SignedIn, SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from 'react-toastify';

function Heart() {
  const { heartBook, setHeartBook } = useContext(heartContext);
  const { setMovie } = useContext(movieContext);
  const navigate = useNavigate();

  console.log("HeartBook Array:", heartBook);
  console.log("HeartBook Length:", heartBook?.length);
  console.log("Is Array?", Array.isArray(heartBook));

  const handleRemoveFromFavorites = (movieId) => {
    setHeartBook(prev => {
      const updated = prev.filter(item => item._id !== movieId);
      toast.success("Removed from favorites!");
      return updated;
    });
  };

  const handleMovieClick = (movie) => {
    setMovie(movie);
    navigate('/movieDetails');
  };

  return (
    <div className='movie-page'>
      {/* Navbar */}
      <header className="main">
        <h1 className="main-header">
          <Link to="/" style={{ textDecoration: 'none' }} className="logo-link">
            <span className="main-single" style={{ color: 'red' }}>Q</span>uick
            <span>Show</span>
          </Link>
        </h1>
        <nav className="main-para">
          <p onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Home</p>
          <p>Movies</p>
          <p>Theaters</p>
          <p>Releases</p>
        </nav>
        <i className="fas fa-search new-class"></i>
        <div className="login" style={{ display: 'flex', gap: '10px', color: 'white' }}>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="login">Login</button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="login">SignUp</button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="My Booking"
                  labelIcon={<i className="fa-solid fa-book"></i>}
                  onClick={() => navigate('/My-Booking')}
                />
                <UserButton.Action
                  label="Favorites"
                  labelIcon={<i className="fa-solid fa-heart"></i>}
                  onClick={() => navigate('/heart')}
                />
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
        </div>
      </header>

      <h2 style={{ color: "white", textAlign: "center", margin: "40px 0 20px 0", fontSize: "2rem" }}>
        My Favorites ❤️
      </h2>

      <div className="container" style={{ marginTop: "30px", marginBottom: "50px" }}>
        <div className="row">
          {Array.isArray(heartBook) && heartBook.length > 0 ? (
            heartBook.map((movie, index) => (
              <div className="col-md-4 mb-4" key={movie._id || index}>
                <div className="card h-100" style={{ backgroundColor: '#1a1a1a', color: 'white', border: '1px solid #333' }}>
                  <img
                    src={movie.image || "/Images/2.jpg"}
                    className="card-img-top"
                    alt={movie.title || "Movie"}
                    style={{ height: "400px", objectFit: "cover", cursor: 'pointer' }}
                    onClick={() => handleMovieClick(movie)}
                  />
                  <div className="card-body">
                    <h5 className="card-title" style={{ color: '#ff4081', fontWeight: 'bold' }}>
                      {movie.title}
                    </h5>
                    <p className="card-text" style={{ color: '#aaa' }}>
                      <i className="fa-solid fa-language"></i> English
                    </p>
                    <p className="card-text" style={{ color: '#ffd700' }}>
                      <i className="fa-solid fa-star"></i> {movie.rating || 'N/A'}
                    </p>
                    <p className="card-text" style={{ fontSize: '0.9rem', color: '#ccc' }}>
                      {movie.story}
                    </p>
                    <p className="card-text" style={{ fontSize: '0.85rem', color: '#999' }}>
                      {movie.movieDetails}
                    </p>
                    <button 
                      className="btn btn-danger mt-2 w-100"
                      onClick={() => handleRemoveFromFavorites(movie._id)}
                    >
                      <i className="fa-solid fa-trash"></i> Remove from Favorites
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={{ 
              color: "white", 
              textAlign: "center", 
              width: "100%",
              padding: "50px 20px"
            }}>
              <i className="fa-regular fa-heart" style={{ fontSize: "4rem", opacity: 0.3, marginBottom: "20px" }}></i>
              <p style={{ fontSize: "1.5rem", marginBottom: "10px" }}>
                No favorites added yet.
              </p>
              <p style={{ color: "#aaa", marginBottom: "30px" }}>
                Start adding movies to your favorites by clicking the heart icon!
              </p>
              <button 
                className="btn btn-primary"
                onClick={() => navigate('/')}
                style={{ backgroundColor: '#ff4081', border: 'none', padding: '10px 30px' }}
              >
                Browse Movies
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Heart