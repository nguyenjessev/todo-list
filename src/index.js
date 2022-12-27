import projectController from './project_controller'
import viewController from './view_controller'

(() => {
  projectController.project('📨 Inbox');

  // Add all projects to the sidebar
  projectController.projectList.forEach((project) => {
    viewController.addProjectToSidebar(project);
  })
})();
