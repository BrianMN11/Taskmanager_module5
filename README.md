## Task-Manager Website 

This web application is a simple task board application that allows a team to manage project tasks from creation to progress updates and completion. 
It contains dynamically updated HTML and css powered by jquery. 
It utilizes the DayJs library to work with dates and enables an easy to use date picker in the browser. 
The below user story, acceptance criteria and mock up  were used as a guide to enable the proper development of this web application. 


## User Story

```md
AS A project team member with multiple tasks to organize
I WANT a task board 
SO THAT I can add individual project tasks, manage their state of progress and track overall project progress accordingly
```

## Acceptance Criteria

```md
GIVEN a task board to manage a project
WHEN I open the task board
THEN the list of project tasks is displayed in columns representing the task progress state (Not Yet Started, In Progress, Completed)
WHEN I view the task board for the project
THEN each task is color coded to indicate whether it is nearing the deadline (yellow) or is overdue (red)
WHEN I click on the button to define a new task
THEN I can enter the title, description and deadline date for the new task into a modal dialog
WHEN I click the save button for that task
THEN the properties for that task are saved in localStorage
WHEN I drag a task to a different progress column
THEN the task's progress state is updated accordingly and will stay in the new column after refreshing
WHEN I click the delete button for a task
THEN the task is removed from the task board and will not be added back after refreshing
WHEN I refresh the page
THEN the saved tasks persist
```

## Mock up 

The following animation demonstrates the application functionality:

![A user adds three tasks to the task board and changes the state of two of them to in progress and then completion. The user then deletes the two cards in the done column.](./05-third-party-apis-homework-demo.gif)