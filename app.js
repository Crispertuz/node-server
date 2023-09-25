const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const tasks = [];

function addTask(indicator, description) {
  tasks.push({ indicator, description, completed: false });
  console.log('Tarea añadida.');
}

function deleteTask(indicator) {
  const index = tasks.findIndex(task => task.indicator === indicator);
  if (index !== -1) {
    tasks.splice(index, 1);
    console.log('Tarea eliminada.');
  } else {
    console.log('No se encontró la tarea.');
  }
}

function completeTask(indicator) {
  const task = tasks.find(task => task.indicator === indicator);
  if (task) {
    task.completed = true;
    console.log('Tarea marcada como completada.');
  } else {
    console.log('No se encontró la tarea.');
  }
}

function showTasks() {
  console.log('Lista de tareas:');
  tasks.forEach(task => {
    const status = task.completed ? 'Completada' : 'No completada';
    console.log(`${task.indicator}: ${task.description} (${status})`);
  });
}

rl.question('¿Qué acción deseas realizar? (add/delete/complete/show/exit): ', action => {
  if (action === 'add') {
    rl.question('Indicador de la tarea: ', indicator => {
      rl.question('Descripción de la tarea: ', description => {
        addTask(indicator, description);
        showTasks();
        rl.close();
      });
    });
  } else if (action === 'delete') {
    rl.question('Indicador de la tarea a eliminar: ', indicator => {
      deleteTask(indicator);
      showTasks();
      rl.close();
    });
  } else if (action === 'complete') {
    rl.question('Indicador de la tarea a marcar como completada: ', indicator => {
      completeTask(indicator);
      showTasks();
      rl.close();
    });
  } else if (action === 'show') {
    showTasks();
    rl.close();
  } else if (action === 'exit') {
    rl.close();
  } else {
    console.log('Acción no válida.');
    rl.close();
  }
});