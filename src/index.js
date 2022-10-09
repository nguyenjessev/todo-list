import projectController from './project'
import viewController from './view_controller'

const todoApp = (() => {
  projectController.createProject('📨 Inbox');

  viewController.addProjectsToSidebar();

  viewController.createAddProjectButton();
})();
