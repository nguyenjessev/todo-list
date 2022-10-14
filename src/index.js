import projectController from './project'
import viewController from './view_controller'

const todoApp = (() => {
  projectController.project('📨 Inbox');

  // Add all projects to the sidebar
  for(const project of projectController.projectList) {
    viewController.addProjectToSidebar(project);
  }
})();
