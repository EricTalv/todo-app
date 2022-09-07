/**
 * Global Variables
 */

var list = document.querySelector("#todo__list");
var submitButton = document.querySelector("#todo__button");
var todoInput = document.querySelector("#todo__text-field");
var statusText = document.querySelector("#todo__status");

var itemCounter = 0;
var listItems = [];




/**
 * Event Listeners
 */

document.addEventListener('DOMContentLoaded', getTodosFromStorage);

submitButton.addEventListener("click", addItemToList);
list.addEventListener("click", (event) => {
  deleteItem(event);
  updateItem(event);
});


list.addEventListener("DOMNodeInsterted", function() {
  console.log('true');
})

// add enter-key-press functionality
todoInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    if (!todoInput.value) {
      statusText.innerHTML = "input is empty.";
    } else {
      submitButton.click(addItemToList);
    }
  }
});


/**
 *  C R U D Operations
 */

// C - create a new list item
function addItemToList() {
  // check if input field is empty
  if (!todoInput.value) {
    statusText.innerHTML = "input is empty.";
  } else {

    let itemValue = todoInput.value;

    let itemValueSanitized = itemValue.replace(/[^a-zA-Z0-9]+/ig, '');

    if (itemValueSanitized === '') {
      statusText.innerHTML = "input is empty or has special characters.";
    } else {
     createItem(itemValueSanitized);

    }
  
  }
}

function createItem(itemValue) {

  // define counter and itemId
  itemCounter++;
  let itemId = itemCounter;

  // push item to array
  const item = { id: itemId, value: itemValue };
  listItems.push(item);

  // save to local storage
  saveToLocalStorage(item);

  // create item element skeleton
  createItemSkeleton(itemId, itemValue);

  
 
}

function createItemSkeleton(itemId, itemValue) {
  const listItem = document.createElement("li");
  const divWrapper = document.createElement("div");
  const itemSpanText = document.createElement("span");
  const divContent = document.createElement("div");
  const divActions = document.createElement("div");
  const anchorDelete = document.createElement("a");
  const anchorUpdate = document.createElement("a");

  // add classes to elements
  listItem.setAttribute("class", "todo__item");
  listItem.setAttribute("id", "todo__item");
  listItem.setAttribute("data-id", itemId);
  listItem.setAttribute("data-value", itemValue);

  divWrapper.setAttribute("class", "todo__item__wrapper");
  itemSpanText.setAttribute("class", "todo__item--text");
  divContent.setAttribute("class", "todo__item__content");
  divActions.setAttribute("class", "todo__item__actions");
  anchorDelete.setAttribute("class", "todo__item--delete");
  anchorUpdate.setAttribute("class", "todo__item--update");

  /* append elements */
  // todo content
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
  itemSpanText.innerHTML = itemValue;

  // reset input & status
  todoInput.value = "";
  statusText.innerHTML = "";

}

// D - delete item from list
function deleteItem(event) {

  let element = event.target;

  if (element.classList[0] === "todo__item--delete") {
    // get parent of selected item
    const parent = element.closest("#todo__item");
    if (parent !== null) {
      // get values from parent
      let dataId = parseInt(parent.getAttribute("data-id"), 10);
      let dataValue = parent.getAttribute("data-value");
      
    
      // check for current item
      let currentlySelectedItem = listItems.find(
        (item) => item.id === dataId && item.value === dataValue
      );


      if (currentlySelectedItem) {

        // find object array index
        let itemObjIndex = listItems.indexOf(currentlySelectedItem);

        // remove value from object
        listItems.splice(itemObjIndex, 1);

        // animate deletion
        parent.classList.add('delete-animation');

        // wait till animation is finished 
        parent.addEventListener('transitionend', function(){
            // remove element from dom
            parent.remove();
        });
        
       


         /*
          remove element from storage
         */
        
         let getStoredItems = localStorage.getItem('localTodoItems'); // get local todo items string
         let itemsParsed = JSON.parse(getStoredItems); // turn string into object 
         itemsParsed.splice(itemObjIndex, 1); // change current item
         let modifiedStringifiedStorage = JSON.stringify(itemsParsed); // stringify object back
         localStorage.setItem('localTodoItems', modifiedStringifiedStorage); // push object into local storage
 
      } 
    } 
  } 
}

// U - update an existing element in the list
function updateItem(event) {
  const element = event.target;

  if (element.classList[0] === "todo__item--update") {
    // get parent of selected item
    const parent = element.closest("#todo__item");

    if (parent !== null) {
      // get values from parent
      let dataId = parseInt(parent.getAttribute("data-id"), 10);
      let dataValue = parent.getAttribute("data-value");

      // check for current item
      let currentlySelectedItem = listItems.find(
        (item) => item.id === dataId && item.value === dataValue
      );

      if (currentlySelectedItem) {
        let promptValue = prompt(`Change >__${dataValue}__< to: `);

        let promptValueSanitized = promptValue.replace(/[^a-zA-Z0-9]+/ig, '');

        if (promptValueSanitized === '') {
          alert('field cannot be empty');
        } else {

          // find object array index
          let itemObjIndex = listItems.indexOf(currentlySelectedItem);

          // set value in array 
          listItems[itemObjIndex].value = promptValueSanitized;

          // set data attribute in dom
          parent.setAttribute("data-value", promptValueSanitized);

          // change value in dom
          parent.querySelector(".todo__item--text").innerHTML = promptValueSanitized;

          /*
          change value in local storage 
          */
          
          let getStoredItems = localStorage.getItem('localTodoItems'); // get local todo items string
          let itemsParsed = JSON.parse(getStoredItems); // turn string into object 
          itemsParsed[itemObjIndex].value = promptValue; // change current item
          let modifiedStringifiedStorage = JSON.stringify(itemsParsed); // stringify object back
          localStorage.setItem('localTodoItems', modifiedStringifiedStorage); // push object into local storage

        }


      } 
    } 
  }
}


/**
 *  Local Storage
 *    - make it so your data stays put when you leave the site
 */

// save todo-item to local storage
function saveToLocalStorage(todoItem) {


  let localTodoItems;

  if (localStorage.getItem('localTodoItems') === null) {
     localTodoItems = [];
      
  } else {
    localTodoItems = JSON.parse(localStorage.getItem('localTodoItems'));
  }

  localTodoItems.push(todoItem);
  localStorage.setItem('localTodoItems', JSON.stringify(localTodoItems));
 

}

// get todo-items from storage and add items to dom
function getTodosFromStorage() {

  let localTodoItems;

  if (localStorage.getItem('localTodoItems') === null) {
    
    localTodoItems = [
      { id: 1, value: 'buy apples' },
      { id: 2, value: 'buy oranges' },
      { id: 3, value: 'buy lemons' }

    ];
     

    localStorage.setItem('localTodoItems', JSON.stringify(localTodoItems));
    
      
  } else {
    localTodoItems = JSON.parse(localStorage.getItem('localTodoItems'));
  }


  localTodoItems.forEach(function(item) {
    createItemSkeleton(item.id, item.value);
    listItems.push(item);
  });
 
}


