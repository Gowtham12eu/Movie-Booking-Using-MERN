
import { useUser } from '@clerk/clerk-react';
import MovieShow from './MovieShow';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton
} from '@clerk/clerk-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Mains = () => {
  const { user } = useUser();
  const [signups, setSignups] = useState([]);

  const loginData = {
    EmailAddress: user?.emailAddresses[0]?.emailAddress,
    FirstName: user?.firstName,
    LastName: user?.lastName,
    ClerkUserId: user?.id
  };

  console.log('userInfo:', loginData);


  useEffect(() => {
    if (user) {
      fetch('http://localhost:8000/api/v1/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      })
        .then(res => res.json())
        .then(data => console.log('Backend response:', data))
        .catch(err => console.error('Fetch error:', err));
    }
  }, [user?.id]);
  const navigate = useNavigate();

  return (
    <>
      <div
        className="body-img"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/Images/flipped_guardians.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          height: '100vh',
          width: '100vw',
          color: 'white',
          fontFamily: 'Arial, sans-serif',
          overflow: 'auto',
        }}

      >
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
                  <UserButton.Action
                    label="Liked Movie"
                    labelIcon={<i className="fa-solid fa-book" style={{ fontSize: '15px' }}></i>}
                    onClick={() => navigate('/heart')}
                  />
                </UserButton.MenuItems>
              </UserButton >
            </SignedIn>
          </div>
        </div>

        <div className="info">
          <h2 className="info-head">MARVEL</h2>
          <h2 className="info-stu">STUDIOS</h2>
          <h1 className="info-sub">Guardians</h1>
          <h1 className="info-sub1">of the Galaxy</h1>
          <h5 className="info-time">
            Action | Adventure | Sci-Fi 🗓️ ⏰ 2h 8m
          </h5>
          <h5 className="info-pa">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. <br />
            Deserunt itaque in aspernatur voluptates repudiandae <br />
            inventore harum consequatur voluptatibus sit voluptas.
          </h5>
          <button className="info-btn">Explore Movies</button>


        </div>
      </div>
      <MovieShow />
    </>
  );
};

export default Mains;
