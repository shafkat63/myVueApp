<template>
  <div class="calculator bg-gray-800 p-5 rounded-xl shadow-lg text-white max-w-xs mx-auto">
    <div class="display bg-gray-900 text-4xl p-5 rounded-lg mb-5 text-right shadow-inner">
      {{ current }}
    </div>
    <div class="history bg-gray-700 p-3 rounded-lg mb-3 max-h-32 overflow-auto">
      <div v-for="(entry, index) in history" :key="index" class="text-sm text-gray-200">{{ entry }}</div>
    </div>
    <div class="grid grid-cols-4 gap-3">
      <!-- Special Buttons -->
      <button @click="clearAll" class="special bg-red-500 hover:bg-red-600 py-3 rounded-lg">C</button>
      <button @click="deleteLast" class="special bg-yellow-500 hover:bg-yellow-600 py-3 rounded-lg">DEL</button>
      <button @click="append('/')" class="special bg-yellow-500 hover:bg-yellow-600 py-3 rounded-lg">/</button>
      <button @click="append('*')" class="special bg-yellow-500 hover:bg-yellow-600 py-3 rounded-lg">*</button>

      <!-- Numbers and Operations -->
      <button @click="append(7)" class="bg-gray-700 hover:bg-gray-600 py-3 rounded-lg">7</button>
      <button @click="append(8)" class="bg-gray-700 hover:bg-gray-600 py-3 rounded-lg">8</button>
      <button @click="append(9)" class="bg-gray-700 hover:bg-gray-600 py-3 rounded-lg">9</button>
      <button @click="append('-')" class="special bg-yellow-500 hover:bg-yellow-600 py-3 rounded-lg">-</button>

      <button @click="append(4)" class="bg-gray-700 hover:bg-gray-600 py-3 rounded-lg">4</button>
      <button @click="append(5)" class="bg-gray-700 hover:bg-gray-600 py-3 rounded-lg">5</button>
      <button @click="append(6)" class="bg-gray-700 hover:bg-gray-600 py-3 rounded-lg">6</button>
      <button @click="append('+')" class="special bg-yellow-500 hover:bg-yellow-600 py-3 rounded-lg">+</button>

      <button @click="append(1)" class="bg-gray-700 hover:bg-gray-600 py-3 rounded-lg">1</button>
      <button @click="append(2)" class="bg-gray-700 hover:bg-gray-600 py-3 rounded-lg">2</button>
      <button @click="append(3)" class="bg-gray-700 hover:bg-gray-600 py-3 rounded-lg">3</button>
      <button @click="calculate" class="equals bg-green-600 hover:bg-green-700 row-span-2 py-3 rounded-lg">=</button>

      <button @click="append(0)" class="zero bg-gray-700 hover:bg-gray-600 col-span-2 py-3 rounded-lg">0</button>
      <button @click="append('.')" class="bg-gray-700 hover:bg-gray-600 py-3 rounded-lg">.</button>
      <button @click="calculateSquareRoot" class="special bg-blue-500 hover:bg-blue-600 py-3 rounded-lg">√</button>
      <button @click="append('%')" class="special bg-blue-500 hover:bg-blue-600 py-3 rounded-lg">%</button>
      <button @click="calculateSquare" class="special bg-blue-500 hover:bg-blue-600 py-3 rounded-lg">x²</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: '',
      history: [],
    };
  },
  created() {
    // Load data from localStorage
    const savedCurrent = localStorage.getItem('calculatorCurrent');
    const savedHistory = localStorage.getItem('calculatorHistory');

    if (savedCurrent) {
      this.current = savedCurrent;
    }
    if (savedHistory) {
      this.history = JSON.parse(savedHistory);
    }
  },
  watch: {
    current(newValue) {
      // Save current value to localStorage whenever it changes
      localStorage.setItem('calculatorCurrent', newValue);
    },
    history(newValue) {
      // Save history to localStorage whenever it changes
      localStorage.setItem('calculatorHistory', JSON.stringify(newValue));
    },
  },
  methods: {
    append(value) {
      this.current += value;
    },
    clearAll() {
      this.current = '';
      this.history = [];
    },
    deleteLast() {
      this.current = this.current.slice(0, -1);
    },
    calculate() {
      try {
        // Use eval carefully; in production, consider a safer alternative
        const result = eval(this.current);
        this.history.push(`${this.current} = ${result}`);
        this.current = result;
      } catch (e) {
        this.current = 'Error';
      }
    },
    calculateSquareRoot() {
      if (this.current) {
        const result = Math.sqrt(eval(this.current));
        this.history.push(`√(${this.current}) = ${result}`);
        this.current = result;
      }
    },
    calculateSquare() {
      if (this.current) {
        const result = Math.pow(eval(this.current), 2);
        this.history.push(`(${this.current})² = ${result}`);
        this.current = result;
      }
    },
  },
};
</script>

<style scoped>
/* No regular CSS used, Tailwind classes are applied directly in the template */
</style>
