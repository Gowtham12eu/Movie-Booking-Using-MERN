import { movieContext, movieDateContext, seatContext, totalContext, heartContext } from './Components/Context';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieDetails from './Components/MovieDetails';
import Mains from './Components/Mains';
import MyBooking from './Components/MyBooking';
import SeatBooking from './Components/SeatBooking';
import Heart from './Components/Heart';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const [movie, setMovie] = useState(() => {
    const saved = localStorage.getItem("movie");
    try {
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [movieDate, setMovieDate] = useState(() => {
    const saved = localStorage.getItem("Date");
    try {
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [seatMovie, setSeatMovie] = useState(() => {
    const saved = localStorage.getItem("seat");
    try {
      return saved ? JSON.parse(saved) : 0;
    } catch {
      return 0;
    }
  });

  const [totalBook, setTotalBook] = useState(() => {
    const saved = localStorage.getItem("TotalBooked");
    try {
      return saved ? JSON.parse(saved) : 0;
    } catch {
      return 0;
    }
  });

  const [heartBook, setHeartBook] = useState(() => {
    const saved = localStorage.getItem("HeartBook");
    try {
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("movie", JSON.stringify(movie));
  }, [movie]);

  useEffect(() => {
    localStorage.setItem("Date", JSON.stringify(movieDate));
  }, [movieDate]);

  useEffect(() => {
    localStorage.setItem("seat", JSON.stringify(seatMovie));
  }, [seatMovie]);

  useEffect(() => {
    localStorage.setItem("TotalBooked", JSON.stringify(totalBook));
  }, [totalBook]);

  useEffect(() => {
    localStorage.setItem("HeartBook", JSON.stringify(heartBook));
  }, [heartBook]);

  return (
    <movieContext.Provider value={{ movie, setMovie }}>
      <movieDateContext.Provider value={{ movieDate, setMovieDate }}>
        <seatContext.Provider value={{ seatMovie, setSeatMovie }}>
          <totalContext.Provider value={{ totalBook, setTotalBook }}>
            <heartContext.Provider value={{ heartBook, setHeartBook }}>
              <Router>
                <Routes>
                  <Route path="/" element={<Mains />} />
                  <Route path="/movieDetails" element={<MovieDetails />} />
                  <Route path="/My-Booking" element={<MyBooking />} />
                  <Route path="/seat-booking" element={<SeatBooking />} />
                  <Route path="/heart" element={<Heart />} />
                </Routes>
              </Router>
              <ToastContainer />
            </heartContext.Provider>
          </totalContext.Provider>
        </seatContext.Provider>
      </movieDateContext.Provider>
    </movieContext.Provider>
  );
}

export default App;
