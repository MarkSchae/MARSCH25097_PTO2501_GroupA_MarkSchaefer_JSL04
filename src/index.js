// Starting the jsl 4 js script

/* Workflow for this code: 
    Create the html DOM for each object dynamically
    Sort each object by status
    Add the styling
    Create a button to edit each task
    Create a button to save the edits
    Create a function to save the changes to the objects using the id as a identifier
*/

// Saving the edits to the innerhtml, and then the database later in the course
// Make a save button, when clicked update the html with the inputs from the user, just get it from the input field id, also need to use the object id
// Function to show the detail view when clicking on one of the tasks and code to exit the detailed view
// Add a onclick function to each div and display the detailed information on a styled card according to the figma

// Function to allow the user to modify the description etc of the task

// Status drop down menu to change the status

// Going to need to have some code that updates the array and the html when changes are made, maybe a save changes button

/*
    Thoughts for the upcoming functionality:
        Thinking about writing the code to update the objetcs when a user edits their tasks
        Need to update the object itself
        Need to update the innerhtml so it changes with and without the reload
        Need to change the column that the task is in
        Need to make sure that the edited tasks are created dynamicaly into the correct columns etc
        Create a save changes button
        How to increment id when some tasks are deleted/other scenarios
*/
const initialTasks = [
  {
    id: 1,
    title: "Launch Epic Career 🚀",
    description: "Create a killer Resume",
    status: "todo",
  },
  {
    id: 2,
    title: "Master JavaScript 💛",
    description: "Get comfortable with the fundamentals",
    status: "doing",
  },
  {
    id: 3,
    title: "Keep on Going 🏆",
    description: "You're almost there",
    status: "doing",
  },

  {
    id: 11,
    title: "Learn Data Structures and Algorithms 📚",
    description:
      "Study fundamental data structures and algorithms to solve coding problems efficiently",
    status: "todo",
  },
  {
    id: 12,
    title: "Contribute to Open Source Projects 🌐",
    description:
      "Gain practical experience and collaborate with others in the software development community",
    status: "done",
  },
  {
    id: 13,
    title: "Build Portfolio Projects 🛠️",
    description:
      "Create a portfolio showcasing your skills and projects to potential employers",
    status: "done",
  },
];

// Generate the tasks for the html using the array of objects
    // Generate the tasks cards and implement a edit function in which we update the object based on user input 
    // Sort/filter into todo/done/doing-column using the status of the task

// Filter method for 'todo' status and display the title of the tasks
const toDoTasks = initialTasks.filter(task => task.status === 'todo');
const doneTasks = initialTasks.filter(task => task.status === 'done');
const doingTasks = initialTasks.filter(task => task.status === 'doing');

// Create the html to add to the DOM for each column
const toDoColumn = document.getElementById('todo-column');
const doneColumn = document.getElementById('done-column');
const doingColumn = document.getElementById('doing-column');

/* 
    Example to reference
    const main = document.getElementById('main-container');

    // Create a new div
    const newDiv = document.createElement('div');
    newDiv.className = 'bg-gray-200 p-4 mb-4 rounded';
    newDiv.innerText = 'This is a dynamically added div';

    // Append it to <main>
    main.appendChild(newDiv);

*/ 

// Create the function that changes the display property of the elements for the detailed tasks view
// Look to adding validation checks in the future
function detailedTasksView (task, taskDiv) {
  // Delete existing button elements
  const existingButton = document.getElementById('btn-save-changes');
  if(existingButton) {
    existingButton.remove();
  }
  // Create a save changes button, when clicked update the relavant object, maybe run a function to rebuild the columns
  const button = document.createElement('button');
  button.id = 'btn-save-changes';
  button.innerHTML = 'Save Changes';
  // Add a function to save the changes on a user click
  button.addEventListener('click', () => saveChanges(task, taskDiv));
  const detailedTaskCard = document.getElementById('detailed-task-card');
  detailedTaskCard.appendChild(button);
  const overlay = document.getElementById('backdrop');
  if (detailedTaskCard.classList.contains('hidden')) {
    detailedTaskCard.classList.remove('hidden');
    detailedTaskCard.classList.add('detailed-card-styling');
    overlay.classList.remove('hidden');
    document.getElementById('edit-title').value = task.title;
    document.getElementById('edit-description').value = task.description;
    document.getElementById('edit-task-status').value = task.status;
  }
};

// const newToDoTask = document.createElement('div');

// <div class="card-styling">Explore ES6 Features 🚀</div> Example of what the html must look like in the DOM
// Loop through each object in the new array and create the divs for each one
for(let i = 0; i < toDoTasks.length; i++) { // Could use a forEach method to make this cleaner
  const newToDoTask = document.createElement('div');
  // Add the function for the detailed view/edits/save changes of the task here
  newToDoTask.addEventListener('click', () => detailedTasksView(toDoTasks[i], newToDoTask));
  newToDoTask.className = 'card-styling';
  newToDoTask.innerHTML = toDoTasks[i].title;
  toDoColumn.appendChild(newToDoTask);
}

// Done
for(let i = 0; i < doneTasks.length; i++) { // Could use a forEach method to make this cleaner
  const doneTask = document.createElement('div');
  // Add the function for the detailed view/edits/save changes of the task here
  doneTask.addEventListener('click', () => detailedTasksView(doneTasks[i], doneTask));
  doneTask.className = 'card-styling';
  doneTask.innerHTML = doneTasks[i].title;
  doneColumn.appendChild(doneTask);
}

// Doing
for(let i = 0; i < doingTasks.length; i++) { // Could use a forEach method to make this cleaner
  const doingTask = document.createElement('div');
  // Add the function for the detailed view/edits/save changes of the task here 
  doingTask.addEventListener('click', () => detailedTasksView(doingTasks[i], doingTask));
  doingTask.className = 'card-styling'; // I must add a hover to the card-styling
  doingTask.innerHTML = doingTasks[i].title;
  doingColumn.appendChild(doingTask);
}

// So this works but because the array is hard-coded it does not really work very well
// I would like to do this and then call a function that builds the columns which will update the view with the edits
function saveChanges (task, taskDiv) {
  task.title = document.getElementById('edit-title').value;
  task.description = document.getElementById('edit-description').value;
  task.status = document.getElementById('edit-task-status').value;
  taskDiv.innerHTML = task.title;
  if (task.status.toLowerCase() === 'todo') {
    toDoColumn.appendChild(taskDiv);
  } else if (task.status.toLowerCase() === 'done') {
    doneColumn.appendChild(taskDiv);
  } else if (task.status.toLowerCase() === 'doing') {
    doingColumn.appendChild(taskDiv);
  }
};

// The function to return the page to normal when exiting the detailed view
function exitTasksView () {
  const detailedTaskCard = document.getElementById('detailed-task-card');
  const overlay = document.getElementById('backdrop'); 
  detailedTaskCard.classList.add('hidden');
  detailedTaskCard.classList.remove('detailed-card-styling');
  overlay.classList.add('hidden');
};

document.getElementById('exit-button').addEventListener('click', exitTasksView);

/* Code for JSL-03, seems to be irrelevant now as we are using the tasks data given to us to complete this project
// Save this data in an object or array and loop through when needed
const tasks = [];
// Link each task to a unique id
let uniqueId = 0; // This will probably need to be stored and fetched/updated based on the last stored number, assign the variable to the local storage
// Button to add new tasks here to run this code as a function, makes it easier to test the codes functionality
const addTaskBtn = document.querySelector('#btn-add-task');
addTaskBtn.addEventListener('click', clickToAddTask);
// Encase the code in a function that can be run on a button click
function clickToAddTask() {
    // Prompt the user to enter title, description, and status for 3 seperate tasks
    // Loop to prompt the user for 3 task entries, advance to just adding one at a time in future
    for(let i = 0; i < 3; i++) {
        // Store the user answers in variables
        const title = prompt(`Please enter the title of the task ${i + 1}`);
        const description = prompt('Please enter the description of the task');
        let taskStatus = prompt('Please enter the status of the task. Valid status: todo, done, doing').toLowerCase(); // Convert status inputs to lowercase
        // Validate the status inputs to only accept todo, doing, done, repeat the prompt until a valid input is entered
        // Run the prompt until the entry is valid 
        while (taskStatus !== 'done' && taskStatus !== 'doing' && taskStatus !== 'todo') {
            alert('Sorry you did not enter a valid status for the task, please enter todo, done, or doing');
            taskStatus = prompt('Please enter the status of the task. Valid status: todo, done, doing').toLowerCase();
        }
        //Increment id for each new task
        uniqueId++;
        // Create new object and push to the array
        tasks.push({
            uniqueId: uniqueId,
            title: title,
            description: description,
            status: taskStatus
        });
    }

    // Alert the user that they have reached the 3 task 'limit' with the alert message
    if(tasks.length == 3) {
        alert('There are enough tasks, check the console please');
    } 

    // Display the title and status of completed 'done' tasks in the console
    // Using filter function/method 
    const completedTasks = tasks.filter(task => task.status === 'done'); // Each object inside the tasks array is run through the funtion that checks if each object has a status of 'done', add the objects with the 'done' status to the new array which is the completed tasks
    const doneTasks = completedTasks.length > 0; // Bolean condition, if there is more than 0 objects saved in the completedTasks array then the bolean is true otherwise it stays fales and there are not completed tasks

    // Log all the tasks (array of all tasks) regardless of status
    // console.log(`All tasks ${JSON.stringify(tasks)}`); More for sending/fetching data
    console.log('All tasks:', tasks);
    // Log the tasks (array of all tasks with status:done) that are done
    // console.log(`Completed: ${JSON.stringify(completedTasks)}`); More for sending/fetching data
    console.log('Completed tasks:', completedTasks);
    // Combine the no tasks condition with a condition that checks if there are any completed tasks, log completed else log the motivation message
    // If no tasks are marked as 'done' display a motivational message to the user to complete a task in the console
    if(!doneTasks) {
        console.log("No tasks completed, let's get to work!");
    }
};
*/
