const viewController = (() => {
  const init = () => {
    const container = document.createElement('div');
    container.classList.add('container');

    const sidebar = document.createElement('div');
    sidebar.classList.add('sidebar');
    container.appendChild(sidebar);

    const taskView = document.createElement('div');
    taskView.classList.add('task-view');
    container.appendChild(taskView);

    document.body.appendChild(container);
  };

  const loadSidebar = (projects) => {

  };

  const loadTaskView = (tasks) => {

  };

  return {
    init
  };
})();

export default viewController;
