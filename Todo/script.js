function createMyElement(el, text, ...classes) {
  if (classes.length === 0) {
    classes = [''];
  }
  const element = document.createElement(el);
  element.innerText = text;
  element.className = classes.join(' ');
  return element;
}


class Model {
  constructor() {
    this.todoItems = [{ id: 1, text: 'First todo', status: true }, { id: 2, text: 'Second todo', status: false }];
  }

  deleteItem(id) {
    this.todoItems = this.todoItems.filter(item => item.id !== id);
  }

  addItem(text) {
    this.todoItems.push({
      id: this.todoItems.at(-1).id + 1 || 1,
      text,
      status: false,
    });
  }

  editItem(id, text) {
    this.todoItems.map(item => {
      if (item.id === id) {
        item.text = text;
        return item;
      } else {
        return item;
      }
    });
    console.log(this.todoItems);
  }

  changeStatus(id) {
    this.todoItems.map(item => item.id === id ? item.status = !item.status : item);
    console.log(this.todoItems);
  }
}


class Controller {
  constructor() {
    this.model = new Model();
    this.view = new View();
  }

  deleteItem(id) {
    this.model.deleteItem(id);
    console.log(id);
    this.view.render(this.model.todoItems, this.editItem.bind(this), this.changeStatus.bind(this), this.addItem.bind(this), this.deleteItem.bind(this));
  }

  addItem(text) {
    this.model.addItem(text);
    this.view.render(this.model.todoItems, this.editItem.bind(this), this.changeStatus.bind(this), this.addItem.bind(this), this.deleteItem.bind(this));
  }

  editItem(id, text) {
    this.model.editItem(id, text);
    this.view.render(this.model.todoItems, this.editItem.bind(this), this.changeStatus.bind(this), this.addItem.bind(this), this.deleteItem.bind(this));
  }

  changeStatus(id) {
    this.model.changeStatus(id);
    this.view.render(this.model.todoItems, this.editItem.bind(this), this.changeStatus.bind(this), this.addItem.bind(this), this.deleteItem.bind(this));
  }


  start() {
    this.view.render(this.model.todoItems, this.editItem.bind(this), this.changeStatus.bind(this), this.addItem.bind(this), this.deleteItem.bind(this));
  }
}


class TodoItem {
  constructor(id, text, status) {
    this.id = id;
    this.text = text;
    this.status = status;
    this.root = document.querySelector('.todo__items');
    this.li = createMyElement('li', '', 'todo__item');
    this.root.append(this.li);

    this.itemContent = createMyElement('div', '', 'item__content');
    this.li.append(this.itemContent);
    this.itemInput = createMyElement('input', '', 'item__input', `${status ? 'hidden' : ''}`);
    this.itemInput.value = this.text;
    this.itemText = createMyElement('span', this.text, 'item__text', `${status ? '' : 'hidden'}`);

    this.itemContent.append(this.itemInput);
    this.itemContent.append(this.itemText);

    this.itemButtons = createMyElement('div', '', 'item__buttons');
    this.li.append(this.itemButtons);

    this.editButton = createMyElement('button', 'Edit', `${status ? '' : 'hidden'}`);
    this.applyButton = createMyElement('button', 'Apply', `${status ? 'hidden' : ''}`);
    this.deleteButton = createMyElement('button', 'Delete');

    this.itemButtons.append(this.editButton);
    this.itemButtons.append(this.applyButton);
    this.itemButtons.append(this.deleteButton);
  }

  addControllers(editItem, changeStatus, deleteItem) {
    this.editButton.addEventListener('click', () => {
      this.itemInput.classList.toggle('hidden');
      this.itemText.classList.toggle('hidden');
      this.editButton.classList.toggle('hidden');
      this.applyButton.classList.toggle('hidden');
      changeStatus(this.id);
    });

    this.applyButton.addEventListener('click', () => {
      this.itemInput.classList.toggle('hidden');
      this.itemText.classList.toggle('hidden');
      this.editButton.classList.toggle('hidden');
      this.applyButton.classList.toggle('hidden');
      changeStatus(this.id);
      editItem(this.id, this.itemInput.value);
    });

    this.deleteButton.addEventListener('click', () => {
      deleteItem(this.id);
    });
  }
}
class TodoList {
  constructor() {
    this.root = document.querySelector('.todo');
  }
  render(array, editItem, changeStatus, deleteItem) {
    const todoList = createMyElement('ul', '', 'todo__items');
    this.root.append(todoList);
    array.map(item => new TodoItem(item.id, item.text, item.status).addControllers(editItem, changeStatus, deleteItem));
  }
}

class View {
  constructor() {
    this.root = document.getElementById('app');
  }
  render(array, editItem, changeStatus, addItem, deleteItem) {
    this.root.innerHTML = '';
    const container = createMyElement('div', '', 'container');
    this.root.append(container);

    const todo = createMyElement('div', '', 'todo');
    container.append(todo);

    const todoTitle = createMyElement('h1', 'TODO', 'todo__title');
    const todoCreate = createMyElement('div', '', 'todo__create');
    todo.append(todoTitle);
    todo.append(todoCreate);

    const createBlock = createMyElement('div', '', 'create__block');
    const createInput = createMyElement('input', '', '');
    const createButton = createMyElement('button', 'Create', '');
    createButton.addEventListener('click', () => {
      if (createInput.value.trim().length !== 0) {
        addItem(createInput.value);
      }
    });
    todoCreate.append(createBlock);
    createBlock.append(createInput);
    createBlock.append(createButton);
    new TodoList().render(array, editItem, changeStatus, deleteItem);
  }
}




new Controller().start();
