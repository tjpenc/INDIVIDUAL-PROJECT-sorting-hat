const appContainer = document.querySelector("#app-container");
const voldArmy = [];
const enrolledStudents = [];
let studentId = 0;

// Initialize welcome form and start the app
const startApp = () => {
  appContainer.innerHTML = `<div id="initial-form">
  <h1>Welcome</h1>
  <h2>I am sorting hat lets do this</h1>
  <button type="button" class="btn btn-success" id="start-button">Begin Sorting!</button>
</div>`
}

startApp();

// Create a function to render rest of application when called
const renderForm = (event) => {
  appContainer.innerHTML = `<div id="sorting-form-div">
  <form class="form-floating">
    <span>Student:</span>
    <input type="text" class="form-control" id="floatingInputValue" placeholder="student name" required>
    <button type="button" id="sort-button" class="btn btn-warning">Sort</button>
  </form>
<div class="filter-button-container">
  <button type="button" id="all" class="btn btn-info">All Students</button>
  <button type="button" id="gryffindor" class="btn btn-info">Gryffindor</button>
  <button type="button" id="hufflepuff" class="btn btn-info">Hufflepuff</button>
  <button type="button" id="ravenclaw" class="btn btn-info">Ravenclaw</button>
  <button type="button" id="slytherin" class="btn btn-info">Slytherin</button>
</div>
</div>
<div id="student-section-div">
  <h1>Enrolled Students</h1>
</div>
<div id="voldemorts-army-div">
  <h1>Voldemorts Army >:)</h1>
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
  let domString = "<h1>Enrolled Students</h1>";
  for (const student of array) {
    domString += `<div class="card" style="width: 18rem;">
    <div class="card-body">
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
    document.querySelector(".form-floating").reset();
  }
  renderStudentCards(enrolledStudents);
}
//Create function to filter students into separate houses when called
const filterByHouse = (house) => {
  const houseArray = [];
  for (student of enrolledStudents) {
    if (student.house === house) {
      houseArray.push(student);
    }
  }
  return houseArray;
}
//Create function to render Voldemorts Army cards
const renderVoldyCards = (array) => {
  let domString = "<h1>Voldemorts Army >:)</h1>";
  for (const student of array) {
    domString += `<div class="card" style="width: 18rem;">
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
  const htmlId = [...event.target.id];
  const objectId = (htmlId[htmlId.length - 1]);
  const index = enrolledStudents.findIndex(student => student.id === Number(objectId));
  const newRecruit = enrolledStudents.splice(index, 1);
  newRecruit[0].house = "Voldemorts Army";
  voldArmy.push(...newRecruit);
  renderStudentCards(enrolledStudents);
  renderVoldyCards(voldArmy);
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
  if (event.target.id === "sort-button") {
    sortStudent();
  } else if (event.target.id === "all") {
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
appContainer.addEventListener("click", handleButtons);
