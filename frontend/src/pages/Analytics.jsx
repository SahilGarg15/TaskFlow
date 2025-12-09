import { useState, useEffect } from 'react';
import { FaChartLine, FaCheckCircle, FaClock, FaTrophy, FaFire } from 'react-icons/fa';
import api from '../utils/api';
import './Analytics.css';

const Analytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const { data } = await api.get('/tasks/analytics');
      setAnalytics(data.data);
    } catch (error) {
      console.error('Fetch analytics error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading analytics...</p>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="analytics-page">
        <div className="container">
          <div className="empty-state">
            <p>No analytics data available</p>
          </div>
        </div>
      </div>
    );
  }

  const priorityData = analytics.byPriority.reduce((acc, item) => {
    acc[item._id] = item.count;
    return acc;
  }, {});

  return (
    <div className="analytics-page">
      <div className="container">
        <div className="analytics-header">
          <div>
            <h1>📊 Task Analytics</h1>
            <p>Insights into your productivity and performance</p>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-icon" style={{ background: 'var(--gradient-primary)' }}>
              <FaTrophy />
            </div>
            <div className="metric-content">
              <h3>Productivity Score</h3>
              <div className="metric-value">{analytics.productivityScore}%</div>
              <p className="metric-label">Based on completion rate</p>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon" style={{ background: 'var(--gradient-success)' }}>
              <FaCheckCircle />
            </div>
            <div className="metric-content">
              <h3>Completed Tasks</h3>
              <div className="metric-value">{analytics.completedTasks}</div>
              <p className="metric-label">Out of {analytics.totalTasks} total</p>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon" style={{ background: 'var(--gradient-info)' }}>
              <FaClock />
            </div>
            <div className="metric-content">
              <h3>Avg. Completion Time</h3>
              <div className="metric-value">{analytics.avgCompletionTimeHours}h</div>
              <p className="metric-label">Average time per task</p>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon" style={{ background: 'var(--gradient-danger)' }}>
              <FaFire />
            </div>
            <div className="metric-content">
              <h3>Overdue Tasks</h3>
              <div className="metric-value">{analytics.overdueTasks}</div>
              <p className="metric-label">Need immediate attention</p>
            </div>
          </div>
        </div>

        {/* Priority Distribution */}
        <div className="chart-section">
          <div className="chart-card">
            <h2>Tasks by Priority</h2>
            <div className="priority-chart">
              <div className="priority-bar-container">
                <div className="priority-bar high">
                  <div 
                    className="priority-fill"
                    style={{ 
                      width: `${((priorityData.high || 0) / analytics.totalTasks * 100)}%` 
                    }}
                  >
                    <span className="priority-count">{priorityData.high || 0}</span>
                  </div>
                  <span className="priority-label">🔴 High Priority</span>
                </div>
                <div className="priority-bar medium">
                  <div 
                    className="priority-fill"
                    style={{ 
                      width: `${((priorityData.medium || 0) / analytics.totalTasks * 100)}%` 
                    }}
                  >
                    <span className="priority-count">{priorityData.medium || 0}</span>
                  </div>
                  <span className="priority-label">🟡 Medium Priority</span>
                </div>
                <div className="priority-bar low">
                  <div 
                    className="priority-fill"
                    style={{ 
                      width: `${((priorityData.low || 0) / analytics.totalTasks * 100)}%` 
                    }}
                  >
                    <span className="priority-count">{priorityData.low || 0}</span>
                  </div>
                  <span className="priority-label">🟢 Low Priority</span>
                </div>
              </div>
            </div>
          </div>

          <div className="chart-card">
            <h2>Completion Trend (Last 30 Days)</h2>
            <div className="trend-chart">
              {analytics.completionTrend.length > 0 ? (
                <div className="trend-bars">
                  {analytics.completionTrend.map((day, index) => (
                    <div key={index} className="trend-bar-item">
                      <div 
                        className="trend-bar"
                        style={{ 
                          height: `${(day.count / Math.max(...analytics.completionTrend.map(d => d.count))) * 100}%` 
                        }}
                        title={`${day._id}: ${day.count} tasks`}
                      >
                        <span className="trend-count">{day.count}</span>
                      </div>
                      <span className="trend-date">{new Date(day._id).getDate()}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-data">No completion data for the last 30 days</p>
              )}
            </div>
          </div>
        </div>

        {/* Productivity Insights */}
        <div className="insights-section">
          <h2>💡 Productivity Insights</h2>
          <div className="insights-grid">
            <div className="insight-card">
              <h3>🎯 Focus Areas</h3>
              <p>
                {analytics.overdueTasks > 0 
                  ? `You have ${analytics.overdueTasks} overdue task${analytics.overdueTasks > 1 ? 's' : ''}. Consider prioritizing these first!`
                  : 'Great job! No overdue tasks. Keep up the excellent work!'}
              </p>
            </div>
            <div className="insight-card">
              <h3>⚡ Performance</h3>
              <p>
                {analytics.productivityScore >= 75 
                  ? 'Excellent productivity! You\'re completing most of your tasks.'
                  : analytics.productivityScore >= 50
                  ? 'Good progress! Try to complete a few more tasks to boost your score.'
                  : 'Let\'s improve! Focus on completing your existing tasks.'}
              </p>
            </div>
            <div className="insight-card">
              <h3>📈 Trend</h3>
              <p>
                {analytics.completionTrend.length > 0
                  ? `You've been actively completing tasks. Keep the momentum going!`
                  : 'Start completing tasks to see your productivity trends!'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
