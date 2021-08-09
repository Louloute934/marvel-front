import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Perso() {
  const { characterId } = useParams();

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://marvel-backend123.herokuapp.com/comics/${characterId}`
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [characterId]);
  return isLoading ? (
    <p>En cours de chargement...</p>
  ) : (
    <div className="Page">
      <div>
        <h1>All the Comics with {data.name}</h1>
      </div>
      {data.comics.map((comic, index) => {
        return (
          <div className="charac">
            <div className="unit">
              <h3>{comic.title}</h3>
              <img
                src={comic.thumbnail.path + "." + comic.thumbnail.extension}
                alt=""
              />
              <p>{comic.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default Perso;
