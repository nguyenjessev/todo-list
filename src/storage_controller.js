import parseISO from 'date-fns/parseISO';
import projectController from './project_controller';

export default (() => {
  const createNewProfile = () => {
    const inboxProject = projectController.project('Inbox');

    projectController.setActiveProject(inboxProject.name);
  };

  const loadSavedProfile = () => {
    const savedProjects = JSON.parse(localStorage.getItem('savedProjects'));

    savedProjects.forEach((project) => {
      project.tasks.forEach((task) => {
        if (task.dueDate) task.dueDate = parseISO(task.dueDate);
      });

      projectController.addProjectToProjectList(project);
    });

    projectController.setActiveProject(savedProjects[0].name);
  };

  const saveProfile = () => {
    const savedProjects = JSON.stringify(projectController.getProjectList());

    localStorage.setItem('savedProjects', savedProjects);
  };

  return {
    createNewProfile,
    loadSavedProfile,
    saveProfile,
  };
})();
