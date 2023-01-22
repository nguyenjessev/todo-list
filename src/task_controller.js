export default (() => {
  // Creates a new task
  const task = (taskData) => {
    const newTask = {
      name: taskData.name,
      priority: taskData.priority,
      description: taskData.description,
    };

    return newTask;
  };

  return { task };
})();
