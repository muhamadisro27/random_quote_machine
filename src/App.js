import { useState, useEffect } from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function App() {
  const math_random = Math.floor(Math.random() * 16777215).toString(16);

  const [color, setColor] = useState(math_random);
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [opacity, setOpacity] = useState(0);
  const tumblr_link = `https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=${author}&content=${quote}&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button`;
  const twitter_link = `https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=%22${quote}%22%20${author}`;

  const colorStyle = {
    background: {
      backgroundColor: `#${color}`,
    },
    text: {
      color: `#${color}`,
    },
  };

  const newQuote = async () => {
    setOpacity(0);
    try {
      await axios
        .get("https://api.quotable.io/quotes/random")
        .then((response) => {
          if (response.status === 200) {
            setColor(math_random);
            setTimeout(() => {
              setOpacity(1);
              setQuote(response.data[0].content);
              setAuthor(response.data[0].author);
            }, 200);
          }
        })
        .catch((error) => console.error(error));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // const controller = new AbortController();

    return () => {
      newQuote()
    }
    // console.log(newQuote())

    // newQuote(controller);

    // return () => controller.abort();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <div id="wrapper" style={colorStyle.background}>
        <div className="box">
          <div id="quote-box" style={colorStyle.text}>
            <div style={{ opacity: opacity }} className="text-box">
              <p className="quote">
                <FontAwesomeIcon icon={faQuoteLeft} />
                &nbsp;
                <span id="text">{quote}</span>
              </p>
            </div>
            <div style={{ opacity: opacity }} className="author-box">
              <p id="author">- {author}</p>
            </div>
            <div className="button-box">
              <div className="social-box">
                <a href={twitter_link} style={colorStyle.background}>
                  <svg
                    fill="#fff"
                    xmlns="http://www.w3.org/2000/svg"
                    height="1rem"
                    viewBox="0 0 512 512"
                  >
                    <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
                  </svg>
                </a>
                <a href={tumblr_link} style={colorStyle.background}>
                  <svg
                    fill="#fff"
                    xmlns="http://www.w3.org/2000/svg"
                    height="1rem"
                    viewBox="0 0 320 512"
                  >
                    <path d="M309.8 480.3c-13.6 14.5-50 31.7-97.4 31.7-120.8 0-147-88.8-147-140.6v-144H17.9c-5.5 0-10-4.5-10-10v-68c0-7.2 4.5-13.6 11.3-16 62-21.8 81.5-76 84.3-117.1.8-11 6.5-16.3 16.1-16.3h70.9c5.5 0 10 4.5 10 10v115.2h83c5.5 0 10 4.4 10 9.9v81.7c0 5.5-4.5 10-10 10h-83.4V360c0 34.2 23.7 53.6 68 35.8 4.8-1.9 9-3.2 12.7-2.2 3.5.9 5.8 3.4 7.4 7.9l22 64.3c1.8 5 3.3 10.6-.4 14.5z" />
                  </svg>
                </a>
              </div>
              <div className="change-quote-box">
                <button
                  style={colorStyle.background}
                  id="new-quote"
                  onClick={newQuote}
                >
                  New quote
                </button>
              </div>
            </div>
          </div>
          <div className="copyright-box">
            <a href="https://github.com/muhamadisro27" className="copyright">
              by isro
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
