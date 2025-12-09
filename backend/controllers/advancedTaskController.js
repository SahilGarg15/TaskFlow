const Task = require('../models/Task');

/**
 * @desc    Get advanced task analytics
 * @route   GET /api/tasks/analytics
 * @access  Private
 */
exports.getTaskAnalytics = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // Get tasks by priority
    const byPriority = await Task.aggregate([
      { $match: { user: req.user._id, isArchived: false } },
      {
        $group: {
          _id: '$priority',
          count: { $sum: 1 }
        }
      }
    ]);

    // Get completion rate over time (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const completionTrend = await Task.aggregate([
      {
        $match: {
          user: req.user._id,
          completedAt: { $gte: thirtyDaysAgo }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$completedAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Get overdue tasks
    const overdueTasks = await Task.countDocuments({
      user: req.user._id,
      dueDate: { $lt: new Date() },
      status: { $ne: 'completed' },
      isArchived: false
    });

    // Get average completion time
    const completedTasks = await Task.find({
      user: req.user._id,
      status: 'completed',
      completedAt: { $exists: true }
    }).select('createdAt completedAt');

    let avgCompletionTime = 0;
    if (completedTasks.length > 0) {
      const totalTime = completedTasks.reduce((sum, task) => {
        const diff = task.completedAt - task.createdAt;
        return sum + diff;
      }, 0);
      avgCompletionTime = Math.round(totalTime / completedTasks.length / (1000 * 60 * 60)); // Convert to hours
    }

    // Get productivity score (0-100)
    const totalTasks = await Task.countDocuments({
      user: req.user._id,
      isArchived: false
    });
    const completedCount = await Task.countDocuments({
      user: req.user._id,
      status: 'completed',
      isArchived: false
    });
    const productivityScore = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;

    res.status(200).json({
      success: true,
      data: {
        byPriority,
        completionTrend,
        overdueTasks,
        avgCompletionTimeHours: avgCompletionTime,
        productivityScore,
        totalTasks,
        completedTasks: completedCount
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Bulk update tasks
 * @route   PUT /api/tasks/bulk
 * @access  Private
 */
exports.bulkUpdateTasks = async (req, res, next) => {
  try {
    const { taskIds, update } = req.body;

    if (!taskIds || !Array.isArray(taskIds) || taskIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide task IDs'
      });
    }

    // Verify all tasks belong to user
    const tasks = await Task.find({
      _id: { $in: taskIds },
      user: req.user.id
    });

    if (tasks.length !== taskIds.length) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update some tasks'
      });
    }

    const result = await Task.updateMany(
      { _id: { $in: taskIds }, user: req.user.id },
      update,
      { runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: result,
      message: `${result.modifiedCount} tasks updated successfully`
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Archive/Unarchive task
 * @route   PUT /api/tasks/:id/archive
 * @access  Private
 */
exports.archiveTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    if (task.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to archive this task'
      });
    }

    task.isArchived = !task.isArchived;
    await task.save();

    res.status(200).json({
      success: true,
      data: task,
      message: task.isArchived ? 'Task archived' : 'Task unarchived'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Duplicate task
 * @route   POST /api/tasks/:id/duplicate
 * @access  Private
 */
exports.duplicateTask = async (req, res, next) => {
  try {
    const originalTask = await Task.findById(req.params.id);

    if (!originalTask) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    if (originalTask.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to duplicate this task'
      });
    }

    const duplicateTask = await Task.create({
      title: `${originalTask.title} (Copy)`,
      description: originalTask.description,
      status: 'pending',
      priority: originalTask.priority,
      tags: originalTask.tags,
      user: req.user.id
    });

    res.status(201).json({
      success: true,
      data: duplicateTask,
      message: 'Task duplicated successfully'
    });
  } catch (error) {
    next(error);
  }
};
