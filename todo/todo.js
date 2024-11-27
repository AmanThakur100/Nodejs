const fs = require("fs");
const filePath = "./tasks.json";

const loadTasks = () => {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const dataJSON = dataBuffer.toString();
    const tasks = JSON.parse(dataJSON);
    return Array.isArray(tasks) ? tasks : [];
  } catch (error) {
    return [];
  }
};

const saveTasks = (tasks) => {
  const dataJSON = JSON.stringify(tasks, null, 2);
  fs.writeFileSync(filePath, dataJSON);
};

const addTask = (task) => {
  const tasks = loadTasks();
  tasks.push({ task });
  saveTasks(tasks);
  console.log("Task added:", task);
};

const listTasks = () => {
  const tasks = loadTasks();
  tasks.forEach((task, index) => console.log(`${index + 1} - ${task.task}`));
};

const removeTask = (index) => {
  const tasks = loadTasks();
  if (index > 0 && index <= tasks.length) {
    const removedTask = tasks.splice(index - 1, 1);
    saveTasks(tasks);
    console.log(`Removed task: ${removedTask[0].task}`);
  } else {
    console.log("Invalid task number!");
  }
};

const command = process.argv[2];
const argument = process.argv[3];

if (command === "add") {
  addTask(argument);
} else if (command === "list") {
  listTasks();
} else if (command === "remove") {
  removeTask(parseInt(argument));
} else {
  console.log("Command not found!");
}
