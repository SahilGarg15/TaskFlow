import { FaEdit, FaTrash, FaClock, FaTag, FaComment } from 'react-icons/fa';
import './TaskCard.css';

const TaskCard = ({ task, onEdit, onDelete, onOpenComments }) => {
  const formatDate = (date) => {
    if (!date) return null;
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="task-card">
      <div className="task-header">
        <h3 className="task-title">{task.title}</h3>
        <div className="task-actions">
          {onOpenComments && (
            <button onClick={() => onOpenComments(task._id)} className="task-btn task-btn-comment" title="Comments">
              <FaComment />
            </button>
          )}
          <button onClick={() => onEdit(task)} className="task-btn task-btn-edit">
            <FaEdit />
          </button>
          <button onClick={() => onDelete(task._id)} className="task-btn task-btn-delete">
            <FaTrash />
          </button>
        </div>
      </div>

      {task.description && <p className="task-description">{task.description}</p>}

      <div className="task-meta">
        <div className="task-badges">
          <span className={`badge badge-${task.status}`}>
            {task.status.replace('-', ' ')}
          </span>
          <span className={`badge badge-${task.priority}`}>
            {task.priority}
          </span>
        </div>

        {task.dueDate && (
          <div className="task-due-date">
            <FaClock />
            <span>{formatDate(task.dueDate)}</span>
          </div>
        )}
      </div>

      {task.tags && task.tags.length > 0 && (
        <div className="task-tags">
          <FaTag />
          {task.tags.map((tag, index) => (
            <span key={index} className="task-tag">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskCard;
