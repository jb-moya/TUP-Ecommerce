class TaskController {
  constructor() {
    this.tasks = [];
  }

  getAllTasks(req, res) {
    res.json({ tasks: this.tasks });
  }

  addTask(req, res) {
    const { taskName } = req.body;

    if (!taskName) {
      return res.status(400).json({ error: 'Task name is required' });
    }

    const newTask = {
      id: Date.now(),
      name: taskName,
    };

    this.tasks.push(newTask);

    res.status(201).json({ message: 'Task added successfully', task: newTask });
  }

  editTask(req, res) {
    const { taskId, newName } = req.body;

    if (!taskId || !newName) {
      return res.status(400).json({ error: 'Task ID and new name are required' });
    }

    const taskIndex = this.tasks.findIndex((task) => task.id.toString() === taskId);

    if (taskIndex === -1) {
      return res.status(404).json({ error: 'Task not found' });
    }

    this.tasks[taskIndex].name = newName;

    res.json({ message: 'Task updated successfully', task: this.tasks[taskIndex] });
  }

  deleteTask(req, res) {
    const { taskId } = req.body;

    if (!taskId) {
      return res.status(400).json({ error: 'Task ID is required' });
    }

    this.tasks = this.tasks.filter((task) => task.id.toString() !== taskId);

    res.json({ message: 'Task deleted successfully', deletedTaskId: taskId });
  }
}

module.exports = TaskController;
