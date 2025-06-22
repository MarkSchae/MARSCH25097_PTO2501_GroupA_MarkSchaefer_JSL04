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

