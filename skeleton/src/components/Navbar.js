import { Link } from "react-router-dom";
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>test</h1>
      <div className="links">
        <Link to="/search">Search</Link>
        <Link to="/">Logout</Link>
        <Link to="/profile/">Profile</Link>
      </div>
    </nav>
  );
}
 
export default Navbar;