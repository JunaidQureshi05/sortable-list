const draggable_list = document.getElementById("draggable-list");
const check = document.getElementById("check");

// correct order
const countriesGDP = [
  "United States",
  "China",
  "Japan",
  "Germany",
  "United Kingdom",
  "India",
  "France",
  "Italy",
  "Canada",
  "South Korea",
];

// store listitems

const listItems = [];

let dragStartIndex;

createList();

// insert list items into DOM

function createList() {
  [...countriesGDP]
    .map((country) => ({ value: country, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((country, idx) => {
      const listItem = document.createElement("li");
      listItem.setAttribute("data-index", idx);
      listItem.innerHTML = `<span class="number">${idx + 1}</span>
    <div class="draggable" draggable="true">
    <p class="country-name"> ${country.value}</p>
    <i class="fas fa-grip-lines"></i>
    </div>
    `;

      listItems.push(listItem);
      draggable_list.appendChild(listItem);
    });
  addEventListeners();
}

function dragStart() {
  // console.log('Event: ', 'dragstart');
  dragStartIndex = +this.closest("li").getAttribute("data-index");
}

function dragEnter() {
  this.classList.add("over");
}

function dragLeave() {
  this.classList.remove("over");
}

function dragOver(e) {
  e.preventDefault();
}

function dragDrop() {
  const dragEndIndex = +this.getAttribute("data-index");
  swapItems(dragStartIndex, dragEndIndex);
  this.classList.remove("over");
}

// Swap list items that are dragged and droped
function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector(".draggable");
  const itemTwo = listItems[toIndex].querySelector(".draggable");

  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}

// check the order of list items
function checkOrder() {
  console.log(124);
  listItems.forEach((listItem, idx) => {
    const countryName = listItem.querySelector(".draggable").innerText.trim();

    if (countryName !== countriesGDP[idx]) {
      console.log("wrong");
      listItem.classList.add("wrong");
    } else {
      listItem.classList.remove("wrong");
      listItem.classList.add("right");
    }
  });
}

function addEventListeners() {
  const draggables = document.querySelectorAll(".draggable");
  const draggableListItems = document.querySelectorAll(".draggable-list li");
  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", dragStart);
  });
  draggableListItems.forEach((item) => {
    item.addEventListener("dragover", dragOver);
    item.addEventListener("drop", dragDrop);
    item.addEventListener("dragenter", dragEnter);
    item.addEventListener("dragleave", dragLeave);
  });
}

check.addEventListener("click", checkOrder);
