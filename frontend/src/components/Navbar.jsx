import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaTasks, FaUser, FaSignOutAlt, FaChartLine, FaHome } from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <Link to="/" className="navbar-brand">
          <FaTasks className="navbar-icon" />
          <span>TaskFlow</span>
        </Link>

        <div className="navbar-menu">
          {user ? (
            <>
              <Link to="/dashboard" className="navbar-link">
                <FaHome /> Dashboard
              </Link>
              <Link to="/analytics" className="navbar-link">
                <FaChartLine /> Analytics
              </Link>
              <Link to="/profile" className="navbar-link">
                <FaUser /> Profile
              </Link>
              <ThemeToggle />
              <button onClick={logout} className="navbar-link navbar-btn">
                <FaSignOutAlt /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-link">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm">
                Get Started
              </Link>
              <ThemeToggle />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
