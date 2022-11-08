document.getElementById("newTaskForm").addEventListener("submit", function(event) {
    event.preventDefault();
    let name = document.querySelector("#name").value;
    let description = document.querySelector("#description").value;
    let assignedTo = document.querySelector("#assigned").value;
    let dueDate = document.querySelector("#due").value;
    let status = 'TODO';

    if (name.length === 0 || description.length === 0 || assignedTo.length === 0 || dueDate.length === 0) {
        console.log('Please fill out all fields!');
        let myAlert = document.getElementById('alertMe');
        myAlert.style.display = 'block';
    } else {
        console.log('All fields filled!');
        let myAlert = document.getElementById('alertMe');
        myAlert.style.display = 'none';
        newTaskVar.addTask();
        newTaskVar.render();
        newTaskVar.save();
    }
});