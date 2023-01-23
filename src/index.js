import storageController from './storage_controller';
import viewController from './view_controller';
import projectController from './project_controller';

(() => {
  if (!localStorage.getItem('savedProjects')) {
    storageController.createNewProfile();
  } else {
    storageController.loadSavedProfile();
  }

  projectController.getProjectList().forEach((project) => {
    viewController.addProjectToSidebar(project);
  });

  viewController.showActiveProject();
})();
