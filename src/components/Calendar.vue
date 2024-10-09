<template>
    <div class="calendar bg-white p-6 rounded-xl shadow-lg mx-auto max-w-2xl">
      <div class="calendar-header flex justify-between items-center mb-6">
        <button @click="prevMonth" class="nav-button bg-blue-600 text-white rounded-full p-2 transition hover:bg-blue-800">
          ←
        </button>
        <span class="month-year text-2xl font-semibold text-gray-800">
          {{ currentMonth }} {{ currentYear }}
        </span>
        <button @click="nextMonth" class="nav-button bg-blue-600 text-white rounded-full p-2 transition hover:bg-blue-800">
          →
        </button>
      </div>
      <div class="calendar-body grid grid-cols-7 gap-1">
        <div class="calendar-weekday text-center font-medium text-gray-500 uppercase py-2" v-for="day in weekdays" :key="day">
          {{ day }}
        </div>
        <div
          class="calendar-day relative text-center border border-gray-200 h-28 hover:bg-blue-50 transition cursor-pointer"
          v-for="day in daysInMonth"
          :key="day.date"
          :class="{ empty: day.empty, today: isToday(day.date) }"
        >
          <span v-if="!day.empty" class="absolute top-2 right-2 text-sm font-semibold">{{ day.date }}</span>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import dayjs from "dayjs";
  
  export default {
    data() {
      return {
        currentDate: dayjs(),
        weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      };
    },
    computed: {
      currentMonth() {
        return this.currentDate.format("MMMM");
      },
      currentYear() {
        return this.currentDate.format("YYYY");
      },
      daysInMonth() {
        const startOfMonth = this.currentDate.startOf("month");
        const endOfMonth = this.currentDate.endOf("month");
  
        let days = [];
        const startDay = startOfMonth.day();
  
        // Add empty days before the first day of the month
        for (let i = 0; i < startDay; i++) {
          days.push({ date: "", empty: true });
        }
  
        // Add the days of the month
        for (let i = 1; i <= endOfMonth.date(); i++) {
          days.push({ date: i, empty: false });
        }
  
        return days;
      },
    },
    methods: {
      prevMonth() {
        this.currentDate = this.currentDate.subtract(1, "month");
      },
      nextMonth() {
        this.currentDate = this.currentDate.add(1, "month");
      },
      isToday(day) {
        return day === dayjs().date() && this.currentMonth === dayjs().format("MMMM");
      },
    },
  };
  </script>
  
  <style scoped>
  .today {
    background-color: #e3f2fd;
    border: 2px solid #42a5f5;
    color: #1e88e5;
  }
  .empty {
    background-color: transparent;
    pointer-events: none;
  }
  </style>
  