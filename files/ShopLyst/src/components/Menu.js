import { Link } from "react-router-dom";

function Navbar({ setSearch }) {
  return (
    <nav className="navbar">
      <div className="logo">Shoplyst</div>

      <input
        type="text"
        placeholder="Search products..."
        className="search"
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>
      </div>
    </nav>
  );
}

export default Navbar;