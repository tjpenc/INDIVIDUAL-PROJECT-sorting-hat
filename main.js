//render students function, will use for student section AND voldemorts army
const renderStudentCards = (elementToPopulate, array) => {
  let domString = "";
  for (student of array) {
  domString += `<div class="card" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">${student.name}</h5>
    <p class="card-text">${student.house}</p>
    <a href="#" class="btn btn-danger">EXPEL</a>
  </div>
</div>`
  }
  elementToPopulate.innerHTML = `<h1>Enrolled Students</h1>` + domString;
}


// SORTING FORM FUNCTIONALITY
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
