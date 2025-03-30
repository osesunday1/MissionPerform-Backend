import taskModel from '../models/taskModel.js'
import HttpError from '../utils/httpError.js'; 



// CREATE a new task
export const createTask = async (req, res, next) => {
  const { title, description, status } = req.body;

  if (!title || title.trim() === '') {
    return next(new HttpError('Title is required', 400));
  }

  try {
    const newTask = await taskModel.create({ title, description, status });
    res.status(201).json({ success: true, data: newTask });
  } catch (err) {
    return next(new HttpError(`Could not create task: ${err.message}`, 500));
  }
};


// READ all tasks 
export const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await taskModel.find();
    res.status(200).json({ success: true, tasks });
  } catch (err) {
    return next(new HttpError(`Could not fetch tasks: ${err.message}`, 500));
  }
};


// READ one task by ID 
export const getTaskById = async (req, res, next) => {
  try {
    const task = await taskModel.findById(req.params.id);
    if (!task) {
      return next(new HttpError('Task not found', 404));
    }
    res.status(200).json({ success: true, data: task });
  } catch (err) {
    return next(new HttpError(`Could not fetch task: ${err.message}`, 500));
  }
};

// UPDATE task by ID
export const updateTask = async (req, res, next) => {
  const { title, description, status } = req.body;

  try {
    const updatedTask = await taskModel.findByIdAndUpdate(
      req.params.id,
      { title, description, status },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return next(new HttpError('Task not found', 404));
    }

    res.status(200).json({ success: true, data: updatedTask });
  } catch (err) {
    return next(new HttpError(`Could not update task: ${err.message}`, 500));
  }
};

// DELETE task by ID 
export const deleteTask = async (req, res, next) => {
  try {
    const deletedTask = await taskModel.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return next(new HttpError('Task not found', 404));
    }

    res.status(200).json({ success: true, message: 'Task deleted successfully' });
  } catch (err) {
    return next(new HttpError(`Could not delete task: ${err.message}`, 500));
  }
};

// Clear all tasks
export const clearAllTasks = async (req, res) => {
  try {
    await taskModel.deleteMany({});
    res.status(200).json({ message: 'All tasks have been deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete all tasks', error: err.message });
  }
};