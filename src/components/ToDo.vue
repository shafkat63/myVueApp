<template>
    <div :class="['todo-app', isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800']">
      <header class="mb-4">
        <h1 class="text-3xl font-bold">My Year-Long To-Do List</h1>
        <button
          @click="toggleDarkMode"
          class="mt-2 bg-gray-300 text-gray-800 rounded-md p-2 transition hover:bg-gray-400"
        >
          Toggle Dark Mode
        </button>
      </header>
  
      <section class="mb-6">
        <div class="flex mb-4">
          <input
            type="date"
            v-model="selectedDate"
            class="w-full p-2 rounded-md border border-gray-300 focus:border-purple-600 outline-none transition"
          />
        </div>
  
        <div class="mb-4">
          <input
            v-model="newTask"
            @keyup.enter="addTask"
            placeholder="Add a new task"
            class="w-full p-2 rounded-md border border-gray-300 focus:border-purple-600 outline-none transition"
          />
          <input
            type="date"
            v-model="selectedDueDate"
            class="mt-2 w-full p-2 rounded-md border border-gray-300 focus:border-purple-600 outline-none transition"
          />
          <select
            v-model="selectedPriority"
            class="mt-2 w-full p-2 rounded-md border border-gray-300 focus:border-purple-600 outline-none transition"
          >
            <option value="">Select Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <button
            @click="addTask"
            class="bg-purple-600 text-white mt-2 w-full p-2 rounded-md transition hover:bg-purple-800"
          >
            Add Task
          </button>
        </div>
      </section>
  
      <section>
        <h2 class="text-xl font-semibold mb-2">Tasks for {{ selectedDate }}</h2>
        <ul class="task-list space-y-4">
          <li
            v-for="(task, index) in tasksForSelectedDate"
            :key="index"
            class="flex flex-col justify-start items-start p-4 bg-gray-100 rounded-md shadow"
            :class="{ 'line-through text-gray-400': task.completed }"
          >
            <div class="flex items-center w-full justify-between">
              <div class="flex items-center">
                <input
                  type="checkbox"
                  v-model="task.completed"
                  class="mr-2 cursor-pointer"
                />
                <span>{{ task.text }} (Due: {{ task.dueDate }} - Priority: {{ task.priority }})</span>
              </div>
              <button
                @click="deleteTask(index)"
                class="bg-red-500 text-white px-3 py-1 rounded-md transition hover:bg-red-700"
              >
                Delete
              </button>
            </div>
  
            <!-- Subtask Input Field -->
            <div class="mt-2 flex items-center">
              <input
                v-model="newSubtask"
                @keyup.enter="addSubtask(index)"
                placeholder="Add a subtask"
                class="w-full p-2 rounded-md border border-gray-300 focus:border-purple-600 outline-none transition"
              />
              <button
                @click="addSubtask(index)"
                class="bg-purple-600 text-white mt-2 ml-2 p-2 rounded-md transition hover:bg-purple-800"
              >
                Add Subtask
              </button>
            </div>
  
            <!-- Subtasks List -->
            <ul class="subtask-list ml-5 space-y-2">
              <li
                v-for="(subtask, subIndex) in task.subtasks"
                :key="subIndex"
                class="flex justify-between items-center p-2 bg-gray-200 rounded-md"
                :class="{ 'line-through text-gray-400': subtask.completed }"
              >
                <div class="flex items-center">
                  <input
                    type="checkbox"
                    v-model="subtask.completed"
                    class="mr-2 cursor-pointer"
                  />
                  <span>{{ subtask.text }}</span>
                </div>
                <button
                  @click="deleteSubtask(index, subIndex)"
                  class="bg-red-500 text-white px-2 py-1 rounded-md transition hover:bg-red-700"
                >
                  Delete
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        newTask: '',
        newSubtask: '',
        selectedDueDate: '', // Holds the due date for the new task
        selectedDate: this.formatDate(new Date()),
        tasks: JSON.parse(localStorage.getItem('tasks')) || {}, // Load tasks from localStorage
        isDarkMode: localStorage.getItem('darkMode') === 'true', // Load dark mode preference
        selectedPriority: '', // Holds the priority level
      };
    },
    computed: {
      tasksForSelectedDate() {
        return this.tasks[this.selectedDate] || [];
      },
    },
    methods: {
      formatDate(date) {
        return date.toISOString().split('T')[0];
      },
      addTask() {
        if (this.newTask.trim() !== '' && this.selectedDueDate) {
          if (!this.tasks[this.selectedDate]) {
            this.tasks[this.selectedDate] = [];
          }
          this.tasks[this.selectedDate].push({
            text: this.newTask,
            completed: false,
            subtasks: [],
            dueDate: this.selectedDueDate,
            priority: this.selectedPriority,
          });
          this.saveTasks();
          this.newTask = '';
          this.selectedDueDate = '';
          this.selectedPriority = '';
        }
      },
      addSubtask(taskIndex) {
        if (this.newSubtask.trim() !== '') {
          this.tasks[this.selectedDate][taskIndex].subtasks.push({ text: this.newSubtask, completed: false });
          this.saveTasks();
          this.newSubtask = '';
        }
      },
      deleteTask(index) {
        this.tasks[this.selectedDate].splice(index, 1);
        this.saveTasks();
      },
      deleteSubtask(taskIndex, subIndex) {
        this.tasks[this.selectedDate][taskIndex].subtasks.splice(subIndex, 1);
        this.saveTasks();
      },
      toggleDarkMode() {
        this.isDarkMode = !this.isDarkMode;
        localStorage.setItem('darkMode', this.isDarkMode);
      },
      saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks)); // Save tasks to localStorage
      },
    },
    mounted() {
      // Load dark mode preference from localStorage
      const darkModePreference = localStorage.getItem('darkMode');
      if (darkModePreference === 'true') {
        this.isDarkMode = true;
      }
    },
  };
  </script>
  
  <style scoped>
  .todo-app {
    font-family: 'Roboto', sans-serif;
    padding: 20px; /* Add padding for better layout */
  }
  
  input:focus {
    outline: none;
    border-color: #6200ea;
  }
  
  .line-through {
    text-decoration: line-through;
  }
  
  .bg-gray-800 {
    background-color: #2d3748;
  }
  
  .text-white {
    color: white;
  }
  
  .bg-gray-300 {
    background-color: #d1d5db;
  }
  
  .bg-purple-600 {
    background-color: #6b46c1;
  }
  
  .bg-purple-800 {
    background-color: #553c9a;
  }
  
  .bg-red-500 {
    background-color: #f56565;
  }
  
  .bg-red-700 {
    background-color: #c53030;
  }
  
  header {
    border-bottom: 1px solid #ccc; /* Add a bottom border to the header */
    padding-bottom: 10px; /* Add padding below header */
  }
  
  section {
    margin-bottom: 20px; /* Add margin between sections */
  }
  </style>
  