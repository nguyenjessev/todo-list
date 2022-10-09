// const projects = [];

import { validate } from "schema-utils";

// const project = (name) => {
//   return {
//     name
//   };
// }

// const createProject = (name) => {
//   const newProject = project(name);
//   projects.push(newProject);
// }

export default (() => {
  const projectList = [];

  const project = (name) => {
    return {
      name
    }
  }

  const createProject = (name) => {
    console.log(project(name));
    projectList.push(project(name));
    console.log(projectList);
  }

  const validateProjectName = (name) => {
    if(!name) return { result: false, message: 'Name cannot be blank.' };
    if(projectList.find(p => p.name == name)) return { result: false, message: 'Name must be unique.' };

    return { result: true, message: 'Project successfully created.' };
  }

  return { projectList, createProject, validateProjectName };
})();
