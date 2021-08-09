import axios from "axios";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

function Comics({ favComic, setFavComic }) {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [counter, setCounter] = useState(0);
  const [title, setTitle] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(
        `https://marvel-backend123.herokuapp.com/comics?title=${title}`
      );
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://marvel-backend123.herokuapp.com/comics?title`
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <p>En cours de chargement...</p>
  ) : (
    <div className="Page">
      <div className="Pageform">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Comic Book"
            onChange={(event) => setTitle(event.target.value)}
          />
          <button type="submit">Find Your Comic Book</button>
        </form>
      </div>
      <div className="charac">
        {data.results.map((comic, index) => {
          return (
            <div className="unit" key={index} onClick={() => {}}>
              <h2>{comic.title}</h2>
              <img
                src={comic.thumbnail.path + "." + comic.thumbnail.extension}
                alt="comicPhoto"
              />

              <p>{comic.description}</p>
              <button
                onClick={() => {
                  if (favComic.indexOf(comic) === -1) {
                    let newTab = [...favComic];
                    newTab.push(comic);
                    setFavComic(newTab);
                    Cookies.set("favComic", favComic, {
                      expires: 3,
                    });
                  }
                }}
              >
                Add to your favorites
              </button>
            </div>
          );
        })}
      </div>
      <div className="pagination">
        {counter > 0 && (
          <button
            onClick={async () => {
              const response = await axios.get(
                `https://marvel-backend123.herokuapp.com/comics?title=${title}&skip=${
                  counter - 100
                }`
              );
              setCounter(counter - 100);
              console.log(response.data);
              setData(response.data);
            }}
          >
            Page Précédente
          </button>
        )}

        <button
          onClick={async () => {
            const response = await axios.get(
              `https://marvel-backend123.herokuapp.com/comics?title=${title}&skip=${
                counter + 100
              }`
            );
            setCounter(counter + 100);
            console.log(response.data);
            setData(response.data);
          }}
        >
          Page Suivante
        </button>
      </div>
    </div>
  );
}

export default Comics;
