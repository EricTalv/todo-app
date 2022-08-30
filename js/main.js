

// declare global variables
var list = document.querySelector('#todo__list');

var submitButton = document.querySelector('#todo__button');

var todoInput = document.querySelector('#todo__input');

var statusText = document.querySelector('#todo__status');

// populate list on page load 
// populateList();

// add event listeners to inputs
submitButton.addEventListener('click', addItemToList);

todoInput.addEventListener("keypress", function(event) {

  if (event.key === "Enter") {
    
    if (!todoInput.value) {
      statusText.innerHTML = "input is empty.";
    } else {
      submitButton.click(addItemToList);
    }
  }

})

function populateList() {

  /**
   * stretch goal:
   * - create multiple pre lists
   * - randomly select a pre list to be shown on page load
   */

   const preList = ['create', 'read', 'update', 'delete'];

   preList.forEach(item => {
      // create list-item element
      const listItem = document.createElement('li');

      // append todo-input value to list item element
      listItem.appendChild(document.createTextNode(item));
      
      // set class for list item
      listItem.setAttribute('class', 'todo__item');
 
      // append list-item to list element
      list.appendChild(listItem);
 
   });

  
}

// logic to add item into list 
function addItemToList() {


  // check if input field is empty
  if (!todoInput.value) {
    statusText.innerHTML = "input is empty."

  } else {
    
    // create list-item element
    const listItem = document.createElement('li');

    // append todo-input value to list item element
    listItem.appendChild(document.createTextNode(todoInput.value));

    // set class for list item
    listItem.setAttribute('class', 'todo__item');
  
    // append list-item to list element
    list.appendChild(listItem);

    // reset input & status
    todoInput.value = "";
    statusText.innerHTML = "";
  }

}