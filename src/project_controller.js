export default (() => {
  const projectList = [];
  let activeProject = null;

  // Creates a new project and adds it to the project list
  const project = (name) => {
    const newProject = {
      name,
      tasks: [],
    };

    projectList.push(newProject);

    return newProject;
  };

  // Makes sure a project name is unique and not blank
  const validateProjectName = (name) => {
    if (!name) return { result: false, message: 'Name cannot be blank.' };
    if (projectList.find((p) => p.name === name))
      return { result: false, message: 'Name must be unique.' };

    return { result: true, message: 'Project successfully created.' };
  };

  const setActiveProject = (name) => {
    const result = projectList.find((element) => element.name === name);

    if (result !== undefined) {
      activeProject = result;
    }
  };

  const getActiveProject = () => activeProject;

  const completeTask = (task) => {
    activeProject.tasks.splice(activeProject.tasks.indexOf(task), 1);
  };

  const addProjectToProjectList = (newProject) => {
    projectList.push(newProject);
  }

  const getProjectList = () => projectList;

  return {
    project,
    validateProjectName,
    setActiveProject,
    getActiveProject,
    completeTask,
    addProjectToProjectList,
    getProjectList,
  };
})();
