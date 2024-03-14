import { Link } from "react-router-dom";
import './Navbar.css';

const Navbar = ({userId}) => {
  return (
    <nav className="navbar">
      <h1>Jukeboxd!</h1>
      <div className="links">
        <Link to={`/user-page/${userId}`}>Home</Link>
        <Link to="/search">Search</Link>
        <Link to="/">Logout</Link>
      </div>
    </nav>
  );
}
 
export default Navbar;