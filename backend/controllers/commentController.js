const Comment = require('../models/Comment');
const Task = require('../models/Task');

// Get all comments for a task
exports.getTaskComments = async (req, res) => {
  try {
    const { taskId } = req.params;

    // Verify task exists and user has access
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (task.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to access this task' });
    }

    const comments = await Comment.find({ task: taskId })
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (error) {
    console.error('Get comments error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add a comment to a task
exports.addComment = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { text } = req.body;

    // Verify task exists and user has access
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (task.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to access this task' });
    }

    const comment = await Comment.create({
      text,
      task: taskId,
      user: req.user.id
    });

    const populatedComment = await Comment.findById(comment._id)
      .populate('user', 'name email');

    res.status(201).json(populatedComment);
  } catch (error) {
    console.error('Add comment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a comment
exports.updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { text } = req.body;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Only the comment author can update it
    if (comment.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this comment' });
    }

    comment.text = text;
    comment.isEdited = true;
    await comment.save();

    const populatedComment = await Comment.findById(comment._id)
      .populate('user', 'name email');

    res.json(populatedComment);
  } catch (error) {
    console.error('Update comment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a comment
exports.deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Only the comment author can delete it
    if (comment.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this comment' });
    }

    await Comment.findByIdAndDelete(commentId);

    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Delete comment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
