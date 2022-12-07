function createTaskHtml(id, name, description, assignedTo, dueDate, status) {
    const html = `
        <li data-task-id="${id}" class="list-group-item ">
            <div class="d-flex w-100 my-2 justify-content-between align-items-center">
                <h5>${name}</h5>
                <span class="badge ${status === 'TODO' ? 'badge-danger' : 'badge-success'}">${status}</span>
            </div>
            <div class="d-flex w-100 mb-3 justify-content-between">
                <small>Assigned To: ${assignedTo}</small>
                <small>Due: ${dueDate}</small>
            </div>
            <p>${description}</p>
            <button type="button" class="delete-button btn btn-danger">Delete this task</button>
            <button type="button" class="done-button btn btn-success ${status === 'TODO' ? 'visible' : 'invisible'}">Mark as done</button>

        </li>
    `;
    
    return html;
}

class TaskManager {
    constructor(currentId) {
        this.tasks = [];
        this.currentId = 0;
    }

    addTask(name, description, assignedTo, dueDate) {
        var name = document.querySelector("#name").value;
        var description = document.querySelector("#description").value;
        var assignedTo = document.querySelector("#assignedTo").value;
        var dueDate = document.querySelector("#dueDate").value;
        var status = 'TODO';

        const task = {
            id: this.currentId++,
            name: document.querySelector("#name").value,
            description: document.querySelector("#description").value,
            assignedTo: document.querySelector("#assignedTo").value,
            dueDate: document.querySelector("#dueDate").value,
            status: 'TODO'
        }

        this.tasks.push(task);
    }

    render() {
        let tasksHtmlList = [];
        let tasksHtmlVar = tasksHtmlList;

        for (let i = 0; i < this.tasks.length; i++) {
            let currentTask = this.tasks[i];
            const newDate = new Date(currentTask.dueDate);
            
            const formattedDate = (newDate.getMonth() + 1) + '/' + newDate.getDate() + '/' + newDate.getFullYear() + ',' + ' ' + newDate.getHours() + ':' + newDate.getMinutes();
            let taskHtml = createTaskHtml(currentTask.id, currentTask.name, currentTask.description, currentTask.assignedTo, formattedDate, currentTask.status);
            tasksHtmlList.push(taskHtml);
            for (let i = 0; i < tasksHtmlList.length; i++) {
                document.getElementById("taskList").innerHTML = tasksHtmlList;
            }
        }

        const tasksHtml = tasksHtmlList.join('\n');
        const tasksList = document.querySelector('#taskList');
        tasksList.innerHTML = tasksHtml;
    }

    getTaskById(taskId) {
        let foundTask = taskId;
        for (let x = 0; x < this.tasks.length; x++) {
            let task = this.tasks[x];
            if (task.id == foundTask) {
                return task;
            }
        }
    }

    save() {
        let tasksJson = JSON.stringify(this.tasks);
        localStorage.setItem('tasks', tasksJson);
        let currentId = String(this.currentId);
        localStorage.setItem('currentId', currentId);
    }

    load() {
        if (localStorage.getItem('tasks')) {
            const tasksJson = localStorage.getItem('tasks');
            this.tasks = JSON.parse(tasksJson);
        }

        if (localStorage.getItem('currentId')) {
            const currentId = localStorage.getItem('currentId');
            this.currentId = Number(currentId);
        }
    }

    deleteTask(taskId) {
        //Made a new array and then stored it in a new variable = newTasks
        const newTasks = [];

        // I Looped through the tasks
        for (let i =0; i < this.tasks.length; i++) {
            // Get the current task in the loop
            const task = this.tasks[i];

            // verify if the task ID is not the task ID passed in as a parameter
            if (task.id !== taskId) {
                // Then Push the task to the newTasks array
                newTasks.push(task);
            }
        }

        //this.tasks to newTasks
        this.tasks = newTasks;
    }

}

let newTaskVar = new TaskManager();

newTaskVar.load();
newTaskVar.render();