import * as Validate from '../util/validate.js';
import * as State from '../state/project.js';

const templateElement: HTMLTemplateElement = document.getElementById('project-input')! as HTMLTemplateElement;
const hostElement: HTMLDivElement = document.getElementById('app')! as HTMLDivElement;

const importedNode = document.importNode(templateElement.content, true);
const element: HTMLFormElement = importedNode.firstElementChild as HTMLFormElement;
element.id = 'user-input'; // so CSS can style it

const titleInputElement: HTMLInputElement = element.querySelector('#title') as HTMLInputElement;
const descriptionInputElement: HTMLInputElement = element.querySelector('#description') as HTMLInputElement;
const peopleInputElement: HTMLInputElement = element.querySelector('#people') as HTMLInputElement;

export function render() {
  hostElement.insertAdjacentElement('afterbegin', element);
}

function clearInputs() {
  titleInputElement.value = '';
  descriptionInputElement.value = '';
  peopleInputElement.value = '';
}

function submitHandler(event: Event) {
  event.preventDefault();
  const userInput = gatherUserInput();
  if (Array.isArray(userInput)) {
    const [title, desc, people] = userInput;
    State.addProject(title, desc, people);
    clearInputs();
  }
}
element.addEventListener('submit', submitHandler);

// ikke godt. det er kun "if" der må give void ikke else
function gatherUserInput(): [string, string, number] | void {
  const enteredTitle = titleInputElement.value;
  const enteredDescription = descriptionInputElement.value;
  const enteredPeople = peopleInputElement.value;

  const titleValidatable: Validate.Validatable = {
    value: enteredTitle,
    required: true,
  };
  const descriptionValidatable: Validate.Validatable = {
    value: enteredDescription,
    required: true,
    minLength: 5,
  };
  const peopleValidatable: Validate.Validatable = {
    value: +enteredPeople,
    required: true,
    min: 1,
    max: 5,
  };

  if (!Validate.validate(titleValidatable) || !Validate.validate(descriptionValidatable) || !Validate.validate(peopleValidatable)) {
    alert('Invalid input, please try again!');
    return;
  } else {
    return [enteredTitle, enteredDescription, +enteredPeople];
  }
}
