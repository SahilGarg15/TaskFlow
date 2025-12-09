import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../utils/api';
import { useAuth } from './AuthContext';

const TaskContext = createContext();

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within TaskProvider');
  }
  return context;
};

export const TaskProvider = ({ children }) => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState(null);
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    search: ''
  });

  useEffect(() => {
    if (user) {
      fetchTasks();
      fetchStats();
    }
  }, [user, filters]);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.status) params.append('status', filters.status);
      if (filters.priority) params.append('priority', filters.priority);
      if (filters.search) params.append('search', filters.search);

      const { data } = await api.get(`/tasks?${params.toString()}`);
      setTasks(data.data);
    } catch (error) {
      console.error('Fetch tasks error:', error);
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const { data } = await api.get('/tasks/stats');
      setStats(data.data);
    } catch (error) {
      console.error('Fetch stats error:', error);
    }
  };

  const createTask = async (taskData) => {
    try {
      const { data } = await api.post('/tasks', taskData);
      setTasks([data.data, ...tasks]);
      toast.success('Task created successfully!');
      fetchStats();
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to create task';
      toast.error(message);
      throw error;
    }
  };

  const updateTask = async (id, taskData) => {
    try {
      const { data } = await api.put(`/tasks/${id}`, taskData);
      setTasks(tasks.map((task) => (task._id === id ? data.data : task)));
      toast.success('Task updated successfully!');
      fetchStats();
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update task';
      toast.error(message);
      throw error;
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
      toast.success('Task deleted successfully!');
      fetchStats();
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to delete task';
      toast.error(message);
      throw error;
    }
  };

  const value = {
    tasks,
    loading,
    stats,
    filters,
    setFilters,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
