// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId")) || 1;

// Todo: create a function to generate a unique task id
function generateTaskId() {
    const id = nextId;
    nextId++;
    localStorage.setItem("nextId", JSON.stringify(nextId));
    return id;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    const dueDate = dayjs(task.dueDate);
    const today = dayjs();
    const daysUntilDue = dueDate.diff(today, 'day');
    
    // Determine card color based on due date
    let cardClass = 'card mb-3';
    let bgColor = 'bg-white';
    if (daysUntilDue < 0) {
        bgColor = 'bg-danger bg-opacity-55'; // Red for overdue
    } else if (daysUntilDue <= 2) {
        bgColor = 'bg-warning bg-opacity-55'; // Yellow for near deadline
    }

    return $(`
        <div class="${cardClass}" data-task-id="${task.id}">
            <div class="card-header ${bgColor}">
                <h3 class="card-title h5 mb-1">${task.title}</h3>
                <span class="badge ${daysUntilDue < 0 ? 'bg-danger' : 'bg-primary'}">
                    Due: ${dueDate.format('MM/DD/YYYY')}
                </span>
            </div>
            <div class="card-body ${bgColor}">
                <p class="card-text">${task.description}</p>
                <button class="btn btn-danger delete-task" data-task-id="${task.id}">
                    Delete
                </button>
            </div>
        </div>
    `);
}
// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    $("#todo-cards, #in-progress-cards, #done-cards").empty();

    taskList.forEach(task => {
        const taskCard = createTaskCard(task);
        $(`#${task.status}-cards`).append(taskCard);
    });

    $(".card").draggable({
        revert: "invalid",
        cursor: "move",
        helper: "clone",
        zIndex: 100
    });

    localStorage.setItem("tasks", JSON.stringify(taskList));
}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    event.preventDefault();
    
    const task = {
        id: generateTaskId(),
        title: $("#task-title").val(),
        description: $("#task-description").val(),
        dueDate: $("#taskDueDate").val(),
        status: "todo"
    };
    
    taskList.push(task);
    renderTaskList();
    
    $("#formModal").modal("hide");
    $("#taskForm")[0].reset();
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){
    const taskId = parseInt($(event.target).attr("data-task-id"));
    taskList = taskList.filter(task => task.id !== taskId);
    renderTaskList();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    const taskId = parseInt(ui.draggable.attr("data-task-id"));
    const newStatus = $(event.target).closest('.lane').attr('id').replace("-card");
    
    taskList = taskList.map(task => {
        if (task.id === taskId) {
            return { ...task, status: newStatus };
        }
        return task;
    });
    
    renderTaskList();
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    
    $("#taskDueDate").datepicker({
        dateFormat: "yy-mm-dd",
        
    });
    
  
    $(".lane").droppable({
        accept: ".card",
        drop: handleDrop,
        classes: {
            "ui-droppable-hover": "bg-secondary bg-opacity-10"
        }
    });
    
   
    $("#taskForm").on("submit", handleAddTask);
    $(document).on("click", ".delete-task", handleDeleteTask);
    
   
    renderTaskList();

    setInterval(renderTaskList, 60000);
});
