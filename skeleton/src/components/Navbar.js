import { Link } from "react-router-dom";
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>test</h1>
      <div className="links">
        <Link to="/user-page">Home</Link>
        <Link to="/search">Search</Link>
        <Link to="/">Logout</Link>
      </div>
    </nav>
  );
}
 
export default Navbar;