import logo from "../img/logo.png";
import { useHistory, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {
  return (
    <div className="body">
      <div className="header">
        <img src={logo} alt="" />
        <div>
          <Link className="headerButtons" to="/characters">
            Hereos
          </Link>
          <Link className="headerButtons" to="/comics">
            Comics
          </Link>
          <Link className="headerButtons" to="/favorites">
            Favorites
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
