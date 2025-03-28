// Waits for the page to fully load before executing 'loadStudents' function
document.addEventListener("DOMContentLoaded", loadStudents);

// Get references to the form and student list table
const form = document.getElementById("student-form");
const studentList = document.getElementById("student-list");

// Event listener for form submission
form.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevents the page from refreshing on form submission

    // Get input values and remove extra spaces
    const name = document.getElementById("name").value.trim();
    const studentId = document.getElementById("student-id").value.trim();
    const email = document.getElementById("email").value.trim();
    const contact = document.getElementById("contact").value.trim();

    // Validation: Check if any field is empty
    if (!name || !studentId || !email || !contact) {
        alert("All fields are required!");
        return;
    }

    // Validation: Ensure the name contains only letters and spaces
    if (!/^[A-Za-z\s]+$/.test(name)) {
        alert("Name must contain only letters!");
        return;
    }

    // Validation: Ensure Student ID and Contact No. contain only numbers
    if (!/^\d+$/.test(studentId) || !/^\d+$/.test(contact)) {
        alert("Student ID and Contact No. must contain only numbers!");
        return;
    }

    // Create a student object with the form data
    const student = {
        name,
        studentId,
        email,
        contact
    };

    
    let students = getStudents();
    
    
    students.push(student);
    
    
    saveStudents(students);
    
  
    form.reset();
    
    
    renderStudents();
});

// Function to retrieve students from localStorage
function getStudents() {
    return JSON.parse(localStorage.getItem("students")) || []; 
}

// Function to save student data to localStorage
function saveStudents(students) {
    localStorage.setItem("students", JSON.stringify(students)); 
}

// Function to load and display students when the page loads
function loadStudents() {
    renderStudents(); 
}

// Function to display student data in the table
function renderStudents() {
    studentList.innerHTML = ""; 

    
    const students = getStudents();

    // Loop through the student array and create table rows
    students.forEach((student, index) => {
        const row = document.createElement("tr"); 

        // Fill row with student details and action buttons
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.studentId}</td>
            <td>${student.email}</td>
            <td>${student.contact}</td>
            <td>
                <button class="edit-btn" onclick="editStudent(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteStudent(${index})">Delete</button>
            </td>
        `;

        // Append the row to the student list
        studentList.appendChild(row);
    });
}

// Function to delete a student from the list
function deleteStudent(index) {
    let students = getStudents(); 
    
    students.splice(index, 1); 
    
    saveStudents(students);
    
    renderStudents(); 
}

// Function to edit a student's details
function editStudent(index) {
    let students = getStudents(); 
    let student = students[index]; 

    // Populate the form fields with the existing student data for editing
    document.getElementById("name").value = student.name;
    document.getElementById("student-id").value = student.studentId;
    document.getElementById("email").value = student.email;
    document.getElementById("contact").value = student.contact;

    // Remove the existing student entry (it will be added again when submitted)
    deleteStudent(index);
}
