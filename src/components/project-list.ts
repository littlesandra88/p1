import * as State from '../state/project.js';

export function render(listType: 'active' | 'finished') {
  let templateElement: HTMLTemplateElement;
  let hostElement: HTMLDivElement;
  let element: HTMLElement;
  let assignedProjects: State.Project[];

  templateElement = document.getElementById('project-list')! as HTMLTemplateElement;
  hostElement = document.getElementById('app')! as HTMLDivElement;
  assignedProjects = [];

  const importedNode = document.importNode(templateElement.content, true);
  element = importedNode.firstElementChild as HTMLElement;
  element.id = `${listType}-projects`;

  function renderProjects() {
    const listEl = document.getElementById(`${listType}-projects-list`)! as HTMLUListElement;
    listEl.innerHTML = '';
    for (const prjItem of assignedProjects) {
      /*
      const templateId: string = 'single-project';
      const hostElementId = element.querySelector('ul')!.id;
      const newElementId = prjItem;

      templateElement = document.getElementById(templateId)! as HTMLTemplateElement;
      hostElement = document.getElementById(hostElementId)!;

      const importedNode = document.importNode(templateElement.content, true);
      element = importedNode.firstElementChild;
      if (newElementId) {
        element.id = newElementId;
      }

      hostElement.insertAdjacentElement('beforeend', element);
*/
      const listItem = document.createElement('li');
      listItem.textContent = prjItem.title;
      listEl.appendChild(listItem);
    }
  }

  State.addListener((projects: State.Project[]) => {
    const relevantProjects = projects.filter(prj => {
      if (listType === 'active') {
        return prj.status === State.ProjectStatus.Active;
      }
      return prj.status === State.ProjectStatus.Finished;
    });
    assignedProjects = relevantProjects;

    renderProjects();
  });

  function renderContent() {
    const listId = `${listType}-projects-list`;
    element.querySelector('ul')!.id = listId;
    element.querySelector('h2')!.textContent = listType.toUpperCase() + ' PROJECTS';

    hostElement.insertAdjacentElement('beforeend', element);
  }

  renderContent();
}
