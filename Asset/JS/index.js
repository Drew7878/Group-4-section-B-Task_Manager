document.getElementById("newTaskForm").addEventListener("submit", function(event) {
    event.preventDefault();
    let name = document.querySelector("#name").value;
    let description = document.querySelector("#description").value;
    let assignedTo = document.querySelector("#assignedTo").value;
    let dueDate = document.querySelector("#dueDate").value;
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

let tasksList = document.querySelector("#taskList");

tasksList.addEventListener('click', (event) => {
    if (event.target.classList.contains('done-button')) {
        const parentTask = event.target.parentElement;
        const taskId = Number(parentTask.dataset.taskId);
        const task = newTaskVar.getTaskById(taskId);
        task.status = 'DONE';
        newTaskVar.render();
    }

    if (event.target.classList.contains('delete-button')) {
        const parentTask = event.target.parentElement;
        const taskId = Number(parentTask.dataset.taskId);
        newTaskVar.deleteTask(taskId);
        newTaskVar.save();
        newTaskVar.render();
    }
});