import { useState } from 'react';
import { FaFilter, FaTimes } from 'react-icons/fa';
import './FilterBar.css';

const FilterBar = ({ onFilterChange, activeFilters }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFilterChange = (filterType, value) => {
    onFilterChange({ ...activeFilters, [filterType]: value });
  };

  const clearFilters = () => {
    onFilterChange({
      status: '',
      priority: '',
      dateRange: '',
      sortBy: 'createdAt',
      sortOrder: 'desc'
    });
  };

  const activeFilterCount = Object.values(activeFilters).filter(v => v && v !== 'createdAt' && v !== 'desc').length;

  return (
    <div className="filter-bar">
      <button 
        className="filter-toggle"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <FaFilter />
        <span>Filters</span>
        {activeFilterCount > 0 && (
          <span className="filter-badge">{activeFilterCount}</span>
        )}
      </button>

      {isExpanded && (
        <div className="filter-dropdown">
          <div className="filter-header">
            <h3>Filter Tasks</h3>
            <button className="clear-filters" onClick={clearFilters}>
              <FaTimes /> Clear All
            </button>
          </div>

          <div className="filter-group">
            <label>Status</label>
            <select 
              value={activeFilters.status || ''} 
              onChange={(e) => handleFilterChange('status', e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Priority</label>
            <select 
              value={activeFilters.priority || ''} 
              onChange={(e) => handleFilterChange('priority', e.target.value)}
            >
              <option value="">All Priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Date Range</label>
            <select 
              value={activeFilters.dateRange || ''} 
              onChange={(e) => handleFilterChange('dateRange', e.target.value)}
            >
              <option value="">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Sort By</label>
            <select 
              value={activeFilters.sortBy || 'createdAt'} 
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            >
              <option value="createdAt">Date Created</option>
              <option value="dueDate">Due Date</option>
              <option value="priority">Priority</option>
              <option value="title">Title (A-Z)</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Sort Order</label>
            <select 
              value={activeFilters.sortOrder || 'desc'} 
              onChange={(e) => handleFilterChange('sortOrder', e.target.value)}
            >
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;
