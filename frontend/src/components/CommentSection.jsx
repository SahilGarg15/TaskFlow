import { useState, useEffect } from 'react';
import { FaComment, FaTimes, FaEdit, FaTrash, FaPaperPlane } from 'react-icons/fa';
import api from '../utils/api';
import { toast } from 'react-toastify';
import './CommentSection.css';

const CommentSection = ({ taskId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editText, setEditText] = useState('');
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen && taskId) {
      fetchComments();
    }
  }, [taskId, isOpen]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/comments/task/${taskId}`);
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
      toast.error('Failed to load comments');
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const response = await api.post(`/comments/task/${taskId}`, { text: newComment });
      setComments([response.data, ...comments]);
      setNewComment('');
      toast.success('Comment added');
    } catch (error) {
      console.error('Error adding comment:', error);
      toast.error('Failed to add comment');
    }
  };

  const handleUpdateComment = async (commentId) => {
    if (!editText.trim()) return;

    try {
      const response = await api.put(`/comments/${commentId}`, { text: editText });
      setComments(comments.map(c => c._id === commentId ? response.data : c));
      setEditingCommentId(null);
      setEditText('');
      toast.success('Comment updated');
    } catch (error) {
      console.error('Error updating comment:', error);
      toast.error('Failed to update comment');
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm('Are you sure you want to delete this comment?')) return;

    try {
      await api.delete(`/comments/${commentId}`);
      setComments(comments.filter(c => c._id !== commentId));
      toast.success('Comment deleted');
    } catch (error) {
      console.error('Error deleting comment:', error);
      toast.error('Failed to delete comment');
    }
  };

  const startEdit = (comment) => {
    setEditingCommentId(comment._id);
    setEditText(comment.text);
  };

  const cancelEdit = () => {
    setEditingCommentId(null);
    setEditText('');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="comment-section">
      <button 
        className="comment-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaComment />
        <span>Comments {comments.length > 0 && `(${comments.length})`}</span>
      </button>

      {isOpen && (
        <div className="comment-panel">
          <div className="comment-header">
            <h3>Comments</h3>
            <button className="close-panel" onClick={() => setIsOpen(false)}>
              <FaTimes />
            </button>
          </div>

          <form className="comment-form" onSubmit={handleAddComment}>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              rows="3"
              maxLength="1000"
            />
            <button type="submit" disabled={!newComment.trim()}>
              <FaPaperPlane /> Post
            </button>
          </form>

          <div className="comments-list">
            {loading ? (
              <div className="loading">Loading comments...</div>
            ) : comments.length === 0 ? (
              <div className="no-comments">
                <FaComment />
                <p>No comments yet. Be the first to comment!</p>
              </div>
            ) : (
              comments.map(comment => (
                <div key={comment._id} className="comment-item">
                  <div className="comment-header-info">
                    <div className="comment-author">
                      <div className="author-avatar">
                        {comment.user?.name?.charAt(0).toUpperCase()}
                      </div>
                      <div className="author-details">
                        <span className="author-name">{comment.user?.name}</span>
                        <span className="comment-date">
                          {formatDate(comment.createdAt)}
                          {comment.isEdited && ' (edited)'}
                        </span>
                      </div>
                    </div>
                    <div className="comment-actions">
                      <button onClick={() => startEdit(comment)} title="Edit">
                        <FaEdit />
                      </button>
                      <button onClick={() => handleDeleteComment(comment._id)} title="Delete">
                        <FaTrash />
                      </button>
                    </div>
                  </div>

                  {editingCommentId === comment._id ? (
                    <div className="edit-form">
                      <textarea
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        rows="3"
                        maxLength="1000"
                      />
                      <div className="edit-actions">
                        <button onClick={() => handleUpdateComment(comment._id)}>
                          Save
                        </button>
                        <button onClick={cancelEdit}>Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <p className="comment-text">{comment.text}</p>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
