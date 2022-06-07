export enum ProjectStatus {
  Active,
  Finished,
}

export type Project = {
  id: string;
  title: string;
  description: string;
  people: number;
  status: ProjectStatus;
};

export type Listener = (items: Project[]) => void;

const listeners: Listener[] = [];
const projects: Project[] = [];

export function addListener(listenerFn: Listener) {
  listeners.push(listenerFn);
}

export function addProject(title: string, description: string, numOfPeople: number) {
  const newProject: Project = {
    id: Math.random().toString(),
    title: title,
    description: description,
    people: numOfPeople,
    status: ProjectStatus.Active,
  };

  projects.push(newProject);
  for (const listenerFn of listeners) {
    listenerFn(projects.slice());
  }
}
