import './style.css';
import projectController from './project_controller';
import taskController from './task_controller';

export default (() => {
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
    const addProjectNameInput = document.getElementById(
      'add-project-name-input'
    );
    addProjectNameInput.value = null;
    addProjectNameInput.classList.remove('error');
    document.getElementById('add-project-form').hidden = false;
    addProjectNameInput.focus();
  };

  // Hides the new project form
  const hideAddProjectForm = () => {
    document.getElementById('add-project-error-message').textContent = null;
    document.getElementById('add-project-form').hidden = true;
  };

  const addTaskToTaskList = (task) => {
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task');

    const taskButton = document.createElement('div');
    taskButton.classList.add('task-button');
    taskButton.addEventListener('click', () => {
      projectController.completeTask(task);
      taskDiv.remove();
    });
    taskDiv.appendChild(taskButton);

    const taskName = document.createElement('span');
    taskName.textContent = task.name;
    taskDiv.appendChild(taskName);

    document.getElementById('tasks').appendChild(taskDiv);
  };

  const showActiveProject = () => {
    const activeProject = projectController.getActiveProject();

    document.getElementById('project-name-header').textContent =
      activeProject.name;
    document.getElementById('tasks').innerHTML = '';

    activeProject.tasks.forEach((task) => {
      addTaskToTaskList(task);
    });
  };

  // Populates sidebar with a project
  const addProjectToSidebar = (project) => {
    const projectDiv = document.createElement('div');
    projectDiv.id = project.name;
    projectDiv.classList.add('project');
    projectDiv.textContent = project.name;
    projectDiv.addEventListener('click', () => {
      projectController.setActiveProject(project.name);
      showActiveProject();
    });

    document.getElementById('project-list').appendChild(projectDiv);
  };

  const submitProjectName = () => {
    const newProjectNameInput = document.getElementById(
      'add-project-name-input'
    );
    const newProjectName = newProjectNameInput.value.trim();
    const validationResult =
      projectController.validateProjectName(newProjectName);
    if (validationResult.result === true) {
      const newProject = projectController.project(newProjectName);
      addProjectToSidebar(newProject);
      projectController.setActiveProject(newProjectName);
      showActiveProject();
      hideAddProjectForm();
      showAddProjectButton();
    } else {
      newProjectNameInput.classList.add('error');
      document.getElementById('add-project-error-message').textContent =
        validationResult.message;
    }
  };

  const showNewTaskForm = () => {
    const newTaskPane = document.getElementById('new-task');

    newTaskPane.dataset.form = 'open';

    // Reset form
    const newTaskNameInput = document.getElementById('new-task-name-input');
    document.getElementById('new-task-error-message').textContent = '';
    newTaskNameInput.value = '';
    newTaskNameInput.classList.remove('error');
    document.getElementById('new-task-priority').value = 'none';

    document.getElementById('new-task-name-input').focus();
  };

  const hideNewTaskForm = () => {
    const newTaskPane = document.getElementById('new-task');

    newTaskPane.dataset.form = 'closed';
  };

  const submitNewTask = () => {
    const newTaskNameInput = document.getElementById('new-task-name-input');
    const newTaskName = newTaskNameInput.value.trim();

    if (newTaskName !== '') {
      const newTask = taskController.task(newTaskName);

      projectController.getActiveProject().tasks.push(newTask);

      addTaskToTaskList(newTask);
      hideNewTaskForm();
    } else {
      newTaskNameInput.classList.add('error');
      document.getElementById('new-task-error-message').textContent =
        'Name cannot be blank.';
    }
  };

  // Add event listeners when DOM is ready
  window.addEventListener('DOMContentLoaded', () => {
    document
      .getElementById('add-project-button')
      .addEventListener('click', () => {
        showAddProjectForm();
      });

    document.getElementById('new-task-button').addEventListener('click', () => {
      showNewTaskForm();
    });

    document
      .getElementById('add-project-cancel-button')
      .addEventListener('click', () => {
        hideAddProjectForm();
        showAddProjectButton();
      });

    document
      .getElementById('new-task-cancel-button')
      .addEventListener('click', () => {
        hideNewTaskForm();
      });

    document
      .getElementById('add-project-confirm-button')
      .addEventListener('click', () => {
        submitProjectName();
      });

    document
      .getElementById('add-project-name-input')
      .addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
          submitProjectName();
        } else if (e.key === 'Escape') {
          hideAddProjectForm();
          showAddProjectButton();
        }
      });

    document
      .getElementById('new-task-confirm-button')
      .addEventListener('click', () => {
        submitNewTask();
      });

    document
      .getElementById('new-task-name-input')
      .addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
          submitNewTask();
        } else if (e.key === 'Escape') {
          hideNewTaskForm();
        }
      });
  });

  return {
    addProjectToSidebar,
    showActiveProject,
  };
})();
