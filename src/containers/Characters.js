import axios from "axios";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";

function Characters({ favPerso, setFavPerso }) {
  const history = useHistory();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [counter, setCounter] = useState(0);

  const [name, setName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(
        `https://marvel-backend123.herokuapp.com/characters?name=${name}`
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
          `https://marvel-backend123.herokuapp.com/characters?name`
        );
        //console.log(response.data);
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
        <div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Hero"
              onChange={(event) => setName(event.target.value)}
            />
            <button type="submit">Find Your Hero</button>
          </form>
        </div>
      </div>
      <div className="charac">
        {data.results.map((charac, index) => {
          return (
            <div className="unit" key={index}>
              <h2>{charac.name}</h2>
              <img
                src={charac.thumbnail.path + "." + charac.thumbnail.extension}
                alt="characPhoto"
              />

              <p>{charac.description}</p>

              <button
                onClick={() => {
                  const characterId = charac._id;
                  history.push(`/comics/${characterId}`);
                }}
              >
                Comics with {charac.name}
              </button>
              <button
                onClick={() => {
                  if (favPerso.indexOf(charac) === -1) {
                    let newTab = [...favPerso];
                    newTab.push(charac);
                    setFavPerso(newTab);
                    Cookies.set("favPerso", favPerso, {
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
      <br />
      <div className="pagination">
        {counter > 0 && (
          <button
            onClick={async () => {
              if (name) {
                const response = await axios.get(
                  `https://marvel-backend123.herokuapp.com/characters?name=${name}&skip=${
                    counter - 100
                  }`
                );
                setCounter(counter - 100);
                console.log(response.data);
                setData(response.data);
              } else {
                const response = await axios.get(
                  `https://marvel-backend123.herokuapp.com/characters?skip=${
                    counter - 100
                  }`
                );
                setCounter(counter - 100);
                console.log(response.data);
                setData(response.data);
              }
            }}
          >
            Page Précédente
          </button>
        )}

        <button
          onClick={async () => {
            const response = await axios.get(
              `https://marvel-backend123.herokuapp.com/characters?name=${name}&skip=${
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

export default Characters;
