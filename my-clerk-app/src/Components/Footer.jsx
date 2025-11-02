function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">

           <h1><span className="main-single" style={{fontSize:'40px'}}>Q</span>uickShow</h1>
          <p>Your gateway to the latest movie trailers and entertainment buzz.</p>
        </div>

        <div className="footer-links">
          <h4>Explore</h4>
          <ul>
            <li><a href="/trailers">Trailers</a></li>
            <li><a href="/genres">Genres</a></li>
            <li><a href="/top-rated">Top Rated</a></li>
            <li><a href="/new-releases">New Releases</a></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h4>Contact</h4>
          <p>Email: support@cinestream.com</p>
          <p>Phone: +91 98765 43210</p>
          <p>Location: Coimbatore, Tamil Nadu</p>
        </div>

        <div className="footer-newsletter">
          <h4>Subscribe</h4>
          <p>Get weekly updates on new trailers and movie news.</p>
          <button>Subscribe</button>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} QuickShow. All rights reserved.</p>
        <div className="footer-social">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
