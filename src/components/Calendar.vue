<template>
    <div class="calendar bg-white p-4 md:p-6 rounded-xl shadow-lg mx-auto max-w-full md:max-w-2xl">
      <div class="calendar-header flex justify-between items-center mb-4">
        <button
          @click="prevMonth"
          class="nav-button text-gray-600 hover:text-gray-800 transition"
          aria-label="Previous Month"
        >
          ←
        </button>
        <span class="month-year text-lg md:text-2xl font-semibold text-gray-800">
          {{ currentMonth }} {{ currentYear }}
        </span>
        <button
          @click="nextMonth"
          class="nav-button text-gray-600 hover:text-gray-800 transition"
          aria-label="Next Month"
        >
          →
        </button>
      </div>
      <div class="calendar-body grid grid-cols-7 gap-2">
        <div
          class="calendar-weekday text-center font-medium text-gray-500 uppercase text-xs sm:text-sm md:text-base"
          v-for="day in weekdays"
          :key="day"
        >
          {{ day }}
        </div>
        <div
          class="calendar-day relative text-center border border-gray-200 bg-white rounded-lg shadow-sm transition-transform transform hover:scale-105 cursor-pointer"
          v-for="day in daysInMonth"
          :key="day.date"
          :class="{
            'bg-blue-100 border-blue-400': isToday(day.date),
            'opacity-50 pointer-events-none': day.empty,
          }"
          @click="day.empty || handleDayClick(day.date)"
        >
          <span v-if="!day.empty" class="absolute top-1 right-1 text-xs sm:text-sm font-semibold">
            {{ day.date }}
          </span>
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
      handleDayClick(day) {
        alert(`You clicked on ${day}!`); // Handle day click action
      },
    },
  };
  </script>
  
  <style scoped>
  .calendar-day {
    height: 5rem; /* Default height for larger screens */
  }
  
  .calendar-day:hover {
    background-color: #f0f8ff; /* Light blue background on hover */
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2); /* Subtle shadow on hover */
  }
  
  .calendar-header {
    border-bottom: 1px solid #e5e5e5; /* Light bottom border for the header */
    padding-bottom: 10px; /* Spacing below the header */
  }
  
  .nav-button {
    font-size: 1.5rem; /* Larger font size for the navigation buttons */
    padding: 0 10px; /* Padding for navigation buttons */
  }
  
  /* Responsive styles */
  @media (max-width: 640px) {
    .calendar-day {
      height: 3rem; /* Smaller height for mobile screens */
    }
  }
  </style>
  