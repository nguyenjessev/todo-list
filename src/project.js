export default (() => {
  const projectList = [];

  // Creates a new project and adds it to the project list
  const project = (name) => {
    const newProject = { name }

    projectList.push(newProject);

    return newProject;
  }

  // Makes sure a project name is unique and not blank
  const validateProjectName = (name) => {
    if(!name) return { result: false, message: 'Name cannot be blank.' };
    if(projectList.find(p => p.name == name)) return { result: false, message: 'Name must be unique.' };

    return { result: true, message: 'Project successfully created.' };
  }

  return { projectList, project, validateProjectName };
})();
