

var list = document.getElementById('todo__list');

var listItems = [];

var addBtn = document.getElementById('todo__input--button').addEventListener('click', addItemToList);



function addItemToList() {

  const inputValue = document.getElementById('todo__input--input').value;

  const listItem = document.createElement('li');

  const statusText = document.getElementById('todo--status__text');



  if (inputValue) {


    listItem.appendChild(document.createTextNode(inputValue));

    listItem.setAttribute('class', 'todo__list--item');
  
    list.appendChild(listItem);




  } else {
    statusText.innerHTML = "input is empty."
  }
  


}