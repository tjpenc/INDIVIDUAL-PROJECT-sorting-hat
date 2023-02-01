// ---------------------- Create Greeting ------------------------

const htmlBody = document.querySelector("body");
const startButton = document.querySelector("#load-button");
const hiddenDiv = document.querySelector("#sorting-hat-all");
const welcomePage = document.querySelector("#initial-form");


const handleStartClick = (event) => {
  if (event.target.id === "load-button") {
    hiddenDiv.classList.toggle("hidden");
    welcomePage.classList.toggle("hidden");
    console.log("clicked");
  }
}

htmlBody.addEventListener("click", handleStartClick);





//render students function, will use for student section AND voldemorts army
const renderStudentCards = (elementToPopulate, array) => {
  let domString = "";
  for (student of array) {
  domString += `<div class="card" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">${student.name}</h5>
    <p class="card-text">${student.house}</p>
    <a href="#" class="btn btn-danger expel" id="expel--${student.id}">EXPEL</a>
  </div>
</div>` 
  }
    elementToPopulate.innerHTML = `<h1>Enrolled Students</h1>` + domString;
}

 const renderVoldemortsArmy = (elementToPopulate, array) => {
  let domString = "";
  for (student of array) {
    domString += `<div class="card" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">${student.name}</h5>
    <p class="card-text">${student.house}</p>
  </div>
</div>`
  }
  elementToPopulate.innerHTML = `<h1>Voldemorts Army</h1>` + domString;
 }

// -------------------------------- SORTING FORM FUNCTIONALITY ---------------------------

//grab elements you will need: sort button and input field
const sortButton = document.querySelector("#sorting-button");
const studentNameInput = document.querySelector("#floatingInputValue");
const studentSection = document.querySelector("#student-section-div");
const studentForm = document.querySelector(".form-floating");
//Initialize Id for student objects
let studentId = 0;
//Initialize student section array to populate OUTSIDE button
const enrolledStudents = [];
//create function to handle sort button click
const handleSortButtonClick = (event) => {
  //Get students name
  let studentName = studentNameInput.value.trim();
  //Get random house
  const housesArray = ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"];
  let studentHouse = housesArray[Math.floor(Math.random() * 4)];
  //Puts out error if no input. If input, create student object and add to array
  if (studentName) {  
    const Student = {
    id: studentId++,
    name: studentName,
    house: studentHouse
    }
    enrolledStudents.push(Student);
    studentForm.reset();
  } else {
    console.log("You need to put a name in!");
  }
  //use array to dynamically populate cards in the student section
  renderStudentCards(studentSection, enrolledStudents);
}
//add event listener to sort button
sortButton.addEventListener("click", handleSortButtonClick);

// ---------------------- ADD STUDENT CARD FUNCTIONALITY ---------------------

// Grab voldemorts army, initialize voldemorts army array
const voldysArmyDiv = document.querySelector("#voldemorts-army-div");
const voldysArmy = [];
//so select expel button, select entire div that buttons will be found which is studentSection
//Do that thing we did to grab the id of the object associated with an event 
//Remove it from array and push it into voldys array
//Re-render both arrays
const expelStudent = (event) => {
  if (event.target.id.includes("expel")) {
    const [, id] = event.target.id.split("--");
    const index = enrolledStudents.findIndex(student => student.id === Number(id));
    const expelledStudent = enrolledStudents.splice(index, 1)[0];
    expelledStudent.house = "Voldemort";
    voldysArmy.push(expelledStudent);
    console.log(voldysArmy[0]);
  }
  renderStudentCards(studentSection, enrolledStudents);
  renderVoldemortsArmy(voldysArmyDiv, voldysArmy);
}

studentSection.addEventListener("click", expelStudent);
