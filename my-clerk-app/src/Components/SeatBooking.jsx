import '../Css/SeatingBooking.css';
import { useUser } from '@clerk/clerk-react';
import {
    SignInButton,
    SignedOut,
    SignUpButton,
    UserButton,
    SignedIn
} from '@clerk/clerk-react';
import { seatContext, movieContext, movieDateContext, totalContext } from '../Components/Context';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
function SeatBooking() {
    const { seatMovie, setSeatMovie } = useContext(seatContext);
    const { totalBook, setTotalBook } = useContext(totalContext);
    const { movie } = useContext(movieContext);
    const { movieDate, setMovieDate } = useContext(movieDateContext);
    const [active, setActive] = useState(Array(110).fill(false));
    const [proceed, setProceed] = useState(false);
    let buttonColor = "Gray";
    if (proceed) buttonColor = "Gray";
    const navigate = useNavigate();
    const handle = (e, index) => {
        let update = [...active];
        update[index] = !update[index];
        setActive(update);
        const activeCount = update.filter(item => item).length;
        setTotalBook(activeCount);
    };
    const last = async (e) => {
        const selectedSeats = active.map((val, idx) => val ? `Seat ${idx + 1}` : null).filter(Boolean);
        setSeatMovie(selectedSeats.join(", "));
        setProceed(true);
    }
    const toastHandle = async () => {
        const bookingdata = {
            movieTitle: movie?.title || "Unknown",
            movieDate: movieDate || "Not selected",
            movieSeat: seatMovie, // ← now it's an array
            TotalSeat: totalBook,
            MoviePrice: totalBook * 200,
            movieImage:movie?.image || "No image available"
    };
    try {
        const response = await fetch("http://localhost:8000/book", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookingdata)
        });

        const data = await response.json();
        console.log(data);
        toast.success("Booked Successfully");
    } catch (error) {
        console.error(error);
        toast.error("Booking Failed");
    }
};


console.log("Movie Date:", movieDate);

return (
    <>
        <div className='movie-page'>
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

            <div className="seat-select">
                <h1 className="select-head">Select Your Seat</h1>
                <div className="screen"></div>
                <h5 className="screen-side">SCREEN SIDE</h5>
            </div>

            <div className="Seat-booking">
                <div className="seat-time">
                    <h4 className="time0">Available Timings</h4>
                    <h5 className="time1">⏰ 02:30 PM</h5>
                    <h5 className="time2">⏰ 05:30 PM</h5>
                </div>
            </div>

            <div className="seat-num">
                <button className="seat-name" value="A1" onClick={(e) => handle(e, 0)} style={{ backgroundColor: active[0] ? (proceed ? buttonColor : "black") : "#ff4081" }}>A1</button>
                <button className="seat-name" value="A2" onClick={(e) => handle(e, 1)} style={{ backgroundColor: active[1] ? (proceed ? buttonColor : "black") : "#ff4081" }}>A2</button>
                <button className="seat-name" value="A3" onClick={(e) => handle(e, 2)} style={{ backgroundColor: active[2] ? (proceed ? buttonColor : "black") : "#ff4081" }}>A3</button>
                <button className="seat-name" value="A4" onClick={(e) => handle(e, 3)} style={{ backgroundColor: active[3] ? (proceed ? buttonColor : "black") : "#ff4081" }}>A4</button>
                <button className="seat-name" value="A5" onClick={(e) => handle(e, 4)} style={{ backgroundColor: active[4] ? (proceed ? buttonColor : "black") : "#ff4081" }}>A5</button>
                <button className="seat-name" value="A6" onClick={(e) => handle(e, 5)} style={{ backgroundColor: active[5] ? (proceed ? buttonColor : "black") : "#ff4081" }}>A6</button>
                <button className="seat-name" value="A7" onClick={(e) => handle(e, 6)} style={{ backgroundColor: active[6] ? (proceed ? buttonColor : "black") : "#ff4081" }}>A7</button>
                <button className="seat-name" value="A8" onClick={(e) => handle(e, 7)} style={{ backgroundColor: active[7] ? (proceed ? buttonColor : "black") : "#ff4081" }}>A8</button>
                <button className="seat-name" value="A9" onClick={(e) => handle(e, 8)} style={{ backgroundColor: active[8] ? (proceed ? buttonColor : "black") : "#ff4081" }}>A9</button>
                <button className="seat-name" value="A10" onClick={(e) => handle(e, 9)} style={{ backgroundColor: active[9] ? (proceed ? buttonColor : "black") : "#ff4081" }}>A10</button>
                <button className="seat-name" value="A11" onClick={(e) => handle(e, 10)} style={{ backgroundColor: active[10] ? (proceed ? buttonColor : "black") : "#ff4081" }}>A11</button>
                <button className="seat-name" value="B1" onClick={(e) => handle(e, 11)} style={{ backgroundColor: active[11] ? (proceed ? buttonColor : "black") : "#ff4081" }}>B1</button>
                <button className="seat-name" value="B2" onClick={(e) => handle(e, 12)} style={{ backgroundColor: active[12] ? (proceed ? buttonColor : "black") : "#ff4081" }}>B2</button>
                <button className="seat-name" value="B3" onClick={(e) => handle(e, 13)} style={{ backgroundColor: active[13] ? (proceed ? buttonColor : "black") : "#ff4081" }}>B3</button>
                <button className="seat-name" value="B4" onClick={(e) => handle(e, 14)} style={{ backgroundColor: active[14] ? (proceed ? buttonColor : "black") : "#ff4081" }}>B4</button>
                <button className="seat-name" value="B5" onClick={(e) => handle(e, 15)} style={{ backgroundColor: active[15] ? (proceed ? buttonColor : "black") : "#ff4081" }}>B5</button>
                <button className="seat-name" value="B6" onClick={(e) => handle(e, 16)} style={{ backgroundColor: active[16] ? (proceed ? buttonColor : "black") : "#ff4081" }}>B6</button>
                <button className="seat-name" value="B7" onClick={(e) => handle(e, 17)} style={{ backgroundColor: active[17] ? (proceed ? buttonColor : "black") : "#ff4081" }}>B7</button>
                <button className="seat-name" value="B8" onClick={(e) => handle(e, 18)} style={{ backgroundColor: active[18] ? (proceed ? buttonColor : "black") : "#ff4081" }}>B8</button>
                <button className="seat-name" value="B9" onClick={(e) => handle(e, 19)} style={{ backgroundColor: active[19] ? (proceed ? buttonColor : "black") : "#ff4081" }}>B9</button>
                <button className="seat-name" value="B10" onClick={(e) => handle(e, 20)} style={{ backgroundColor: active[20] ? (proceed ? buttonColor : "black") : "#ff4081" }}>B10</button>
                <button className="seat-name" value="B11" onClick={(e) => handle(e, 21)} style={{ backgroundColor: active[21] ? (proceed ? buttonColor : "black") : "#ff4081" }}>B11</button>
            </div>

            <div className="seat-num1">
                <button className="seat-name1" value="c1" onClick={(e) => handle(e, 22)} style={{ backgroundColor: active[22] ? (proceed ? buttonColor : "black") : "#ff4081" }}>c1</button>
                <button className="seat-name1" value="c2" onClick={(e) => handle(e, 23)} style={{ backgroundColor: active[23] ? (proceed ? buttonColor : "black") : "#ff4081" }}>c2</button>
                <button className="seat-name1" value="c3" onClick={(e) => handle(e, 24)} style={{ backgroundColor: active[24] ? (proceed ? buttonColor : "black") : "#ff4081" }}>c3</button>
                <button className="seat-name1" value="c4" onClick={(e) => handle(e, 25)} style={{ backgroundColor: active[25] ? (proceed ? buttonColor : "black") : "#ff4081" }}>c4</button>
                <button className="seat-name1" value="c5" onClick={(e) => handle(e, 26)} style={{ backgroundColor: active[26] ? (proceed ? buttonColor : "black") : "#ff4081" }}>c5</button>
                <button className="seat-name1" value="c6" onClick={(e) => handle(e, 27)} style={{ backgroundColor: active[27] ? (proceed ? buttonColor : "black") : "#ff4081" }}>c6</button>
                <button className="seat-name1" value="c7" onClick={(e) => handle(e, 28)} style={{ backgroundColor: active[28] ? (proceed ? buttonColor : "black") : "#ff4081" }}>c7</button>
                <button className="seat-name1" value="c8" onClick={(e) => handle(e, 29)} style={{ backgroundColor: active[29] ? (proceed ? buttonColor : "black") : "#ff4081" }}>c8</button>
                <button className="seat-name1" value="c9" onClick={(e) => handle(e, 30)} style={{ backgroundColor: active[30] ? (proceed ? buttonColor : "black") : "#ff4081" }}>c9</button>
                <button className="seat-name1" value="c10" onClick={(e) => handle(e, 31)} style={{ backgroundColor: active[31] ? (proceed ? buttonColor : "black") : "#ff4081" }}>c10</button>
                <button className="seat-name1" value="c11" onClick={(e) => handle(e, 32)} style={{ backgroundColor: active[32] ? (proceed ? buttonColor : "black") : "#ff4081" }}>c11</button>
                <button className="seat-name1" value="d1" onClick={(e) => handle(e, 33)} style={{ backgroundColor: active[33] ? (proceed ? buttonColor : "black") : "#ff4081" }}>d1</button>
                <button className="seat-name1" value="d2" onClick={(e) => handle(e, 34)} style={{ backgroundColor: active[34] ? (proceed ? buttonColor : "black") : "#ff4081" }}>d2</button>
                <button className="seat-name1" value="d3" onClick={(e) => handle(e, 35)} style={{ backgroundColor: active[35] ? (proceed ? buttonColor : "black") : "#ff4081" }}>d3</button>
                <button className="seat-name1" value="d4" onClick={(e) => handle(e, 36)} style={{ backgroundColor: active[36] ? (proceed ? buttonColor : "black") : "#ff4081" }}>d4</button>
                <button className="seat-name1" value="d5" onClick={(e) => handle(e, 37)} style={{ backgroundColor: active[37] ? (proceed ? buttonColor : "black") : "#ff4081" }}>d5</button>
                <button className="seat-name1" value="d6" onClick={(e) => handle(e, 38)} style={{ backgroundColor: active[38] ? (proceed ? buttonColor : "black") : "#ff4081" }}>d6</button>
                <button className="seat-name1" value="d7" onClick={(e) => handle(e, 39)} style={{ backgroundColor: active[39] ? (proceed ? buttonColor : "black") : "#ff4081" }}>d7</button>
                <button className="seat-name1" value="d8" onClick={(e) => handle(e, 40)} style={{ backgroundColor: active[40] ? (proceed ? buttonColor : "black") : "#ff4081" }}>d8</button>
                <button className="seat-name1" value="d9" onClick={(e) => handle(e, 41)} style={{ backgroundColor: active[41] ? (proceed ? buttonColor : "black") : "#ff4081" }}>d9</button>
                <button className="seat-name1" value="d10" onClick={(e) => handle(e, 42)} style={{ backgroundColor: active[42] ? (proceed ? buttonColor : "black") : "#ff4081" }}>d10</button>
                <button className="seat-name1" value="d11" onClick={(e) => handle(e, 43)} style={{ backgroundColor: active[43] ? (proceed ? buttonColor : "black") : "#ff4081" }}>d11</button>
            </div>
            <div className="seat-num2">
                <button className="seat-name2" value="e1" onClick={(e) => handle(e, 44)} style={{ backgroundColor: active[44] ? (proceed ? buttonColor : "black") : "#ff4081" }}>e1</button>
                <button className="seat-name2" value="e2" onClick={(e) => handle(e, 45)} style={{ backgroundColor: active[45] ? (proceed ? buttonColor : "black") : "#ff4081" }}>e2</button>
                <button className="seat-name2" value="e3" onClick={(e) => handle(e, 46)} style={{ backgroundColor: active[46] ? (proceed ? buttonColor : "black") : "#ff4081" }}>e3</button>
                <button className="seat-name2" value="e4" onClick={(e) => handle(e, 47)} style={{ backgroundColor: active[47] ? (proceed ? buttonColor : "black") : "#ff4081" }}>e4</button>
                <button className="seat-name2" value="e5" onClick={(e) => handle(e, 48)} style={{ backgroundColor: active[48] ? (proceed ? buttonColor : "black") : "#ff4081" }}>e5</button>
                <button className="seat-name2" value="e6" onClick={(e) => handle(e, 49)} style={{ backgroundColor: active[49] ? (proceed ? buttonColor : "black") : "#ff4081" }}>e6</button>
                <button className="seat-name2" value="e7" onClick={(e) => handle(e, 50)} style={{ backgroundColor: active[50] ? (proceed ? buttonColor : "black") : "#ff4081" }}>e7</button>
                <button className="seat-name2" value="e8" onClick={(e) => handle(e, 51)} style={{ backgroundColor: active[51] ? (proceed ? buttonColor : "black") : "#ff4081" }}>e8</button>
                <button className="seat-name2" value="e9" onClick={(e) => handle(e, 52)} style={{ backgroundColor: active[52] ? (proceed ? buttonColor : "black") : "#ff4081" }}>e9</button>
                <button className="seat-name2" value="e10" onClick={(e) => handle(e, 53)} style={{ backgroundColor: active[53] ? (proceed ? buttonColor : "black") : "#ff4081" }}>e10</button>
                <button className="seat-name2" value="e11" onClick={(e) => handle(e, 54)} style={{ backgroundColor: active[54] ? (proceed ? buttonColor : "black") : "#ff4081" }}>e11</button>
                <button className="seat-name2" value="f1" onClick={(e) => handle(e, 55)} style={{ backgroundColor: active[55] ? (proceed ? buttonColor : "black") : "#ff4081" }}>f1</button>
                <button className="seat-name2" value="f2" onClick={(e) => handle(e, 56)} style={{ backgroundColor: active[56] ? (proceed ? buttonColor : "black") : "#ff4081" }}>f2</button>
                <button className="seat-name2" value="f3" onClick={(e) => handle(e, 57)} style={{ backgroundColor: active[57] ? (proceed ? buttonColor : "black") : "#ff4081" }}>f3</button>
                <button className="seat-name2" value="f4" onClick={(e) => handle(e, 58)} style={{ backgroundColor: active[58] ? (proceed ? buttonColor : "black") : "#ff4081" }}>f4</button>
                <button className="seat-name2" value="f5" onClick={(e) => handle(e, 59)} style={{ backgroundColor: active[59] ? (proceed ? buttonColor : "black") : "#ff4081" }}>f5</button>
                <button className="seat-name2" value="f6" onClick={(e) => handle(e, 60)} style={{ backgroundColor: active[60] ? (proceed ? buttonColor : "black") : "#ff4081" }}>f6</button>
                <button className="seat-name2" value="f7" onClick={(e) => handle(e, 61)} style={{ backgroundColor: active[61] ? (proceed ? buttonColor : "black") : "#ff4081" }}>f7</button>
                <button className="seat-name2" value="f8" onClick={(e) => handle(e, 62)} style={{ backgroundColor: active[62] ? (proceed ? buttonColor : "black") : "#ff4081" }}>f8</button>
                <button className="seat-name2" value="f9" onClick={(e) => handle(e, 63)} style={{ backgroundColor: active[63] ? (proceed ? buttonColor : "black") : "#ff4081" }}>f9</button>
                <button className="seat-name2" value="f10" onClick={(e) => handle(e, 64)} style={{ backgroundColor: active[64] ? (proceed ? buttonColor : "black") : "#ff4081" }}>f10</button>
                <button className="seat-name2" value="f11" onClick={(e) => handle(e, 65)} style={{ backgroundColor: active[65] ? (proceed ? buttonColor : "black") : "#ff4081" }}>f11</button>
            </div>
            <div className="seat-num3">
                <button className="seat-name3" value="g1" onClick={(e) => handle(e, 66)} style={{ backgroundColor: active[66] ? (proceed ? buttonColor : "black") : "#ff4081" }}>g1</button>
                <button className="seat-name3" value="g2" onClick={(e) => handle(e, 67)} style={{ backgroundColor: active[67] ? (proceed ? buttonColor : "black") : "#ff4081" }}>g2</button>
                <button className="seat-name3" value="g3" onClick={(e) => handle(e, 68)} style={{ backgroundColor: active[68] ? (proceed ? buttonColor : "black") : "#ff4081" }}>g3</button>
                <button className="seat-name3" value="g4" onClick={(e) => handle(e, 69)} style={{ backgroundColor: active[69] ? (proceed ? buttonColor : "black") : "#ff4081" }}>g4</button>
                <button className="seat-name3" value="g5" onClick={(e) => handle(e, 70)} style={{ backgroundColor: active[70] ? (proceed ? buttonColor : "black") : "#ff4081" }}>g5</button>
                <button className="seat-name3" value="g6" onClick={(e) => handle(e, 71)} style={{ backgroundColor: active[71] ? (proceed ? buttonColor : "black") : "#ff4081" }}>g6</button>
                <button className="seat-name3" value="g7" onClick={(e) => handle(e, 72)} style={{ backgroundColor: active[72] ? (proceed ? buttonColor : "black") : "#ff4081" }}>g7</button>
                <button className="seat-name3" value="g8" onClick={(e) => handle(e, 73)} style={{ backgroundColor: active[73] ? (proceed ? buttonColor : "black") : "#ff4081" }}>g8</button>
                <button className="seat-name3" value="g9" onClick={(e) => handle(e, 74)} style={{ backgroundColor: active[74] ? (proceed ? buttonColor : "black") : "#ff4081" }}>g9</button>
                <button className="seat-name3" value="g10" onClick={(e) => handle(e, 75)} style={{ backgroundColor: active[75] ? (proceed ? buttonColor : "black") : "#ff4081" }}>g10</button>
                <button className="seat-name3" value="g11" onClick={(e) => handle(e, 76)} style={{ backgroundColor: active[76] ? (proceed ? buttonColor : "black") : "#ff4081" }}>g11</button>
                <button className="seat-name3" value="h1" onClick={(e) => handle(e, 77)} style={{ backgroundColor: active[77] ? (proceed ? buttonColor : "black") : "#ff4081" }}>h1</button>
                <button className="seat-name3" value="h2" onClick={(e) => handle(e, 78)} style={{ backgroundColor: active[78] ? (proceed ? buttonColor : "black") : "#ff4081" }}>h2</button>
                <button className="seat-name3" value="h3" onClick={(e) => handle(e, 79)} style={{ backgroundColor: active[79] ? (proceed ? buttonColor : "black") : "#ff4081" }}>h3</button>
                <button className="seat-name3" value="h4" onClick={(e) => handle(e, 80)} style={{ backgroundColor: active[80] ? (proceed ? buttonColor : "black") : "#ff4081" }}>h4</button>
                <button className="seat-name3" value="h5" onClick={(e) => handle(e, 81)} style={{ backgroundColor: active[81] ? (proceed ? buttonColor : "black") : "#ff4081" }}>h5</button>
                <button className="seat-name3" value="h6" onClick={(e) => handle(e, 82)} style={{ backgroundColor: active[82] ? (proceed ? buttonColor : "black") : "#ff4081" }}>h6</button>
                <button className="seat-name3" value="h7" onClick={(e) => handle(e, 83)} style={{ backgroundColor: active[83] ? (proceed ? buttonColor : "black") : "#ff4081" }}>h7</button>
                <button className="seat-name3" value="h8" onClick={(e) => handle(e, 84)} style={{ backgroundColor: active[84] ? (proceed ? buttonColor : "black") : "#ff4081" }}>h8</button>
                <button className="seat-name3" value="h9" onClick={(e) => handle(e, 85)} style={{ backgroundColor: active[85] ? (proceed ? buttonColor : "black") : "#ff4081" }}>h9</button>
                <button className="seat-name3" value="h10" onClick={(e) => handle(e, 86)} style={{ backgroundColor: active[86] ? (proceed ? buttonColor : "black") : "#ff4081" }}>h10</button>
                <button className="seat-name3" value="h11" onClick={(e) => handle(e, 87)} style={{ backgroundColor: active[87] ? (proceed ? buttonColor : "black") : "#ff4081" }}>h11</button>
            </div>
            <div className="seat-num4">
                <button className="seat-name4" value="i1" onClick={(e) => handle(e, 88)} style={{ backgroundColor: active[88] ? (proceed ? buttonColor : "black") : "#ff4081" }}>i1</button>
                <button className="seat-name4" value="i2" onClick={(e) => handle(e, 89)} style={{ backgroundColor: active[89] ? (proceed ? buttonColor : "black") : "#ff4081" }}>i2</button>
                <button className="seat-name4" value="i3" onClick={(e) => handle(e, 90)} style={{ backgroundColor: active[90] ? (proceed ? buttonColor : "black") : "#ff4081" }}>i3</button>
                <button className="seat-name4" value="i4" onClick={(e) => handle(e, 91)} style={{ backgroundColor: active[91] ? (proceed ? buttonColor : "black") : "#ff4081" }}>i4</button>
                <button className="seat-name4" value="i5" onClick={(e) => handle(e, 92)} style={{ backgroundColor: active[92] ? (proceed ? buttonColor : "black") : "#ff4081" }}>i5</button>
                <button className="seat-name4" value="i6" onClick={(e) => handle(e, 93)} style={{ backgroundColor: active[93] ? (proceed ? buttonColor : "black") : "#ff4081" }}>i6</button>
                <button className="seat-name4" value="i7" onClick={(e) => handle(e, 94)} style={{ backgroundColor: active[94] ? (proceed ? buttonColor : "black") : "#ff4081" }}>i7</button>
                <button className="seat-name4" value="i8" onClick={(e) => handle(e, 95)} style={{ backgroundColor: active[95] ? (proceed ? buttonColor : "black") : "#ff4081" }}>i8</button>
                <button className="seat-name4" value="i9" onClick={(e) => handle(e, 96)} style={{ backgroundColor: active[96] ? (proceed ? buttonColor : "black") : "#ff4081" }}>i9</button>
                <button className="seat-name4" value="i10" onClick={(e) => handle(e, 97)} style={{ backgroundColor: active[97] ? (proceed ? buttonColor : "black") : "#ff4081" }}>i10</button>
                <button className="seat-name4" value="i11" onClick={(e) => handle(e, 98)} style={{ backgroundColor: active[98] ? (proceed ? buttonColor : "black") : "#ff4081" }}>i11</button>
                <button className="seat-name4" value="j1" onClick={(e) => handle(e, 99)} style={{ backgroundColor: active[99] ? (proceed ? buttonColor : "black") : "#ff4081" }}>j1</button>
                <button className="seat-name4" value="j2" onClick={(e) => handle(e, 100)} style={{ backgroundColor: active[100] ? (proceed ? buttonColor : "black") : "#ff4081" }}>j2</button>
                <button className="seat-name4" value="j3" onClick={(e) => handle(e, 101)} style={{ backgroundColor: active[101] ? (proceed ? buttonColor : "black") : "#ff4081" }}>j3</button>
                <button className="seat-name4" value="j4" onClick={(e) => handle(e, 102)} style={{ backgroundColor: active[102] ? (proceed ? buttonColor : "black") : "#ff4081" }}>j4</button>
                <button className="seat-name4" value="j5" onClick={(e) => handle(e, 103)} style={{ backgroundColor: active[103] ? (proceed ? buttonColor : "black") : "#ff4081" }}>j5</button>
                <button className="seat-name4" value="j6" onClick={(e) => handle(e, 104)} style={{ backgroundColor: active[104] ? (proceed ? buttonColor : "black") : "#ff4081" }}>j6</button>
                <button className="seat-name4" value="j7" onClick={(e) => handle(e, 105)} style={{ backgroundColor: active[105] ? (proceed ? buttonColor : "black") : "#ff4081" }}>j7</button>
                <button className="seat-name4" value="j8" onClick={(e) => handle(e, 106)} style={{ backgroundColor: active[106] ? (proceed ? buttonColor : "black") : "#ff4081" }}>j8</button>
                <button className="seat-name4" value="j9" onClick={(e) => handle(e, 107)} style={{ backgroundColor: active[107] ? (proceed ? buttonColor : "black") : "#ff4081" }}>j9</button>
                <button className="seat-name4" value="j10" onClick={(e) => handle(e, 108)} style={{ backgroundColor: active[108] ? (proceed ? buttonColor : "black") : "#ff4081" }}>j10</button>
                <button className="seat-name4" value="j11" onClick={(e) => handle(e, 109)} style={{ backgroundColor: active[109] ? (proceed ? buttonColor : "black") : "#ff4081" }}>j11</button>
            </div>



            <button className="proceed" data-bs-toggle="modal" data-bs-target="#paymentModal" onClick={last}>Procees To CheckOut</button>
        </div>
        <div className='modal' tabIndex="-1" id="paymentModal" >
            <div className='modal-dialog' style={{ marginTop: "150px" }}>
                <div className='modal-content'>
                    <div className="modal-header">
                        <h5 className='modal-title' >Payment</h5>
                        <button type='button' className='btn-close' data-bs-dismiss="modal"> X </button>
                    </div>
                    <div className="modal-body">
                        <p>Movie Title: {movie ? movie.title : "Loading..."}</p>
                        <p>Movie Date: {movie ? movie.releaseDate : "Loading..."}</p>
                        <p>Movie Timing: {movieDate ? movieDate : "Loading..."}</p>
                        <p>Movie Seat: {seatMovie ? seatMovie : "Loading..."}</p>
                        <p>Total Members: {totalBook ? totalBook : "Loading..."}</p>
                        <p>Total Price: {totalBook ? totalBook * 200 : "Loading..."}</p>
                    </div>
                    <div className='modal-footer'>
                        <button type='button' className='btn btn-primary' onClick={toastHandle} >Pay</button>
                        <button type='button' className='btn btn-secondary' data-bs-dismiss="modal">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    </>
);
}

export default SeatBooking;
