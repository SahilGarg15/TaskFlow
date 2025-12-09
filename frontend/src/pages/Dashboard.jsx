import { useState } from 'react';
import { useTask } from '../context/TaskContext';
import { FaPlus, FaSearch, FaFilter, FaTasks, FaCheckCircle, FaClock, FaChartBar } from 'react-icons/fa';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';
import FilterBar from '../components/FilterBar';
import ExportImport from '../components/ExportImport';
import CommentSection from '../components/CommentSection';
import './Dashboard.css';

const Dashboard = () => {
  const { tasks, loading, stats, filters, setFilters, createTask, updateTask, deleteTask, fetchTasks } = useTask();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTaskForComments, setSelectedTaskForComments] = useState(null);

  const handleCreateTask = async (taskData) => {
    await createTask(taskData);
    setIsModalOpen(false);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleUpdateTask = async (taskData) => {
    await updateTask(editingTask._id, taskData);
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      await deleteTask(id);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleSearchChange = (e) => {
    setFilters({ ...filters, search: e.target.value });
  };

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <div>
            <h1>Task Dashboard</h1>
            <p style={{ color: 'var(--text-light)', marginTop: '0.5rem' }}>
              Manage and track all your tasks in one place
            </p>
          </div>
          <div className="header-actions">
            <ExportImport onImportSuccess={fetchTasks} />
            <button onClick={() => setIsModalOpen(true)} className="btn btn-primary">
              <FaPlus /> Create Task
            </button>
          </div>
        </div>

        {stats && (
          <div className="stats-grid">
            <div className="stat-card">
              <h3>Total Tasks</h3>
              <p className="stat-value">
                <FaTasks className="stat-icon" style={{ color: 'var(--primary-color)' }} />
                {stats.total}
              </p>
              <p className="stat-change">+12% from last week</p>
            </div>
            <div className="stat-card">
              <h3>Pending</h3>
              <p className="stat-value">
                <FaClock className="stat-icon stat-pending" />
                <span className="stat-pending">{stats.pending}</span>
              </p>
              <p className="stat-change">Needs attention</p>
            </div>
            <div className="stat-card">
              <h3>In Progress</h3>
              <p className="stat-value">
                <FaChartBar className="stat-icon stat-progress" />
                <span className="stat-progress">{stats['in-progress']}</span>
              </p>
              <p className="stat-change">Active right now</p>
            </div>
            <div className="stat-card">
              <h3>Completed</h3>
              <p className="stat-value">
                <FaCheckCircle className="stat-icon stat-completed" />
                <span className="stat-completed">{stats.completed}</span>
              </p>
              <p className="stat-change">Great progress!</p>
            </div>
          </div>
        )}

        <div className="filters-section">
          <FilterBar 
            onFilterChange={setFilters}
            activeFilters={filters}
          />
          <div className="search-box">
            <FaSearch />
            <input
              type="text"
              placeholder="Search tasks by title or description..."
              value={filters.search}
              onChange={handleSearchChange}
              className="search-input"
            />
          </div>
        </div>

        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading your tasks...</p>
          </div>
        ) : tasks.length === 0 ? (
          <div className="empty-state">
            <FaTasks />
            <h3>No tasks yet</h3>
            <p>Create your first task to get started on your productivity journey!</p>
          </div>
        ) : (
          <div className="tasks-grid">
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
                onOpenComments={() => setSelectedTaskForComments(task._id)}
              />
            ))}
          </div>
        )}

        {selectedTaskForComments && (
          <CommentSection 
            taskId={selectedTaskForComments}
            onClose={() => setSelectedTaskForComments(null)}
          />
        )}

        <TaskModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
          task={editingTask}
        />
      </div>
    </div>
  );
};

export default Dashboard;
