<template>
    <div :class="['todo-app', isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800']">
      <header class="mb-4 text-center md:text-left border-b border-gray-300 pb-4">
        <h1 class="text-3xl font-bold">My Year-Long To-Do List</h1>
        <button
          @click="toggleDarkMode"
          class="mt-2 bg-gray-300 text-gray-800 rounded-md p-2 transition hover:bg-gray-400"
        >
          Toggle Dark Mode
        </button>
      </header>
  
      <section class="mb-6">
        <div class="flex flex-col mb-4">
          <input
            type="date"
            v-model="selectedDate"
            class="w-full p-2 rounded-md border border-gray-300 focus:border-purple-600 transition outline-none"
          />
        </div>
  
        <div class="mb-4">
          <input
            v-model="newTask"
            @keyup.enter="addTask"
            placeholder="Add a new task"
            class="w-full p-2 rounded-md border border-gray-300 focus:border-purple-600 transition outline-none"
          />
          <input
            type="date"
            v-model="selectedDueDate"
            class="mt-2 w-full p-2 rounded-md border border-gray-300 focus:border-purple-600 transition outline-none"
          />
          <select
            v-model="selectedPriority"
            class="mt-2 w-full p-2 rounded-md border border-gray-300 focus:border-purple-600 transition outline-none"
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
            class="flex flex-col p-4 bg-gray-100 rounded-md shadow space-y-2 md:space-y-0"
            :class="{ 'line-through text-gray-400': task.completed }"
          >
            <div class="flex justify-between items-center">
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
            <div class="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
              <input
                v-model="newSubtask"
                @keyup.enter="addSubtask(index)"
                placeholder="Add a subtask"
                class="w-full p-2 rounded-md border border-gray-300 focus:border-purple-600 transition outline-none"
              />
              <button
                @click="addSubtask(index)"
                class="bg-purple-600 text-white p-2 rounded-md transition hover:bg-purple-800"
              >
                Add Subtask
              </button>
            </div>
  
            <!-- Subtasks List -->
            <ul class="ml-5 space-y-2">
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
  
  