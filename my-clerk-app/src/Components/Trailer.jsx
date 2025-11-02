import { useEffect, useState } from "react";
import Footer from "./Footer";

function Trailer() {
  const [trailerDatas, setTrailerDatas] = useState([]);
  const [selectedTrailer, setSelectedTrailer] = useState(null);
  // Static YouTube trailer URLs
  const trailerLinks = [
    "https://www.youtube.com/embed/nb_fFj_0rq8", 
    "https://www.youtube.com/embed/x_v9XHfNYnA", 
    "https://www.youtube.com/embed/NL-rJyiTpD8", 
    "https://www.youtube.com/embed/bDkZ_pnaSik", 
    "https://www.youtube.com/embed/U4c8e2avP8k", 
    "https://www.youtube.com/embed/-0cDU9W7dPE", 
    "https://www.youtube.com/embed/ee9i6oMqShk", 
    "https://www.youtube.com/embed/NAnSilYNysc", 
    "https://www.youtube.com/embed/oX47RtaGN_A", 
    "https://www.youtube.com/embed/BlcaF4EvKTo",
    "https://www.youtube.com/embed/Du481sOHopU", 
  ];

  useEffect(() => {
    const fetchTrailers = async () => {
      try {
        const response = await fetch(
          "https://api.kinocheck.com/trailers/trending?language=en"
        );
        const result = await response.json();
        setTrailerDatas(Object.values(result));
      } catch (error) {
        console.error("Failed to fetch trailers:", error);
      }
    };

    fetchTrailers();
  }, []);


  const iframeStyle = {
    boxShadow:
      "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, " +
      "rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, " +
      "rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, " +
      "rgba(0, 0, 0, 0.06) 0px 2px 1px, " +
      "rgba(0, 0, 0, 0.09) 0px 4px 2px, " +
      "rgba(0, 0, 0, 0.09) 0px 8px 4px, " +
      "rgba(0, 0, 0, 0.09) 0px 16px 8px, " +
      "rgba(0, 0, 0, 0.09) 0px 32px 16px"
  };

  return (
    <>
      <div className="trailer-main">
        <h1 className="trailer-head">Trailer</h1>

        {/* 🎬 Main Trailer Display */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <iframe
            width="700"
            height="515"
            src={
              selectedTrailer
                ? trailerLinks[selectedTrailer]
                : "https://www.youtube.com/embed/TcMBFSGVi1c" // Default: Endgame
            }
            title="Movie Trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            style={iframeStyle}
          ></iframe>
        </div>

        {/* 🎞️ Sub Trailers Thumbnails */}
        <div className="sub-trailer-wrapper">
          {trailerDatas.map((item, index) => (
            <div
              className="sub-trailer"
              key={index}
              onClick={() => setSelectedTrailer(index)}
            >
              <img
                src={item.youtube_thumbnail}
                alt={item.title}
                width="200"
                height="105"
                style={{
                  borderRadius: "8px",
                  boxShadow: iframeStyle.boxShadow,
                  objectFit: "cover",
                  cursor: "pointer",
                }}
              />
              <p>{item.title}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Trailer;
