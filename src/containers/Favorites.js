const Favorites = ({ favPerso, favComic }) => {
  return (
    <div className="Page">
      <div>
        <div>
          <h1>Your Favorite Comics</h1>
        </div>
        <div className="charac">
          {favComic &&
            favComic.map((comic) => {
              return (
                <div className="unit">
                  <h2>{comic.title}</h2>
                  <img src={`${comic.thumbnail.path}.jpg`} alt="" />
                </div>
              );
            })}
        </div>
      </div>
      <div>
        <div>
          <h1>Your Favorite Characters</h1>
        </div>
        <div className="charac">
          {favPerso &&
            favPerso.map((perso) => {
              return (
                <div className="unit">
                  <h2>{perso.name}</h2>
                  <img src={`${perso.thumbnail.path}.jpg`} alt="" />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
