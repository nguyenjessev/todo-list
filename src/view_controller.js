import './style.css';
import projectController from './project.js';

export default (() => {
  // Populates sidebar
  const addProjectsToSidebar = () => {
    for(const p of projectController.projectList) {
      const project = document.createElement('div');
      project.classList.add('project');
      console.log(p);
      console.log(p.name);
      project.textContent = p.name;

      document.getElementById('sidebar').appendChild(project);
    }
  };

  // Clears sidebar
  const clearSidebar = () => {
    const sidebar = document.getElementById('sidebar');

    while(sidebar.firstChild) {
      sidebar.removeChild(sidebar.firstChild);
    }
  }

  // Creates and adds "+ New Project" button to sidebar
  const createAddProjectButton = () => {
    const addProjectButton = document.createElement('button');
    addProjectButton.id = 'add-project-button';
    addProjectButton.classList.add('add-button');
    addProjectButton.textContent = '+ Add Project';
    addProjectButton.addEventListener('click', () => createAddProjectForm());

    document.getElementById('sidebar').appendChild(addProjectButton);
  };

  // Hides the "+ New Project" button from sidebar
  const destroyAddProjectButton = () => {
    const addProjectButton = document.getElementById('add-project-button');
    if(addProjectButton === null) return;

    addProjectButton.remove();
  }

  const createAddProjectForm = () => {
    destroyAddProjectButton();
    const addProjectForm = document.createElement('div');
    addProjectForm.id = 'add-project-form';
    
    // Text input
    const addProjectNameInput = document.createElement('input');
    addProjectNameInput.id = 'add-project-name-input';
    addProjectNameInput.classList.add('text-input');
    addProjectNameInput.placeholder = 'New Project Name';
    addProjectForm.appendChild(addProjectNameInput);

    // Buttons container
    const addProjectButtonsContainer = document.createElement('div');
    addProjectButtonsContainer.id = 'add-project-buttons-container';
    addProjectForm.appendChild(addProjectButtonsContainer);

    // Cancel button
    const addProjectCancelButton = document.createElement('button');
    addProjectCancelButton.id = 'add-project-cancel-button';
    addProjectCancelButton.classList.add('cancel-button');
    addProjectCancelButton.textContent = '✕';
    addProjectCancelButton.addEventListener('click', () => {
      destroyAddProjectForm();
      createAddProjectButton();
    });
    addProjectButtonsContainer.appendChild(addProjectCancelButton);

    // Confirm button
    const addProjectConfirmButton = document.createElement('button');
    addProjectConfirmButton.id = 'add-project-confirm-button';
    addProjectConfirmButton.classList.add('confirm-button');
    addProjectConfirmButton.textContent = '✓';
    addProjectConfirmButton.addEventListener('click', () => {
      const newProjectName = document.getElementById('add-project-name-input').value;
      const validationResult = projectController.validateProjectName(newProjectName);
      if(validationResult.result == true) {
        projectController.createProject(newProjectName);
        clearSidebar();
        addProjectsToSidebar();
        destroyAddProjectForm();
        createAddProjectButton();
      } else {
        addProjectNameInput.classList.add('error');
        addProjectErrorMessage.textContent = validationResult.message;
      }
    });
    addProjectButtonsContainer.appendChild(addProjectConfirmButton);

    // Error message
    const addProjectErrorMessage = document.createElement('div');
    addProjectErrorMessage.id = 'add-project-error-message';
    addProjectForm.appendChild(addProjectErrorMessage);

    document.getElementById('sidebar').appendChild(addProjectForm);
    addProjectNameInput.focus();
  }

  const destroyAddProjectForm = () => {
    const addProjectForm = document.getElementById('add-project-form');
    if(addProjectForm == null) return;

    addProjectForm.remove();
  }

  const clearContentPane = () => {
    const contentPane = document.getElementById('content-pane');

    while(contentPane.firstChild) {
      contentPane.removeChild(contentPane.firstChild);
    }
  }

  return {
    addProjectsToSidebar,
    createAddProjectButton
  };
})();
