function createToDoList({
  createInputEl ,
  createBtnAdd,
  createCheckBox,
  createTaskName,
  createBtnRemove,
  createBtnEdit
}) {
  let items = [];
  let id = 1;
  const inputEl = createInputEl();
  const btnAdd = createBtnAdd();
  const body = document.querySelector('.todo-list');

  function handleCheckItem(event) {
    const listEl = event.target.parentNode;
    const itemValue = listEl.querySelector(".list-item__value");
    const indexEl = items.findIndex((value) => value.id == listEl.id);
    items = [
      ...items.slice(0,indexEl),
      {...items[indexEl],state: !items[indexEl].state},
      ...items.slice(indexEl+1,items.length)
    ];
    if(!items[indexEl].state) {
      itemValue.style.textDecoration = "line-through";
    }
    else {
      itemValue.style.textDecoration = "none";
    }
    console.log(items);
  }
  function handleRemoveClick(event) {
    const listEl = event.target.parentNode;
    const indexEl = items.findIndex((value) => value.id == listEl.id);
    items = [
      ...items.slice(0,indexEl),
      ...items.slice(indexEl+1,items.length)
    ];
    console.log(items);
    listEl.remove();
  }

  function handleEditClick(event) {
    if(inputEl.value.trim() !== "") {
      const listEl = event.target.parentNode;
      const taskName = listEl.querySelector(".list-item__value");
      const indexEl = items.findIndex((value) => value.id == listEl.id);
      items = [
        ...items.slice(0,indexEl),
        {...items[indexEl],name: inputEl.value},
        ...items.slice(indexEl+1,items.length)
      ];
      taskName.textContent = inputEl.value;
      inputEl.value = "";
      console.log(items);
    }
    else {
      alert("Please enter task to edit");
    }

  }

  function handleButtonAddClick(event) {
    handleAddItem();
  }
  function handleKeyUpEnter(event) {
    if(event.keyCode == 13) {
      handleAddItem();
    }
  }
  function handleAddItem() {
    if(inputEl.value.trim() != '') {
      const item = document.createElement('div');
      item.classList = "todo-list__item";
      item.id = id;

      // create checkbox
      const checkbox = createCheckBox();
      checkbox.addEventListener('click', handleCheckItem);

      // create task name
      const itemValue = createTaskName(inputEl.value);

      // create button remove
      const btnRemove = createBtnRemove();
      btnRemove.addEventListener('click', handleRemoveClick);

      // create button edit
      const btnEdit = createBtnEdit();
      btnEdit.addEventListener('click', handleEditClick);

      body.appendChild(item);
      item.insertAdjacentElement("afterbegin",checkbox);
      item.appendChild(itemValue);
      item.insertAdjacentElement("beforeend",btnEdit);
      item.insertAdjacentElement("beforeend",btnRemove);
      items.push({
        id: id,
        state: true,
        name: inputEl.value,
      });
      id = id + 1;
      console.log(items);
      inputEl.value = "";
    }
    else {
      alert("Please enter task");
    }
  }
  function handleButtonAdd() {
    btnAdd.addEventListener('click', handleButtonAddClick);
  }

  function handleKeyUp() {
    inputEl.addEventListener('keyup', handleKeyUpEnter);
  }

  function init(){
    const createElement = document.createElement('div');
    createElement.appendChild(inputEl);
    createElement.appendChild(btnAdd);
    const createHeader = document.createElement('div');
    createHeader.classList = 'todo-list__header'
    createHeader.innerHTML = "<div> Status </div> <div> Name of task </div> <div> Actions </div>" ;
    body.appendChild(createElement);
    body.appendChild(createHeader);
    handleKeyUp();
    handleButtonAdd();
  }

  init();

}
createToDoList({
  createInputEl : function() {
    const inputEl = document.createElement('input');
    inputEl.placeholder = 'Add a task';
    inputEl.classList = "input-list";
    return inputEl;
  },
  createBtnAdd : function() {
    const btnAdd = document.createElement('button');
    btnAdd.textContent = "Add";
    btnAdd.classList = "add-list";
    return btnAdd;
  },
  createCheckBox : function() {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = false;
    checkbox.classList = 'todo-list__checkbox';
    return checkbox;
  },
  createTaskName : function(val) {
    const itemValue = document.createElement('div');
    itemValue.textContent = val ;
    itemValue.classList = "list-item__value";
    return itemValue;
  },
  createBtnRemove : function() {
    const btnRemove = document.createElement('button');
    btnRemove.textContent = 'Remove';
    btnRemove.classList = 'btn-remove';
    return btnRemove;
  }
  ,
  createBtnEdit : function() {
    const btnEdit = document.createElement('button');
    btnEdit.textContent = 'Edit';
    btnEdit.classList = 'btn-edit';
    return btnEdit;
  }
});
