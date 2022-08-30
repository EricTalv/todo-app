

// declare global variables
var list = document.querySelector('#todo__list');

var submitButton = document.querySelector('#todo__button');

var todoInput = document.querySelector('#todo__input');

var statusText = document.querySelector('#todo__status');

var listCounter = 0;

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
    
    listCounter++;

    // create item element skeleton
    const listItem = document.createElement('li');
    const divWrapper = document.createElement('div');
    const itemSpanText = document.createElement('span');
    const itemSpanKey = document.createElement('span');
    const divContent = document.createElement('div');
    const divActions = document.createElement('div');
    const anchorDelete = document.createElement('a');
    const anchorUpdate = document.createElement('a');

    // add classes to elements
    listItem.setAttribute('class', 'todo__item');
    divWrapper.setAttribute('class', 'todo__item__wrapper');
    itemSpanKey.setAttribute('class', 'todo__item--key');
    itemSpanText.setAttribute('class', 'todo__item--text');
    divContent.setAttribute('class', 'todo__item__content');
    divActions.setAttribute('class', 'todo__item__actions');
    anchorDelete.setAttribute('class', 'todo__item--delete');
    anchorUpdate.setAttribute('class', 'todo__item--update');


    /* append elements */
    // todo content
    divContent.appendChild(itemSpanKey);
    divContent.appendChild(itemSpanText);

    // actions and content > wrapper
    divWrapper.appendChild(divContent);
    divWrapper.appendChild(divActions);

    // todo actions
    divActions.appendChild(anchorDelete);
    divActions.appendChild(anchorUpdate);

    // wrapper > list item
    listItem.appendChild(divWrapper);
   
    // append list-item to list element
    list.appendChild(listItem);

    // add text values
    itemSpanKey.innerHTML = `${listCounter}.`;
    itemSpanText.innerHTML = todoInput.value;
    anchorDelete.innerHTML = "x";
    anchorUpdate.innerHTML = "o";


    // reset input & status
    todoInput.value = "";
    statusText.innerHTML = "";
  }

}