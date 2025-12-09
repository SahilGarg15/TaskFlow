const Task = require('../models/Task');

// Export tasks to CSV
exports.exportTasksCSV = async (req, res) => {
  try {
    const tasks = await Task.find({ 
      user: req.user.id,
      isArchived: false 
    }).sort({ createdAt: -1 });

    // Create CSV header
    const csvHeader = 'Title,Description,Status,Priority,Due Date,Tags,Created At,Completed At\n';
    
    // Create CSV rows
    const csvRows = tasks.map(task => {
      const title = `"${task.title.replace(/"/g, '""')}"`;
      const description = `"${(task.description || '').replace(/"/g, '""')}"`;
      const status = task.status;
      const priority = task.priority;
      const dueDate = task.dueDate ? new Date(task.dueDate).toISOString() : '';
      const tags = `"${(task.tags || []).join(', ')}"`;
      const createdAt = new Date(task.createdAt).toISOString();
      const completedAt = task.completedAt ? new Date(task.completedAt).toISOString() : '';
      
      return `${title},${description},${status},${priority},${dueDate},${tags},${createdAt},${completedAt}`;
    }).join('\n');

    const csv = csvHeader + csvRows;

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="taskflow-export-${Date.now()}.csv"`);
    res.send(csv);
  } catch (error) {
    console.error('Export CSV error:', error);
    res.status(500).json({ message: 'Failed to export tasks' });
  }
};

// Export tasks to JSON
exports.exportTasksJSON = async (req, res) => {
  try {
    const tasks = await Task.find({ 
      user: req.user.id,
      isArchived: false 
    }).sort({ createdAt: -1 });

    const exportData = {
      exportDate: new Date().toISOString(),
      totalTasks: tasks.length,
      tasks: tasks.map(task => ({
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        dueDate: task.dueDate,
        tags: task.tags,
        createdAt: task.createdAt,
        completedAt: task.completedAt
      }))
    };

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename="taskflow-export-${Date.now()}.json"`);
    res.json(exportData);
  } catch (error) {
    console.error('Export JSON error:', error);
    res.status(500).json({ message: 'Failed to export tasks' });
  }
};

// Import tasks from JSON
exports.importTasks = async (req, res) => {
  try {
    const { tasks } = req.body;

    if (!Array.isArray(tasks) || tasks.length === 0) {
      return res.status(400).json({ message: 'Invalid import data' });
    }

    // Validate and prepare tasks
    const tasksToImport = tasks.map(task => ({
      title: task.title || 'Untitled Task',
      description: task.description || '',
      status: ['pending', 'in-progress', 'completed'].includes(task.status) ? task.status : 'pending',
      priority: ['low', 'medium', 'high'].includes(task.priority) ? task.priority : 'medium',
      dueDate: task.dueDate ? new Date(task.dueDate) : null,
      tags: Array.isArray(task.tags) ? task.tags : [],
      user: req.user.id
    }));

    // Insert tasks
    const importedTasks = await Task.insertMany(tasksToImport);

    res.status(201).json({
      message: 'Tasks imported successfully',
      count: importedTasks.length,
      tasks: importedTasks
    });
  } catch (error) {
    console.error('Import tasks error:', error);
    res.status(500).json({ message: 'Failed to import tasks' });
  }
};
