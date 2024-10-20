// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
    return nextId++;

}

// Todo: create a function to create a task card
function createTaskCard(task) {
    const card  = $(`
        <div class="card mb-3" id="task-${task.id}">
            <div class="card-body">
                <h5 class="card-title">${task.title}</h5>
                <p class="card-text">${task.description}</p>
                <p class="card-text"><small class="text-muted">Due: ${task.dueDate}</small></p>
                <button class="btn btn-danger delete-task" data-id="${task.id}">Delete</button>
            </div>
        </div>`)

}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    $("#todo-cards").empty();
    $("#in-progress-cards").empty();
    $("#done-cards").empty();

    taskList.forEach(task => {
        const card = createTaskCard(task);
        $(`#${task.status}-cards`).append(card);
    });

    $(".card").draggable({
        revert: "invalid", 
        helper: "clone"
    });
}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    event.preventDefault();

    const title = $("#taskTitle").val();
    const description = $("taskDescription").val();
    const dueDate = $("#taskDueDate").val();
    const newTask ={
        id: generateTaskId(),
        title : title, 
        description: description, 
        dueDate: dayjs(dueDate).format ('MMM, D, YYYY'),
        status: "todo"
    };

    taskList.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(taskList));
    localStorage.setItem("nextId", JSON.stringify(nextId));
    renderTaskList();
    $("formModal").modal("hide");
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){
    const taskId = $(event.target).data("id");
    tasklist =taskList.filter(task => task.id !== taskId);
    localStorage.setItem("tasks", JSON.stringify(taskList)); 
    renderTaskList();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    const taskId = ui.draggable.attr("id").split("-")[1];
    const newStatus = $(this).attr("id").split("-")[0];
    const task = taskList.find(task => task.id == taskId); 
    task.status = newStatus; 
    localStorage.setItem("tasks", JSON.stringify(tasklist)); 
    renderTaskList(); 
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});
