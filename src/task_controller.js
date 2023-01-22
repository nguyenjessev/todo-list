export default (() => {
  // Creates a new task
  const task = (taskData) => {
    const newTask = {
      name: taskData.name,
      priority: taskData.priority,
      description: taskData.description,
      dueDate: taskData.dueDate,
    };

    return newTask;
  };

  return { task };
})();
