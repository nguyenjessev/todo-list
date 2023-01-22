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

    switch (task.priority) {
      case 'high':
        taskDiv.classList.add('priority-high');
        break;
      case 'medium':
        taskDiv.classList.add('priority-medium');
        break;
      case 'low':
        taskDiv.classList.add('priority-low');
        break;
      default:
        taskDiv.classList.add('priority-none');
    }

    const taskButton = document.createElement('div');
    taskButton.classList.add('task-button');
    taskButton.addEventListener('click', () => {
      projectController.completeTask(task);
      taskDiv.remove();
    });
    taskDiv.appendChild(taskButton);

    const taskText = document.createElement('div');
    taskText.classList.add('task-text');

    const taskName = document.createElement('span');
    taskName.classList.add('task-name');
    taskName.textContent = task.name;
    taskText.appendChild(taskName);

    const taskDescription = document.createElement('span');
    taskDescription.classList.add('task-description');
    taskDescription.textContent = task.description;
    taskText.appendChild(taskDescription);

    taskDiv.appendChild(taskText);

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

    document.querySelectorAll('.project').forEach((project) => {
      project.classList.remove('active-project');
    });

    document
      .querySelector(`.project[data-project="${activeProject.name}"]`)
      .classList.add('active-project');
  };

  // Populates sidebar with a project
  const addProjectToSidebar = (project) => {
    const projectDiv = document.createElement('div');
    projectDiv.dataset.project = project.name;
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
    document.getElementById('new-task-description-input').value = '';

    document.getElementById('new-task-name-input').focus();
  };

  const hideNewTaskForm = () => {
    const newTaskPane = document.getElementById('new-task');

    newTaskPane.dataset.form = 'closed';
  };

  const submitNewTask = () => {
    const newTaskNameInput = document.getElementById('new-task-name-input');
    const newTaskName = newTaskNameInput.value.trim();
    const newTaskPriority = document.getElementById('new-task-priority').value;
    const newTaskDescription = document.getElementById(
      'new-task-description-input'
    ).value;

    if (newTaskName !== '') {
      const newTask = taskController.task({
        name: newTaskName,
        priority: newTaskPriority,
        description: newTaskDescription,
      });

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
