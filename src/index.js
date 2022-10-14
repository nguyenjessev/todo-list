import projectController from './project'
import viewController from './view_controller'

const todoApp = (() => {
  projectController.createProject('📨 Inbox');

  for(const project of projectController.projectList) {
    viewController.addProjectToSidebar(project);
  }

  viewController.createAddProjectButton();
})();
