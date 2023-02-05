const appContainer = document.querySelector("#app-container");
const voldArmy = [];
const enrolledStudents = [];
let currentHouseArray = [];
let currentHouse = "";
let studentId = 0;
let isFiltered = false;
let areFighting = false;


// Initialize welcome form and start the app
const startApp = () => {
  appContainer.innerHTML = `<div id="initial-form">
  <h1>The Sorting Hat Welcomes You</h1>
  <button type="button" class="btn btn-success" id="start-button">Begin Sorting!</button>
</div>`
}

startApp();

// Create a function to render rest of application when called
const renderForm = (event) => {
  appContainer.innerHTML = `<div id="sorting-form-div">
  <div id="input-and-sort-container">
  <form class="form-floating">
    <span>Student:</span>
    <input type="text" class="form-control" id="floatingInputValue" placeholder="student name" required>
    <button type="button" id="sort-button" class="btn btn-warning"><span id="sort-button-text">Sort</span></button>
  </form>
  <div id="hat-message"></div>
  </div>
<div class="filter-button-container">
  <div id="filter-div">Filter Students By House</div>
  <button type="button" id="all" class="btn btn-info">All Students</button>
  <button type="button" id="gryffindor" class="btn btn-info">Gryffindor</button>
  <button type="button" id="hufflepuff" class="btn btn-info">Hufflepuff</button>
  <button type="button" id="ravenclaw" class="btn btn-info">Ravenclaw</button>
  <button type="button" id="slytherin" class="btn btn-info">Slytherin</button>
</div>
</div>
<div id="card-section">
<div id="student-section">
  <h1>Enrolled Students</h1>
  <div id="student-section-div">
  </div>
</div>
<div id="voldemorts-army">
  <h1>Voldemorts Army >:)</h1>
  <div id="voldemorts-army-div">
  </div>
</div>
</div>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>`
}

//Add funcitonality to "Begin Sorting" button
appContainer.addEventListener("click", (event) => {
  if (event.target.id === "start-button") {
    renderForm();
  }
});

//Create function to render students who have been sorted
const renderStudentCards = (array) => {
  let domString = "";
  for (const student of array) {
    domString += `<div class="card" style="width: 10rem;">
    <div class="card-body" id="${student.house}">
      <h5 class="card-title">${student.name}</h5>
      <p class="card-text">${student.house}</p>
      <a href="#" class="btn btn-danger expel" id="expel--${student.id}">EXPEL</a>
    </div>
  </div>` 
    }
  document.querySelector("#student-section-div").innerHTML = domString;
}

//Create function to sort the students
const sortStudent = () => {
  const inputField = document.querySelector("#floatingInputValue");
  const studentName = inputField.value.trim();
  if (!studentName) {
    alert("Theres no student here!")
  } else {
    const randomNum = Math.floor(Math.random() * 4);
    const studentHouses = ["Gryffindor", "Hufflepuff", "Slytherin", "Ravenclaw"];
    const studentHouse = studentHouses[randomNum];
    const newStudent = {
      id: studentId,
      name: studentName,
      house: studentHouse
    }
    studentId++;
    enrolledStudents.push(newStudent);
    announceHouse(newStudent);
    decideWhoToRender(newStudent);
    document.querySelector(".form-floating").reset();
  } 
}

const announceHouse = (newStudent) => {
  document.querySelector("#hat-message").innerHTML = `<p id=${newStudent.house}>${newStudent.name} joined ${newStudent.house}!</p>`; 
}

const decideWhoToRender = (newStudent) => {
  if (!isFiltered) {
    renderStudentCards(enrolledStudents);
  } else if (isFiltered && newStudent.house === currentHouse) {
    filterByHouse(newStudent.house);
    renderStudentCards(currentHouseArray);
  }
}

//Create function to filter students into separate houses when called
const filterByHouse = (house) => {
  isFiltered = true;
  const houseArray = [];
  for (student of enrolledStudents) {
    if (student.house === house) {
      houseArray.push(student);
    }
  }
  currentHouseArray = houseArray;
  currentHouse = house;
  return houseArray;
}

//Create function to render Voldemorts Army cards
const renderVoldyCards = (array) => {
  let domString = "";
  for (const student of array) {
    domString += `<div class="card" id="voldemort-member" style="width: 10rem;">
    <div class="card-body">
      <h5 class="card-title">${student.name}</h5>
      <p class="card-text">${student.house}</p>
      <a href="#" class="btn btn-danger expel" id="AWOL--${student.id}">Go AWOL</a>
    </div>
  </div>` 
    }
  document.querySelector("#voldemorts-army-div").innerHTML = domString;
}

//Create function to expel students and push them into voldemorts army
const expelStudent = () => {
  const [, id] = event.target.id.split("--");
  const index = enrolledStudents.findIndex(student => student.id === Number(id));
  const newRecruit = enrolledStudents.splice(index, 1)[0];
  decideWhoToRender(newRecruit);
  newRecruit.house = "Voldemorts Army";
  voldArmy.push(newRecruit);
  renderVoldyCards(voldArmy);
  if ((enrolledStudents.length >= 0 && voldArmy.length >= 2 && areFighting === false)) {
    areFighting = true;
    setTimeout(beginBattle, 2000);
  }
}

//Create function to permanently delete student when in Voldemorts Army
const deleteStudent = () => {
  const htmlId = [...event.target.id];
  const objectId = (htmlId[htmlId.length - 1]);
  const index = voldArmy.findIndex(student => student.id === Number(objectId));
  voldArmy.splice(index, 1);
  renderVoldyCards(voldArmy);
}

//Add functionality to all buttons based on their ID
const handleButtons = (event) => {
  if (event.target.id === "sort-button" || event.target.id === "sort-button-text") {
    sortStudent();
  } else if (event.target.id === "all") {
    isFiltered = false;
    renderStudentCards(enrolledStudents);
  } else if (event.target.id === "gryffindor") {
    const gryfStudents = filterByHouse("Gryffindor");
    renderStudentCards(gryfStudents);
  } else if (event.target.id === "hufflepuff") {
    const huffStudents = filterByHouse("Hufflepuff");
    renderStudentCards(huffStudents);
  } else if (event.target.id === "ravenclaw") {
    const raveStudents = filterByHouse("Ravenclaw");
    renderStudentCards(raveStudents);
  } else if (event.target.id === "slytherin") {
    const snekStudents = filterByHouse("Slytherin");
    renderStudentCards(snekStudents);
  } else if (event.target.id.includes("expel")) {
    expelStudent();
  } else if (event.target.id.includes("AWOL")) {
    deleteStudent();
  }
}

//Add event listener to the whole app
appContainer.addEventListener("click", (event) => {
  event.preventDefault();
  handleButtons(event);
});

// -----------------------------------SECRET BATTLE FUNCTIONALITY ---------------------------------
const beginBattle = () => {
      alert("The death eater army grows, I hope nothing bad happens...");
      appContainer.innerHTML += `<div id=fight-button-container><button id="fight-button">Fight!</button></div>`
}

const makeWizardsFight = () => {
  const goodGuys = enrolledStudents.length;
  const badGuys = voldArmy.length;
  const goodDiceRoll = Math.round(Math.random() * goodGuys);
  const badDiceRoll = Math.round(Math.random() * badGuys);
  let damage = goodDiceRoll - badDiceRoll;
  calculateBattleResults(damage);
}

const calculateBattleResults = (damage) => {
  let battleResultText = "";
  let fallenSoldiersNames = "";
  let numFallenSoldiers = damage;
  let fightContinuesText = "";
  let battleResult = [];
  if (voldArmy.length === 0) {
    battleResult = deathEatersDefeated();
  } else if (enrolledStudents.length === 0) {
    battleResult = studentsDefeated();
  } else if (damage > 0) {
    battleResult = deathEatersHurt(damage);
  } else if (damage < 0) {
    damage *= -1;
    battleResult = studentsHurt(damage);
  } else if (damage === 0) {
    battleResult = tiedFight();
  }
  renderFightInfo(battleResult);
}

const deathEatersDefeated = () => {
  battleResultText = "The death eaters are defeated!";
  numFallenSoldiers = "Casualties: 0";
  fallenSoldiersNames = "Nobody was hurt";
  fightContinuesText = "The fight is over... for now";
  return [battleResultText, numFallenSoldiers, fallenSoldiersNames, fightContinuesText];
}

const studentsDefeated = () => {
  battleResultText = "There is no one left to defend hogwarts";
  numFallenSoldiers = "Casualties: 0";
  fallenSoldiersNames = "The infirmary is full";
  fightContinuesText = "The fight is lost, darkness has won";
  return [battleResultText, numFallenSoldiers, fallenSoldiersNames, fightContinuesText];
}

const deathEatersHurt = (damage) => {
  fallenSoldiersNames = "";
  battleResultText = "The death eaters took a hit!";
  const fallenSoldiers = voldArmy.splice(0, damage);
  numFallenSoldiers = "Casualties: " + fallenSoldiers.length;
  for (const soldier of fallenSoldiers) {
    fallenSoldiersNames += `Death Eater ${soldier.name} has retreated <br>`;
  }
  if (voldArmy.length > 0) {
    fightContinuesText = "The fight rages on!";
  } else {
    fightContinuesText = "Hogwarts is safe... for now";
  }
  renderVoldyCards(voldArmy);
  return [battleResultText, numFallenSoldiers, fallenSoldiersNames, fightContinuesText];
}

const studentsHurt = (damage) => {
  fallenSoldiersNames = "";
  battleResultText = "Students have been injured in battle!";
  const fallenSoldiers = enrolledStudents.splice(0, damage);
  numFallenSoldiers = "Casualties: " + fallenSoldiers.length;
  for (const soldier of fallenSoldiers) {
    fallenSoldiersNames += `Student ${soldier.name} has been sent to the infirmary <br>`;
  }
  if (enrolledStudents.length > 0) {
    fightContinuesText = "The fight rages on!";
  } else {
    fightContinuesText = "Death eaters have won... will no one fight?";
  }
  renderStudentCards(enrolledStudents);
  return [battleResultText, numFallenSoldiers, fallenSoldiersNames, fightContinuesText];
}

const tiedFight = () => {
  battleResultText = "The forces are tied";
  numFallenSoldiers = "Casualties: 0";
  fallenSoldiersNames = "Nobody was hurt";
  fightContinuesText = "The battle rages on";
  return [battleResultText, numFallenSoldiers, fallenSoldiersNames, fightContinuesText];
}

const renderFightInfo = (array) => {
  const fightInfo = `<div id="battle-results"><p>${array[0]}</p><p>${array[1]}</p><p>${array[2]}</p><p>${array[3]}</p><button id="clear-battle-info">Continue</button></div>`;
  appContainer.innerHTML += fightInfo;
}

appContainer.addEventListener("click", (event) => {
  if (event.target.id === "fight-button") {
    renderStudentCards(enrolledStudents);
    makeWizardsFight();
  } else if (event.target.id === "clear-battle-info") {
    const battleResultsContainer = document.querySelector("#battle-results");
    appContainer.removeChild(battleResultsContainer);
  }
})
