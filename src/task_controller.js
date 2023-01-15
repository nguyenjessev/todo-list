export default (() => {
  // Creates a new task
  const task = (name) => {
    const newTask = {
      name,
    };

    return newTask;
  };

  return { task };
})();
