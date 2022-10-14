import './style.css';
import projectController from './project.js';

export default (() => {
  // Add event listeners when DOM is ready
  window.addEventListener('DOMContentLoaded', (e) => {
    document.getElementById('add-project-button').addEventListener('click', () => {
      showAddProjectForm();
    });

    document.getElementById('add-project-cancel-button').addEventListener('click', () => {
      hideAddProjectForm();
      showAddProjectButton();
    });

    document.getElementById('add-project-confirm-button').addEventListener('click', () => {
      submitProjectName();
    });

    document.getElementById('add-project-name-input').addEventListener('keyup', (e) => {
      if(e.key == 'Enter') {
        submitProjectName();
      } else if(e.key == 'Escape') {
        hideAddProjectForm();
        showAddProjectButton();
      }
    });
  });

  // Populates sidebar with a project
  const addProjectToSidebar = (project) => {
    const projectDiv = document.createElement('div');
    projectDiv.classList.add('project');
    projectDiv.textContent = project.name;

    document.getElementById('project-list').appendChild(projectDiv);
  };

  // Shows "+ New Project" button in sidebar
  const showAddProjectButton = () => {
    document.getElementById('add-project-button').hidden = false;
  };

  // Hides the "+ New Project" button from sidebar
  const hideAddProjectButton = () => {
    document.getElementById('add-project-button').hidden = true;
  };

  // Shows the new project form
  const showAddProjectForm = () => {
    hideAddProjectButton();
    const addProjectNameInput = document.getElementById('add-project-name-input');
    addProjectNameInput.value = null;
    document.getElementById('add-project-form').hidden = false;
    addProjectNameInput.focus();
  };

  // Hides the new project form
  const hideAddProjectForm = () => {
    document.getElementById('add-project-error-message').textContent = null;
    document.getElementById('add-project-form').hidden = true;
  };

  const submitProjectName = () => {
    const newProjectNameInput = document.getElementById('add-project-name-input');
    const newProjectName = newProjectNameInput.value.trim();
    const validationResult = projectController.validateProjectName(newProjectName);
    if(validationResult.result == true) {
      const newProject = projectController.project(newProjectName);
      addProjectToSidebar(newProject);
      hideAddProjectForm();
      showAddProjectButton();
    } else {
      newProjectNameInput.classList.add('error');
      document.getElementById('add-project-error-message').textContent = validationResult.message;
    }
  }

  return {
    addProjectToSidebar
  };
})();
