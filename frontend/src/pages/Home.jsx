import { Link } from 'react-router-dom';
import { FaTasks, FaCheckCircle, FaRocket, FaChartLine, FaBell, FaUsers } from 'react-icons/fa';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <div className="hero">
        <div className="container hero-content">
          <h1 className="hero-title">Transform Your Productivity with TaskFlow</h1>
          <p className="hero-subtitle">
            The ultimate task management platform designed for modern teams and individuals.
            Organize, prioritize, and achieve your goals with powerful features and beautiful design.
          </p>
          <div className="hero-actions">
            <Link to="/register" className="btn btn-primary btn-lg">
              Start Free Trial
            </Link>
            <Link to="/login" className="btn btn-outline btn-lg">
              Sign In
            </Link>
          </div>
        </div>
      </div>

      <div className="features">
        <div className="container">
          <h2 className="features-title">Powerful Features for Maximum Productivity</h2>
          <p className="features-subtitle">
            Everything you need to manage tasks effectively in one place
          </p>
          <div className="features-grid">
            <div className="feature-card">
              <FaTasks className="feature-icon" />
              <h3>Smart Task Management</h3>
              <p>Create, organize, and track tasks with intelligent categorization and priority levels.</p>
            </div>
            <div className="feature-card">
              <FaCheckCircle className="feature-icon" />
              <h3>Progress Tracking</h3>
              <p>Real-time statistics and insights to monitor your productivity and achievements.</p>
            </div>
            <div className="feature-card">
              <FaRocket className="feature-icon" />
              <h3>Boost Efficiency</h3>
              <p>Advanced filtering, search, and sorting to help you focus on what matters most.</p>
            </div>
            <div className="feature-card">
              <FaChartLine className="feature-icon" />
              <h3>Analytics Dashboard</h3>
              <p>Visualize your performance with comprehensive charts and completion metrics.</p>
            </div>
            <div className="feature-card">
              <FaBell className="feature-icon" />
              <h3>Smart Notifications</h3>
              <p>Stay updated with real-time alerts and reminders for due dates and updates.</p>
            </div>
            <div className="feature-card">
              <FaUsers className="feature-icon" />
              <h3>Collaboration Ready</h3>
              <p>Built with team collaboration in mind, perfect for personal and team projects.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="stats-section">
        <div className="container">
          <h2 className="features-title" style={{ color: 'purple' }}>TaskFlow by the Numbers</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">10K+</div>
              <div className="stat-label">Active Users</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">500K+</div>
              <div className="stat-label">Tasks Completed</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">99.9%</div>
              <div className="stat-label">Uptime</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">4.9★</div>
              <div className="stat-label">User Rating</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
