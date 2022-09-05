/**
 * Global Variables
 */

var list = document.querySelector("#todo__list");
var submitButton = document.querySelector("#todo__button");
var todoInput = document.querySelector("#todo__input");
var statusText = document.querySelector("#todo__status");

var itemCounter = 0;
var listItems = [];

/**
 * Event Listeners
 */

submitButton.addEventListener("click", addItemToList);
list.addEventListener("click", (event) => {
  deleteItem(event);
  updateItem(event);
});

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
    itemCounter++;

    let itemValue = todoInput.value;
    let itemId = itemCounter;
    let itemListIndex = itemCounter - 1;

    // push item to array

    const item = { id: itemId, value: itemValue };
    listItems.push(item);

    // create item element skeleton
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
    anchorDelete.innerHTML = "DEL";
    anchorUpdate.innerHTML = "UPD";

    // reset input & status
    todoInput.value = "";
    statusText.innerHTML = "";
  }
}

// D - delete item from list
function deleteItem(event) {
  const element = event.target;

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

        // remove element from dom
        element.closest('#todo__item').remove();


     
      } else {
        console.log("object not found");
      }
    } else {
      console.log("item id not found");
    }
  } else {
    console.log("update button not found");
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

        // find object array index
        let itemObjIndex = listItems.indexOf(currentlySelectedItem);

        // set value in array object
        listItems[itemObjIndex].value = promptValue;

        // set data attribute in dom
        parent.setAttribute("data-value", promptValue);

        // change value in dom
        parent.querySelector(".todo__item--text").innerHTML = promptValue;
      } 
    } 
  }
}

// Local storage
function saveToLocalStorage() {}
