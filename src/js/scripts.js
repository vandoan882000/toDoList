function createToDoList({createInputEl , createBtnAdd}) {
  let items = [];
  let id = 1;
  const inputEl = createInputEl();
  const btnAdd = createBtnAdd();
  const body = document.querySelector('.todo-list');

  function handleCheckItem(event) {
    const listEl = event.target.parentNode;
    const itemValue = listEl.querySelector(".list-item__value");
    const indexEl = items.findIndex((value) => value.id == listEl.id);
    items = [...items.slice(0,indexEl),{...items[indexEl],state: !items[indexEl].state},...items.slice(indexEl+1,items.length)];
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
    items = [...items.slice(0,indexEl),...items.slice(indexEl+1,items.length)];
    console.log(items);
    listEl.remove();
  }

  function handleEditClick(event) {
    const listEl = event.target.parentNode;
    const taskName = listEl.querySelector(".list-item__value");
    const indexEl = items.findIndex((value) => value.id == listEl.id);
    items = [...items.slice(0,indexEl),{...items[indexEl],name: inputEl.value},...items.slice(indexEl+1,items.length)];
    taskName.textContent = inputEl.value;
    console.log(items);
  }

  function handleButtonAddClick(event) {
    if(inputEl.value.trim() != '') {
      const item = document.createElement('div');
      item.classList = "todo-list__item";
      item.id = id;

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = false;
      checkbox.classList = 'checkbox-list';
      checkbox.addEventListener('click', handleCheckItem);

      const itemValue = document.createElement('div');
      itemValue.textContent = inputEl.value ;
      itemValue.classList = "list-item__value";

      const btnRemove = document.createElement('button');
      btnRemove.textContent = 'Remove';
      btnRemove.classList = 'btn-remove';
      btnRemove.addEventListener('click', handleRemoveClick);

      const btnEdit = document.createElement('button');
      btnEdit.textContent = 'Edit';
      btnEdit.classList = 'btn-edit';
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
  function handleKeyUpEnter(event) {
    if(event.keyCode == 13) {
      if(inputEl.value.trim() != '') {
        const item = document.createElement('div');
        item.classList = "todo-list__item";
        item.id = id;

        // create checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = false;
        checkbox.classList = 'checkbox-list';
        checkbox.addEventListener('click', handleCheckItem);

        const itemValue = document.createElement('div');
        itemValue.textContent = inputEl.value ;
        itemValue.classList = "list-item__value";

        // create button remove
        const btnRemove = document.createElement('button');
        btnRemove.textContent = 'Remove';
        btnRemove.classList = 'btn-remove';
        btnRemove.addEventListener('click', handleRemoveClick);

        // create button edit
        const btnEdit = document.createElement('button');
        btnEdit.textContent = 'Edit';
        btnEdit.classList = 'btn-edit';
        btnEdit.addEventListener('click', handleEditClick);

        body.appendChild(item);
        item.insertAdjacentElement("afterbegin",checkbox);
        item.appendChild(itemValue);
        item.insertAdjacentElement("beforeend",btnEdit);
        item.insertAdjacentElement("beforeend",btnRemove);
        items.push({
          id: id,
          state: true,
          name: event.target.value,
        });
        id = id + 1;
        console.log(items);
        inputEl.value = "";
      }
      else {
        alert("Please enter task");
      }
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
  }
});
