import '../Css/Buyed.css';
import { data, useNavigate } from 'react-router-dom';
import {
    SignInButton,
    SignedOut,
    SignUpButton,
    UserButton,
    SignedIn
} from '@clerk/clerk-react';
import { useContext, useEffect, useState } from 'react';
import { seatContext, movieContext, movieDateContext, totalContext } from '../Components/Context';

function MyBooking() {
    const { seatMovie, setSeatMovie } = useContext(seatContext);
    const { totalBook, setTotalBook } = useContext(totalContext);
    const { movie, setMovie } = useContext(movieContext);
    const { movieDate, setMovieDate } = useContext(movieDateContext);
    const navigate = useNavigate();

    useEffect(() => {
        const savedMovie = localStorage.getItem("movie");
        const savedMovieDate = localStorage.getItem("Date");
        const saveMovieSeat = localStorage.getItem("seat");
        const savedTotalBook = localStorage.getItem("TotalBooked");

        if (!movie && savedMovie) setMovie(JSON.parse(savedMovie));
        if (!movieDate && savedMovieDate) setMovieDate(savedMovieDate);
        if (!seatMovie && saveMovieSeat) setSeatMovie(saveMovieSeat);
        if (!totalBook && savedTotalBook) setTotalBook(Number(savedTotalBook));
    }, []);

    useEffect(() => { if (movie) localStorage.setItem("movie", JSON.stringify(movie)); }, [movie]);
    useEffect(() => { if (movieDate) localStorage.setItem("movieDate", movieDate); }, [movieDate]);
    useEffect(() => { if (seatMovie) localStorage.setItem("seatMovie", seatMovie); }, [seatMovie]);
    useEffect(() => { if (totalBook) localStorage.setItem("totalBook", totalBook); }, [totalBook]);
    const [book, setBook] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetch("http://localhost:8000/book");

                const data = await result.json();
                setBook(data.data);
            } catch (error) {
                console.error("Error:", error.message);
            }
        }
        fetchData();
    }, []);
    console.log(book);
    return (
        <div className='movie-page'>
            {/* Navbar */}
            <div className="main">
                <h1 className="main-header">
                    <span className="main-single">Q</span>uickShow
                </h1>
                <div className="main-para">
                    <p>Home</p>
                    <p>Movies</p>
                    <p>Theaters</p>
                    <p>Releases</p>
                </div>
                <i className="fas fa-search new-class"></i>
                <div className="login" style={{ display: 'flex', gap: '10px', color: 'white', width: '60px', marginLeft: '5px', paddingLeft: '8px', paddingTop: '0px', position: 'relative', left: '30px', top: '0px', bottom: '30px' }}>
                    <SignedOut>
                        <SignInButton mode="modal">
                            <button className="login">Login</button>
                        </SignInButton>
                        <SignUpButton mode="modal">
                            <button className="login" style={{ width: '60px', marginLeft: '5px', paddingLeft: '8px', paddingTop: '0px', position: 'relative', left: '0px' }}>SignUp</button>
                        </SignUpButton>
                    </SignedOut>
                    <SignedIn>
                        <UserButton>
                            <UserButton.MenuItems>
                                <UserButton.Action
                                    label="My Booking"
                                    labelIcon={<i className="fa-solid fa-book" style={{ fontSize: '15px' }}></i>}
                                    onClick={() => navigate('/My-Booking')}
                                />
                            </UserButton.MenuItems>
                        </UserButton>
                    </SignedIn>
                </div>
            </div>

            <h2 className="booking-heading" style={{ color: "white", textAlign: 'center' }}>My Booking</h2>
            {Array.isArray(book) && book.length > 0 ? (
                book.map((item, index) => (
                    <div className="booking-card" key={item._id || index}>
                        <img
                            src={item.movieImage || "/Images/2.jpg"}
                            alt={item.movieTitle || "Movie Poster"}
                            className="booking-image"
                        />
                        <div className="booking-info">
                            <h3 className="booking-title">
                                Movie Title: {item.movieTitle}
                            </h3>
                            <p className="booking-duration">
                                Movie Date: {item.movieDate}
                            </p>
                            <p className="booking-seats">
                                Seat Numbers: {Array.isArray(item.movieSeat) ? item.movieSeat.join(", ") : item.movieSeat}
                            </p>
                            <p className="booking-tickets">
                                Total Tickets: {item.TotalSeat}
                            </p>
                            <p className="booking-cost">
                                Total Price: ₹{item.MoviePrice}
                            </p>
                        </div>
                    </div>
                ))
            ) : (
                <p style={{ color: "white", textAlign: "center" }}>No bookings found.</p>
            )}


        </div>
    );
}

export default MyBooking;
